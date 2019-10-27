const initialState = {
    user: null,

    isSignin: false,
    signinSuccessful: false,
    isSignup: false,
    signupSuccessful: false,
    error: null
}

export const userReducer = ( state = initialState, action) => {
    switch(action.type){
    case 'SET_HAK':
        return {
            ...state,
            user: {
                ...state.user,
                balance: {
                    ...state.user.balance,
                    HAK: action.hak
                }
            }
    }
    case 'SET_USER_DATA':
        return {
            ...state,
            isSignin: true,
            user: action.user
    }
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
    case 'CLEAR_STATE':
        return {
        isSignup: false,
        signupSuccessful: false,
        error: null
        }
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
