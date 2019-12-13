import { getRanking as getRankingAPI, getHomeSongs as getHomeSongsAPI } from '../api/userAPI'


export function getHomeSongs(){
    return (dispatch) => {
        dispatch(get_home_data_start())
        getHomeSongsAPI()
        .then((homeData) => {
            dispatch(get_home_data_successful(homeData))
        })
        .catch((err) => {
            dispatch(get_home_data_fail(err))
        });
    }
}

export function get_home_data_start(){
    return {
        type: 'GET_HOME_DATA_START',
    }
}
export function get_home_data_successful(homeData){
    return {
        type: 'GET_HOME_DATA_SUCCESSFUL',
        homeData,
    }
}
export function get_home_data_fail(err){
    return {
        type: 'GET_HOME_DATA_FAIL',
        err,
    }
}
export function get_home_data_hanlde_error(){
    return {
        type: 'GET_HOME_DATA_HANLDE_ERROR',
    }
}
export function get_home_data_reset(){
    return {
        type: 'GET_HOME_DATA_RESET',
    }
}



export function set_music_selected(musicSelected){
    return {
        type: 'SET_MUSIC_SELECTED',
        musicSelected: musicSelected
    }
}
export function set_ranking(rankingdata){
    return {
        type: 'SET_RANKING',
        rankingdata,
    }
}

export function set_err(err){
    return {
        type: 'SET_ERR',
        err,
    }
}

export function ranking_start(){
    return {
        type: 'RANKING_START'
    }
}
export function getRanking(){
    return (dispatch) => {
        dispatch(ranking_start())
        getRankingAPI()
        .then((data) => {
            dispatch(set_ranking(data))
        })
        .catch((err) => {
            dispatch(set_err(err))
        });
    }
}