const initialState = {
    isSignin: false,
    signinSuccessful: false,
    error: null
}

export const signinReducer = ( state = initialState, action) => {
    switch(action.type){
    case 'SIGNIN_START':
        return {
            ...state,
            isSignin: true
        }
    case 'SIGNIN_SUCCESSFUL':
        return {
        ...state,
        isSignin: false,
        signinSuccessful: true
    }
    case 'SIGNIN_FAIL':
        return {
        ...state,
        isSignin: false,
        error: action.err
    }
    case 'SIGNIN_FAIL_HANDLE':
    return {
    ...state,
    error: null
}
    default:
        return state
    }
}