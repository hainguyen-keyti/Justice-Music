const initialState = {
    musicSelected: '',
    rankingdata: null,
    isLoadingRankingData: false,
    error: null,
}

export const appReducer = ( state = initialState, action) => {
    switch(action.type){
    case 'SET_MUSIC_SELECTED':
        return {
            ...state,
            musicSelected: "https://ipfs.io/ipfs/" + action.musicSelected
        }
    case 'SET_RANKING':
        return {
            ...state,
            rankingdata: action.rankingdata,
            isLoadingRankingData: false,
        }
    case 'RANKING_START':
        return {
            ...state,
            isLoadingRankingData: true,
        }
    case 'SET_ERR':
        return {
            ...state,
            error: action.err,
            isLoadingRankingData: false,
        }
    default:
        return state
    }
}