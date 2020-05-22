import React from 'react';
import {actions} from '../../redux/news-reducer';
import News from './News';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {AppStateType} from '../../redux/redux-store';

let mapStateToProps = (state: AppStateType) => {
    return {
        newsPage: state.newsPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(News)
