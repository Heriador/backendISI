import React,{useState} from 'react';
import {Modal, Button, FormControl} from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import {createCategorieAction} from '../redux/categoriesDuck';


const AddCategorie = props => {
    const [categorie, setCategorie] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) =>{
        setCategorie(e.target.value);
    }

    const addCategorie = async () =>{
        dispatch(createCategorieAction({name: categorie, userId: props.id}))
        setCategorie('')
        props.handleClose();
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Agregar Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl 
                        type='text'
                        name='Categoria'
                        placeholder='New Categorie'
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={addCategorie}>
                    Add Categorie
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default AddCategorie;