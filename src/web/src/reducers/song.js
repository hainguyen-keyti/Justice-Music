const initialState = {
    songInfo: null,
    songSameSingerData: null,
    relatedUserData: null,
    isLoading: false,
    error: null,
}

export const songReducer = ( state = initialState, action) => {
    switch(action.type){
    case 'GET_RELATED_USER_SUCCESSFUL':
        return {
            ...state,
            relatedUserData: action.relatedUserData
        }
    case 'GET_SONG_SAME_SINGER_SUCCESSFUL':
        return {
            ...state,
            songSameSingerData: action.songSameSingerData
        }
    case 'SET_IS_FOLLOW_SONG':
        return {
            ...state,
            songInfo: {
                ...state.songInfo,
                isFollowed: action.setFollow,
                follow: action.setFollow ? (state.songInfo.follow + 1) : (state.songInfo.follow -1 ) 
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
