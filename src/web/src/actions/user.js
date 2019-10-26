import { login as loginAPI, createUser as createUserAPI } from '../api/userAPI'

export function login(email, password){
    return (dispatch) => {
        dispatch(signin_start())

        loginAPI(email, password)
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

export function createUser(email, password, name, phone, genre){
    return (dispatch) => {
        dispatch(signup_start())

        createUserAPI(email, password, name, phone, genre)
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

export function clear_state(){
    return {
        type: 'CLEAR_STATE'
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

