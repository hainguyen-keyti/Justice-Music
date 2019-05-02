const initialState = {
    isSignup: false,
    signupSuccessful: false,
    error: null
}

export const signupReducer = ( state = initialState, action) => {
    switch(action.type){
    case 'SIGNUP_START':
        return {
            ...state,
            isSignup: true
        }
    case 'SIGNUP_SUCCESSFUL':
        return {
        ...state,
        isSignup: false,
        signupSuccessful: true
    }
    case 'SIGNUP_FAIL':
        return {
        ...state,
        isSignup: false,
        error: action.err
    }
    case 'SIGNUP_FAIL_HANDLE':
    return {
    ...state,
    error: null
}
    default:
        return state
    }
}