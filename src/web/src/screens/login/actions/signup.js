import { createUser as createUserAPI } from '../../../api/userAPI'

export function createUser(username, password, full_name, phone, genre){
    return (dispatch) => {
        dispatch(signup_start())

        createUserAPI(username, password, full_name, phone, genre)
        .then(() => {
            dispatch(signup_successful())
        })
        .catch((err) => {
            dispatch(signup_fail(err))
        });
    }
}

export function signup_start(){
    return {
        type: 'SIGNUP_START'
    }
}

export function signup_successful(){
    return {
        type: 'SIGNUP_SUCCESSFUL'
    }
}

export function signup_fail(err){
    return {
        type: 'SIGNUP_FAIL',
        err: err
    }
}

export function signup_fail_handle(){
    return {
        type: 'SIGNUP_FAIL_HANDLE'
    }
}

