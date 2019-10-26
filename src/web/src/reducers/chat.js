const initialState = {
    receiverID: '',
    listFriend: [],
    listMessage: [],
    callingAPI: false,
    titleName: '',
    
    isFindUser: false,
    findUserSuccessful: false,
    dataFindUser: [],
    error: null
}

export const chatReducer = ( state = initialState, action) => {
    switch(action.type){
    case 'SET_TITLE_NAME':
        return {
            ...state,
            titleName: action.titleName
        }
    case 'SET_RECEIVER_ID':
        return {
            ...state,
            receiverID: action.receiverID
        }
    case 'SET_LIST_FRIEND':
        return {
        ...state,
        listFriend: action.listFriend,
        callingAPI: false
    }
    case 'SET_LIST_MESSAGE':
    return {
        ...state,
        listMessage: action.listMessage,
        callingAPI: false
    }
    case 'PUSH_MESSAGE':
    return {
        ...state,
        listMessage: [...state.listMessage, action.arr],
        callingAPI: false
    }
    case 'CALLING_API':
    return {
        ...state,
        callingAPI: true
    }
    case 'FAIL':
    return {
        ...state,
        error: action.err,
        callingAPI: false
    }
    case 'FAIL_HANDLE':
    return {
        ...state,
        error: null
    }

    case 'FINDUSER_START':
        return {
            ...state,
            isFindUser: true
        }
    case 'FINDUSER_SUCCESSFUL':
        return {
        ...state,
        isFindUser: false,
        findUserSuccessful: true,
        dataFindUser: action.result,
    }
    case 'FINDUSER_FAIL':
        return {
        ...state,
        isFindUser: false,
        error: action.err
    }
    case 'FINDUSER_FAIL_HANDLE':
        return {
        ...state,
        error: null
    }

    default:
        return state
    }
}
