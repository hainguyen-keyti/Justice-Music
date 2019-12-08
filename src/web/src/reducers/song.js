const initialState = {
    songData: null,
    isLoading: false,
    error: null,
}

export const songReducer = ( state = initialState, action) => {
    switch(action.type){
    case 'SET_IS_FOLLOW':
        return {
            ...state,
            songData: {
                ...state.songData,
                isFollowed: action.setFollow,
                follow: action.setFollow ? (state.userInfoData.follow + 1) : (state.userInfoData.follow - 1) 
            },
    }
    case 'SET_SONG_DATA':
        return {
            ...state,
            songData: action.songData
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
