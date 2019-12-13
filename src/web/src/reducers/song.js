const initialState = {
    songInfo: null,
    isLoading: false,
    error: null,
}

export const songReducer = ( state = initialState, action) => {
    switch(action.type){
    case 'SET_IS_FOLLOW':
        return {
            ...state,
            songInfo: {
                ...state.songInfo,
                isFollowed: action.setFollow,
                follow: action.setFollow ? (state.songInfo.follow++) : (state.songInfo.follow--) 
            },
    }
    case 'SET_SONG_DATA':
        return {
            ...state,
            songInfo: action.songInfo
        }

    case 'SET_ERROR_GET_SONG_DATA':
        return {
            ...state,
            error: action.error
        }

    case 'SET_LOADING_SONG_DATA':
        return {
            ...state,
            isLoading: action.isLoading
        }
    default:
        return state
    }
}
