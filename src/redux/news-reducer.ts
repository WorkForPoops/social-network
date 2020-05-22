import {InferActionsTypes} from './redux-store';

type NewsType = {
    id: number
    name: string
    text: string
    img: string
    likes: number
    avatar: string
}

let initialState = {
    posts: [
        {id: 1, name: 'Donald Trump', avatar: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia2.s-nbcnews.com%2Fi%2FMSNBC%2FComponents%2FVideo%2F__NEW%2Ff_trump_poweroutage_160221.jpg&f=1&nofb=1',text: 'Please turn off the light...', img: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsooscsilla.com%2Fwp-content%2Fuploads%2F2013%2F10%2Ffemtalpas-tiffany-lampa-olomuvegbol-4.jpg&f=1&nofb=1', likes: 12},
        {id: 2, name: 'Shrek', avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F7BF--v8rtVk%2Fmaxresdefault.jpg&f=1&nofb=1', text: 'This is my swamp!', img: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages6.fanpop.com%2Fimage%2Fphotos%2F37500000%2Fmy-swamp-shrek-37578187-400-398.jpg&f=1&nofb=1', likes: 32},
        // {id: 3, name: '', text: 'Yo'},
        // {id: 4, name: '', text: 'Yo'},
        // {id: 5, name: '', text: 'Yo'}
    ] as Array<NewsType>
}

const newsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/NEWS/ADD_POST':
            let body = action.newPost;
            return {
                ...state,
                posts: [...state.posts, {id: 6, text: body, name: '', likes: 0, img: '', avatar: ''}]
            };
        default:
            return state;
    }
}

export const actions = {
    addPost: (newPost: string) => ({type: 'SN/NEWS/ADD_POST', newPost} as const)
}

export default newsReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>