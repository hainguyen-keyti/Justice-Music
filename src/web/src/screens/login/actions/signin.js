import { login as loginAPI } from '../../../api/userAPI'

export function login(username, password){
    return (dispatch) => {
        dispatch(signin_start())

        loginAPI(username, password)
        .then(() => {
            dispatch(signin_successful())
        })
        .catch((err) => {
            dispatch(signin_fail(err))
        });
    }
}


export function signin_start(){
    return {
        type: 'SIGNIN_START'
    }
}

export function signin_successful(){
    return {
        type: 'SIGNIN_SUCCESSFUL'
    }
}

export function signin_fail(err){
    return {
        type: 'SIGNIN_FAIL',
        err: err
    }
}

export function signin_fail_handle(){
    return {
        type: 'SIGNIN_FAIL_HANDLE'
    }
}

