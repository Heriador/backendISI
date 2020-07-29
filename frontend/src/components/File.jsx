import React from 'react';
import {Col,Card,Dropdown} from 'react-bootstrap';
import { updateCategorieAction,getCategorieAction } from '../redux/categoriesDuck';
import { deleteFileAction } from '../redux/filesDucks';
import { useDispatch,useSelector } from 'react-redux';



const File = (props) => {

    const dispatch = useDispatch();
    const Categories = useSelector(store => store.categories.array)
    const deleteFile = (id) =>{
        dispatch(deleteFileAction(id));
    }

    const handleSelect = (e,file) =>{
        dispatch(updateCategorieAction(e,file));
        dispatch(getCategorieAction(e))
    }
    return (

        <Col 
            sm={6} 
            md={4}
            xl={3} 
            className="d-flex justify-content-center mb-2"
        >
            <Card className="cardBorder">
                <div className="img-container">
                    <img src={props.one.imgUrl} className="img" alt={props.one.name}/>
                </div>
                <Card.Body className="border-top border-primary">
                    <h4 >{props.one.title}</h4>
                    <p>{props.one.description}</p>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                <a href={props.one.patch} target='_blank' rel="noopener noreferrer">
                    <i
                        className="fa fa-eye"
                    >
                        
                    </i> 
                </a>
                <Dropdown onSelect={(e) => handleSelect(e,props.one)}>
                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                        <i
                            className="fa fa-plus"
                        ></i> 
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {Categories.map(categorie =>
                                <Dropdown.Item 
                                    key={categorie._id} 
                                    eventKey={categorie._id}
                                >{categorie.name}</Dropdown.Item>
                            )}  
                    </Dropdown.Menu>
                </Dropdown>     
                <i
                    className="fa fa-trash-o"
                    onClick={()=>deleteFile(props.one._id)}
                ></i>                             
                </Card.Footer>
            </Card>
        </Col>
    )
}


export default File;
