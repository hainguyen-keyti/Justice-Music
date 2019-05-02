import { findUser as findUserAPI } from '../../../api/userAPI'

export function findUser(username){
    return (dispatch) => {
        dispatch(findUser_start())

        findUserAPI(username)
        .then( result => {
            dispatch(findUser_successful(result))
        })
        .catch((err) => {
            dispatch(findUser_fail(err))
        });
    }
}

export function findUser_start(){
    return {
        type: 'FINDUSER_START'
    }
}

export function findUser_successful(result){
    return {
        type: 'FINDUSER_SUCCESSFUL',
        result: result
    }
}

export function findUser_fail(err){
    return {
        type: 'FINDUSER_FAIL',
        err: err
    }
}

export function findUser_fail_handle(){
    return {
        type: 'FINDUSER_FAIL_HANDLE'
    }
}

