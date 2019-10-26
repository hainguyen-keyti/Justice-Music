import { getListFriend as getListFriendAPI } from '../api/chatAPI'
import { getListMessage as getListMessageAPI } from '../api/chatAPI'
import { findUser as findUserAPI } from '../api/userAPI'

export function getListFriend(){
    return (dispatch) => {
        dispatch(calling_api())
        getListFriendAPI()
        .then( listFriend => {
            dispatch(get_list_friend_successful(listFriend))
            if(listFriend.length >= 1){
                var friendID = listFriend[0]._id
                dispatch(getListMessage(friendID))
                dispatch(select_user_to_chat(friendID))
                dispatch(set_title_name(listFriend[0].email))
            }
        })
        .catch((err) => {
            dispatch(fail(err))
        });
    }
}

export function getNewFriend(){
    return (dispatch) => {
        dispatch(calling_api())
        getListFriendAPI()
        .then( listFriend => {
            dispatch(get_list_friend_successful(listFriend))
        })
        .catch((err) => {
            dispatch(fail(err))
        });
    }
}

export function getListMessage(receiverID){
    return (dispatch) => {
        dispatch(calling_api())
        getListMessageAPI(receiverID)
        .then( listMessage => {
            dispatch(get_list_message_successful(listMessage))
        })
        .catch((err) => {
            dispatch(fail(err))
        });
    }
}


export function get_list_friend_successful(listFriend){
    return {
        type: 'SET_LIST_FRIEND',
        listFriend: listFriend
    }
}

export function get_list_message_successful(listMessage){
    return {
        type: 'SET_LIST_MESSAGE',
        listMessage: listMessage
    }
}

export function push_message(arr){
    return{
        type: 'PUSH_MESSAGE',
        arr: arr
    }
}

export function set_title_name(titleName){
    return{
        type:'SET_TITLE_NAME',
        titleName: titleName
    }
}

export function select_user_to_chat(receiverID){
    return {
        type: 'SET_RECEIVER_ID',
        receiverID: receiverID
    }
}

export function calling_api(){
    return {
        type: 'CALLING_API',
    }
}

export function fail(err){
    return {
        type: 'FAIL',
        err: err
    }
}

export function fail_handle(){
    return {
        type: 'CHAT_FAIL_HANDLE'
    }
}

export function findUser(email){
    return (dispatch) => {
        dispatch(findUser_start())

        findUserAPI(email)
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

