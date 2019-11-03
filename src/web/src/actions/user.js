import { login as loginAPI, createUser as createUserAPI } from '../api/userAPI'
import { ethers } from 'ethers';
import config from '../config';


export function login(email, password){
    return (dispatch) => {
        dispatch(signin_start())

        loginAPI(email, password)
        .then((user) => {
            console.log(user)
            dispatch(set_user_data(user))
            return user
        })
        .then((user)=>{
            dispatch(signin_successful())
            return user
        })
        .then((user)=>{
            dispatch(getBlanceETH(user.addressEthereum))
        })
        .catch((err) => {
            dispatch(signin_fail(err))
        });
    }
}

export function getBlanceETH(address){
    return (dispatch) => {
        config.provider.on(address, (balance) => {
            console.log("hahahahahahahahahahah")
            const eth = ethers.utils.formatEther(balance)
            dispatch(set_eth(eth))
      });
    }
}

export function getBlanceHAK(address){
    return (dispatch) => {
        const {tokenAddress, tokenABI, provider} = config
        let contract = new ethers.Contract(tokenAddress, tokenABI, provider);
        let filter1 = contract.filters.Transfer(null, address);
        contract.on(filter1, (from, to, value) => {
            console.log(Number(value))
            console.log('I received ' + value.toString() + ' tokens from ' + from);
            dispatch(set_hak_add(Number(value)))
        });

        let filter2 = contract.filters.Transfer(address, null);
        contract.on(filter2, (from, to, value) => {
            console.log(Number(value))
            console.log('I sended ' + value.toString() + ' tokens to ' + to);
            dispatch(set_hak_sub(Number(value)))
        });
    }
}

export function set_user_data(user){
    return {
        type: 'SET_USER_DATA',
        user: user
    }
}

export function set_hak_add(hak){
    return {
        type: 'SET_HAK_ADD',
        hak: hak
    }
}
export function set_hak_sub(hak){
    return {
        type: 'SET_HAK_SUB',
        hak: hak
    }
}

export function set_eth(eth){
    return {
        type: 'SET_ETH',
        eth: eth
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

