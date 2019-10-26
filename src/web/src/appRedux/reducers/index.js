const initialState = {
    isFindUser: false,
    findUserSuccessful: false,
    data: [],
    error: null
}

export const findUserReducer = ( state = initialState, action) => {
    switch(action.type){
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
        data: action.result,
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