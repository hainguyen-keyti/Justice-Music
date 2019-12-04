import { getRanking as getRankingAPI } from '../api/userAPI'


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