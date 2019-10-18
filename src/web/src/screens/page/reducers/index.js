const initialState = {
    musicSelected: '',
    error: null,
}

export const pageReducer = ( state = initialState, action) => {
    switch(action.type){
    case 'SET_MUSIC_SELECTED':
        return {
            ...state,
            musicSelected: "https://ipfs.io/ipfs/" + action.musicSelected
        }
    default:
        return state
    }
}