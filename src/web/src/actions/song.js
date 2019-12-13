import {
    getSongByID as getSongByIDAPI,
} from '../api/userAPI'

export function getSongByID(idMongo){
    return (dispatch) => {
        dispatch(set_loading_song_data(true))
        getSongByIDAPI(idMongo)
        .then((songInfo) => {
            dispatch(set_song_data(songInfo))
        })
        .then(()=>{
            dispatch(set_loading_song_data(false))
        })
        .catch((err) => {
            dispatch(set_loading_song_data(false))
            dispatch(set_error_get_song_data(err)) //dung tam err
        });
    }
}

export function set_is_follow_song(setFollow){
    return {
        type: 'SET_IS_FOLLOW_SONG',
        setFollow
    }
}
export function set_song_data(songInfo){
    return {
        type: 'SET_SONG_DATA',
        songInfo
    }
}

export function set_loading_song_data(isLoading){
    return {
        type: 'SET_LOADING_SONG_DATA',
        isLoading
    }
}

export function set_error_get_song_data(error){
    return {
        type: 'SET_ERROR_GET_SONG_DATA',
        error
    }
}


