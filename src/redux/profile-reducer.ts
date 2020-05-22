import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from '../types/types';
import {usersAPI} from '../api/users-api';
import {profileAPI} from '../api/profile-api';
import {BaseThunkType, InferActionsTypes} from './redux-store';

let initialState = {
    posts: [
        {id: 1, message: 'At least i have chicken', likesCount: 7, img: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg14.deviantart.net%2F68b1%2Fi%2F2015%2F339%2F1%2Fb%2Fleeroy_jenkins_hearthstone_by_plank_69-d9j40hn.png&f=1&nofb=1', name: 'Leroy Jenkins'},
        {id: 2, message: 'I want some pizza...', likesCount: 11, img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fd%2Fd5%2FPresident_Vladimir_Putin.jpg&f=1&nofb=1', name: 'Vladimir Putin'},
        {id: 3, message: 'Damn that deep af..', likesCount: 14, img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F99%2FPavel_Durov_sitting_portrait.jpg%2F267px-Pavel_Durov_sitting_portrait.jpg&f=1&nofb=1', name: 'Pavel Durov'},
        {id: 4, message: 'Wait a minute, who are u?', likesCount: 19, img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FLj-hyUhb_GU%2Fmaxresdefault.jpg&f=1&nofb=1', name: 'Kazzo Kid'}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
                img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fd%2Fd5%2FPresident_Vladimir_Putin.jpg&f=1&nofb=1',
                name: 'some name'
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }

        case 'SN/PROFILE/DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}

        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state;
    }
}


export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)

        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch(error) {
        //
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
