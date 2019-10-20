// import { getListFriend as getListFriendAPI } from '../../../api/chatAPI'
// import { getListMessage as getListMessageAPI } from '../../../api/chatAPI'

// export function getListFriend(){
//     return (dispatch) => {
//         dispatch(calling_api())
//         getListFriendAPI()
//         .then( listFriend => {
//             dispatch(get_list_friend_successful(listFriend))
//             if(listFriend.length >= 1){
//                 var friendID = listFriend[0]._id
//                 dispatch(getListMessage(friendID))
//                 dispatch(select_user_to_chat(friendID))
//                 dispatch(set_title_name(listFriend[0].email))
//             }
//         })
//         .catch((err) => {
//             dispatch(fail(err))
//         });
//     }
// }

// export function getNewFriend(){
//     return (dispatch) => {
//         dispatch(calling_api())
//         getListFriendAPI()
//         .then( listFriend => {
//             dispatch(get_list_friend_successful(listFriend))
//         })
//         .catch((err) => {
//             dispatch(fail(err))
//         });
//     }
// }

// export function getListMessage(receiverID){
//     return (dispatch) => {
//         dispatch(calling_api())
//         getListMessageAPI(receiverID)
//         .then( listMessage => {
//             dispatch(get_list_message_successful(listMessage))
//         })
//         .catch((err) => {
//             dispatch(fail(err))
//         });
//     }
// }

export function set_music_selected(musicSelected){
    return {
        type: 'SET_MUSIC_SELECTED',
        musicSelected: musicSelected
    }
}
