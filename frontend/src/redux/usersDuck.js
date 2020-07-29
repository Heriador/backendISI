import axios from 'axios';

//Constantes
const dataInicial = {
    user: {},
    token: '',
    verified: false
}

const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const ISVERIFIED_USER = 'ISVERIFIED_USER';
const LOG_OUT = 'LOG_OUT';

//Reducer
export default function userReducer (state = dataInicial, action){
    switch(action.type){
        case GET_USER_SUCCESS:
            return {...state, user: action.payload.user, token: action.payload.token}
        case CREATE_USER_SUCCESS:
            return {...state}
        case ISVERIFIED_USER:
            return {...state, verified: action.payload}
        case LOG_OUT:
            return {user: {},token: '',verified: false}
        default:
            return state
    }
}

//Actions
export const getUserAction = user => async (dispatch,getState)=> {
    try {
        const res =  await axios.post('https://catalogo-onlineapi.herokuapp.com/api/users/login',user);
        localStorage.setItem('auth-token',res.data.token);
        dispatch({
            type: GET_USER_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.error(error);
    }
}

export const isVerifiedAction = () => async (dispacth,getState) => {
    try {
        const token = localStorage.getItem('auth-token')
        const res = await axios.post('https://catalogo-onlineapi.herokuapp.com/api/users/tokenIsValid',null,{headers: {'x-auth-token':token}});
        
        dispacth({
            type: ISVERIFIED_USER,
            payload: res.data
        })
    } catch (error) {
        console.error(error);
    }
}

export const logOut = () => (dispacth,getState) =>{

    dispacth({
        type: LOG_OUT
    })
} 

export const createUserAction = (user) => async (dispatch,getState) => {
    try {
        await axios.post('https://catalogo-onlineapi.herokuapp.com/api/users/register',user);
        dispatch({
            type: CREATE_USER_SUCCESS
        })

    } catch (error) {
        console.error(error);
    }
}