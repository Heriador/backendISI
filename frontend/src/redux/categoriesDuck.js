import axios from 'axios';

// Constantes
const dataInicial = {
    array: [],
    categorie: {},
}

const GET_CATEGORIES_EXITO = 'GET_CATEGORIES_EXITO';
const GET_CATEGORIE_EXITO = 'GET_CATEGORIE_EXITO';
const CREATE_CATEGORIE_EXITO = 'CREATE_CATEGORIE_EXITO';
const DELETE_CATEGORIE_EXITO = 'DELETE_CATEGORIE_EXITO';
const UPDATE_CATEGORIE_EXITO = 'UPDATE_CATEGORIE_EXITO';

// Reducer
export default function categorieReducer (state = dataInicial, action){
    switch(action.type){
        case GET_CATEGORIES_EXITO:
            return {...state, array: action.payload}
        case GET_CATEGORIE_EXITO:
            return {...state, categorie: action.payload}
        case CREATE_CATEGORIE_EXITO:
            return {...state, array: action.payload}
        case DELETE_CATEGORIE_EXITO:
            return {...state, array: action.payload}
        case UPDATE_CATEGORIE_EXITO:
            return {...state}
        default:
            return state
    }
}

// Actions
export const getCategoriesAction = id => async (dispatch,getState)=> {
    try {
        const res =  await axios.get(`http://localhost:4000/api/categories/all/${id}`);
        dispatch({
            type: GET_CATEGORIES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.error(error);
    }
}

export const getCategorieAction = (name) => async (dispatch, getState) =>{
    try {
        const res = await axios.get(`http://localhost:4000/api/categories/${name}`);
        dispatch({
            type: GET_CATEGORIE_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}

export const createCategorieAction = (categorie) => async (dispatch, getState) =>{
    try {
        const res = await axios.post(`http://localhost:4000/api/categories/`,categorie);
        console.log(res);
        dispatch({
            type: CREATE_CATEGORIE_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCategorieAction = (id, file) => async (dispatch, getState) =>{
    try {
        await axios.put(`http://localhost:4000/api/categories/${id}`,file)
        dispatch({
            type: UPDATE_CATEGORIE_EXITO
        })
    } catch (error) {
        console.error(error);
    }
}

export const deleteCategorieAction = (id) => async (dispatch, getState) =>{
    try {
        const res = await axios.delete(`http://localhost:4000/api/categories/${id}`);
        dispatch({
            type: DELETE_CATEGORIE_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}