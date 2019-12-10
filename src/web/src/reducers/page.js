const initialState = {
    uploadData: [],
    loadingUpload: false,

    downloadData: [],
    loadingDownload: false,

    isoData: [],
    loadingIsoData: false,

    userInfoData: null,
    loadingUserData: false,

    errorPage: null,
    errorUpload: null,
}

export const pageReducer = ( state = initialState, action) => {
    switch(action.type){
    case 'SET_IS_FOLLOW_PAGE':
        return {
            ...state,
            userInfoData: {
                ...state.userInfoData,
                isFollowed: action.setFollow,
                follow: action.setFollow ? (state.userInfoData.follow + 1) : (state.userInfoData.follow - 1) 
            },
    }
    case 'HANDLE_SET_ERROR_GET_USER_UPLOAD':
        return {
            ...state,
            errorUpload: null
        }
    case 'SET_ERROR_GET_USER_UPLOAD':
        return {
            ...state,
            errorUpload: action.errorPage
        }

    case 'HANDLE_SET_ERROR_GET_USER_PAGE':
        return {
            ...state,
            errorPage: null
        }
    case 'SET_ERROR_GET_USER_PAGE':
        return {
            ...state,
            errorPage: action.errorPage
        }
    case 'SET_LOADING_UPLOAD':
        return {
            ...state,
            loadingUpload: action.loadingUpload
        }
    case 'SET_LOADING_DOWNLOAD':
        return {
            ...state,
            loadingDownload: action.loadingDownload
        }
    case 'SET_LOADING_ISO':
        return {
            ...state,
            loadingIsoData: action.loadingIsoData
        }
    case 'SET_LOADING_USER_INFO':
        return {
            ...state,
            loadingUserData: action.loadingUserData
        }
    case 'SET_MUSIC_SELECTED':
        return {
            ...state,
            musicSelected: window.$linkIPFS + action.musicSelected
        }
    case 'SET_USER_UPLOAD_DATA':
        return {
            ...state,
            uploadData: action.uploadData
        }
    case 'SET_USER_DOWNLOAD_DATA':
        return {
            ...state,
            downloadData: action.downloadData
        }
    case 'SET_USER_ISO_DATA':
        return {
            ...state,
            isoData: action.isoData
        }
    case 'SET_USER_INFO_DATA':
        return {
            ...state,
            userInfoData: action.userInfoData
        }
    default:
        return state
    }
}
