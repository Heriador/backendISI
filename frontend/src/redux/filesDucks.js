import axios from 'axios';

// Constantes
const dataInicial = {
    array: [],
    file: {}
}

const GET_FILES_EXITO = 'GET_FILES_EXITO';
const GET_FILE_EXITO = 'GET_FILE_EXITO';
const CREATE_FILE_EXITO = 'CREATE_FILE_EXITO';
const DELETE_FILE_EXITO = 'DELETE_FILE_EXITO';

// Reducer
export default function fileReducer (state = dataInicial, action){
    switch(action.type){
        case GET_FILES_EXITO:
            return {...state, array: action.payload}
        case GET_FILE_EXITO:
            return {...state, file: action.payload}
        case CREATE_FILE_EXITO:
            return null;
        case DELETE_FILE_EXITO:
            return {...state, array: action.payload};
        default:
            return state
    }
}

// Actions
export const getFilesAction = (userid) => async (dispatch,getState)=> {
    try {
        const res =  await axios.get(`http://localhost:4000/api/files/all/${userid}`);
        dispatch({
            type: GET_FILES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.error(error);
    }
}

export const getFileAction = (id) => async (dispatch, getState) =>{
    try {
        const res = await axios.get(`http://localhost:4000/api/files/${id}`);
        dispatch({
            type: GET_FILE_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}

export const createFileAction = (data) => async (dispatch, getState) =>{
    try {
        await axios({
            method: 'post',
            url: 'http://localhost:4000/api/files',
            data: data,
            header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
            })
        dispatch({
            type: CREATE_FILE_EXITO,
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteFileAction = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(`http://localhost:4000/api/files/${id}`);
        getFilesAction();
        dispatch({
            type: DELETE_FILE_EXITO,
            payload: res.data
            
        })
    } catch (error) {
        console.error(error);
    }
}