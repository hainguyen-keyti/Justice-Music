import {
    getUserUpload as getUserUploadAPI,
    getUserPage as getUserPageAPI,
    getUserDownload as getUserDownloadAPI,
    getISOAddress as getISOAddressAPI
} from '../api/userAPI'

export function getISOAddress(address){
    return (dispatch) => {
        dispatch(set_loading_iso(true))
        getISOAddressAPI(address)
        .then((data) => {
            dispatch(set_user_iso_data(data))
        })
        .then(()=>{
            dispatch(set_loading_iso(false))
        })
        .catch((err) => {
            dispatch(set_loading_iso(false))
            dispatch(set_error_get_user_upload(err)) //dung tam err
        });
    }
}

export function getUserDownload(address){
    return (dispatch) => {
        dispatch(set_loading_download(true))
        getUserDownloadAPI(address)
        .then((data) => {
            dispatch(set_user_download_data(data))
        })
        .then(()=>{
            dispatch(set_loading_download(false))
        })
        .catch((err) => {
            dispatch(set_loading_download(false))
            dispatch(set_error_get_user_upload(err))
        });
    }
}

export function getUserUpload(address){
    return (dispatch) => {
        dispatch(set_loading_upload(true))
        getUserUploadAPI(address)
        .then((data) => {
            dispatch(set_user_upload_data(data))
        })
        .then(()=>{
            dispatch(set_loading_upload(false))
        })
        .catch((err) => {
            dispatch(set_loading_upload(false))
            dispatch(set_error_get_user_upload(err))
        });
    }
}

export function getUserPage(userName){
    return (dispatch) => {
        dispatch(set_loading_user_info(true))
        getUserPageAPI(userName)
        .then((data) => {
            dispatch(set_user_info_data(data))
            return data
        })
        .then((data)=>{
            dispatch(set_loading_user_info(false))
            dispatch(getUserUpload(data.addressEthereum))
            dispatch(getUserDownload(data.addressEthereum))
            dispatch(getISOAddress(data.addressEthereum))
        })
        .catch((err) => {
            dispatch(set_loading_user_info(false))
            dispatch(set_error_get_user_page(err))
        });
    }
}

export function set_is_follow_page(setFollow){
    return {
        type: 'SET_IS_FOLLOW_PAGE',
        setFollow
    }
}
export function set_loading_upload(loadingUpload){
    return {
        type: 'SET_LOADING_UPLOAD',
        loadingUpload 
    }
}
export function set_loading_download(loadingDownload){
    return {
        type: 'SET_LOADING_DOWNLOAD',
        loadingDownload 
    }
}
export function set_loading_iso(loadingIsoData){
    return {
        type: 'SET_LOADING_ISO',
        loadingIsoData 
    }
}
export function set_loading_user_info(loadingUserData){
    return {
        type: 'SET_LOADING_USER_INFO',
        loadingUserData 
    }
}



export function set_user_upload_data(uploadData){
    return {
        type: 'SET_USER_UPLOAD_DATA',
        uploadData 
    }
}

export function set_user_download_data(downloadData){
    return {
        type: 'SET_USER_DOWNLOAD_DATA',
        downloadData
    }
}

export function set_user_iso_data(isoData){
    return {
        type: 'SET_USER_ISO_DATA',
        isoData
    }
}

export function set_user_info_data(userInfoData){
    return {
        type: 'SET_USER_INFO_DATA',
        userInfoData
    }
}

export function set_error_get_user_page(errorPage){
    return {
        type: 'SET_ERROR_GET_USER_PAGE',
        errorPage
    }
}

export function handle_set_error_get_user_page(){
    return {
        type: 'HANDLE_SET_ERROR_GET_USER_PAGE',
    }
}

export function set_error_get_user_upload(errorUpload){
    return {
        type: 'SET_ERROR_GET_USER_UPLOAD',
        errorUpload
    }
}

export function handle_set_error_get_user_upload(){
    return {
        type: 'HANDLE_SET_ERROR_GET_USER_UPLOAD',
    }
}


