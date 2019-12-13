import {
    getSongByID as getSongByIDAPI,
    getSongSameSinger as getSongSameSingerAPI,
    getRelatedUser as getRelatedUserAPI
} from '../api/userAPI'

export function getRelatedUser(){
    return (dispatch) => {
        getRelatedUserAPI()
        .then((relatedUserData) => {
            dispatch(get_related_user_successful(relatedUserData))
        })
        .catch((err) => {
            console.log("Error at get relatedUserData: " + err)
        });
    }
}

export function get_related_user_successful(relatedUserData){
    return {
        type: 'GET_RELATED_USER_SUCCESSFUL',
        relatedUserData,
    }
}

export function getSongSameSinger(data){
    return (dispatch) => {
        getSongSameSingerAPI(data)
        .then((songSameSingerData) => {
            dispatch(get_song_same_singer_successful(songSameSingerData))
        })
        .catch((err) => {
            console.log("Error at get songSameSingerData: " + err)
        });
    }
}

export function get_song_same_singer_successful(songSameSingerData){
    return {
        type: 'GET_SONG_SAME_SINGER_SUCCESSFUL',
        songSameSingerData,
    }
}

export function getSongByID(idMongo){
    return (dispatch) => {
        dispatch(set_loading_song_data(true))
        getSongByIDAPI(idMongo)
        .then((songInfo) => {
            dispatch(set_song_data(songInfo))
            dispatch(getSongSameSinger({
                idUserUpload: songInfo.userUpload._id,
                exceptedSongID: songInfo._id,
              })
            )
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


