const initialState = {
    musicSelected: {},

    rankingdata: null,
    isLoadingRankingData: false,
    
    homeData: null,
    isGetHomeData: false,
    getHomeDataSuccessful: false,
    errorGetHomeData: null,

    hotUserData: null,
    
    error: null,
}

export const appReducer = ( state = initialState, action) => {
    switch(action.type){
    case 'GET_HOT_USER_SUCCESSFUL':
        return {
            ...state,
            hotUserData: action.hotUserData
        }
    case 'GET_HOME_DATA_START':
        return {
            ...state,
            isGetHomeData: true
        }
    case 'GET_HOME_DATA_SUCCESSFUL':
        return {
        ...state,
        isGetHomeData: false,
        getHomeDataSuccessful: true,
        homeData: action.homeData
    }
    case 'GET_HOME_DATA_FAIL':
        return {
        ...state,
        isGetHomeData: false,
        errorGetHomeData: action.err
    }
    case 'GET_HOME_DATA_HANLDE_ERROR':
        return {
        ...state,
        errorGetHomeData: null
    }
    case 'GET_HOME_DATA_RESET':
        return {
        ...state,
        homeData: {},
        isGetHomeData: false,
        getHomeDataSuccessful: false,
        errorGetHomeData: null,
    }    




    case 'SET_MUSIC_SELECTED':
        return {
            ...state,
            musicSelected: action.musicSelected
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