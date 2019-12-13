const initialState = {
    user: {},

    balanceETH: 0,

    isSignin: false,
    signinSuccessful: false,

    isSignup: false,
    signupSuccessful: false,

    isUpdate: false,
    updateSuccessful: false,
    errorUpdate: null,

    error: null
}

export const userReducer = ( state = initialState, action) => {
    switch(action.type){
    case 'UPDATE_START':
        return {
            ...state,
            isUpdate: true
        }
    case 'UPDATE_SUCCESSFUL':
        return {
        ...state,
        isUpdate: false,
        updateSuccessful: true,
        user: {
            ...state.user,
            userName: action.userName
        }
    }
    case 'UPDATE_FAIL':
        return {
        ...state,
        isUpdate: false,
        errorUpdate: action.err
    }
    case 'HANDLE_UPDATE_ERROR':
        return {
        ...state,
        errorUpdate: null
    }
    case 'RESET_UPDATE':
        return {
        ...state,
        isUpdate: false,
        updateSuccessful: false,
        errorUpdate: null,
    }


    
    case 'SET_HAK_ADD':
        return {
            ...state,
            user: {
                ...state.user,
                HAK: (Number(state.user.HAK) + action.hak)
            }
    }
    case 'SET_HAK_SUB':
        return {
            ...state,
            user: {
                ...state.user,
                HAK: (state.user.HAK -  action.hak)
            }
    }
    case 'SET_ETH':
        return {
            ...state,
            balanceETH: action.eth
    }


    case 'SET_USER_DATA':
        return {
            ...state,
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


    case 'CLEAR_STATE_REGISTER':
        return {
        ...state,
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
