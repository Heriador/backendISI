import React, {useState,useEffect} from 'react';
import { InputGroup, Dropdown,FormControl,DropdownButton, Button } from 'react-bootstrap';
import AddCategorie from './AddCategorie';
import { useDispatch,useSelector} from 'react-redux';
import { getCategoriesAction, getCategorieAction, deleteCategorieAction } from '../redux/categoriesDuck';


const Buscador = props => {
    const [search, setSearch] = useState({title: '',categorie: ''});
    const [show, setShow] = useState(false);
    const [showCategories, setShowCategoires] = useState(false);
    const [filter, setFilter] = useState('Filtrar');
    const dispatch = useDispatch();

    useEffect(() => {
        const data =  () =>{
            dispatch(getCategoriesAction(props.id));
        }
        data();
    }, [dispatch,props.id])
    const Categories = useSelector(store => store.categories.array)

    const handleShow = () => setShow(true)
    const handleClose = () => {
        dispatch(getCategoriesAction());
        setShow(false)
    };

    const delCategorie = (id) =>{
        dispatch(deleteCategorieAction(id));
    }

    const handleChange = (e) =>{
        setSearch({...search,[e.target.name]: e.target.value})
    }
    const handleSelect = (e) =>{
        if(e === '1'){
            setSearch({title: '',categorie: ''});
            setFilter('Title')
            setShowCategoires(false)
        }
        else if(e === '2'){
            setFilter('Categorie')
            setShowCategoires(true)
        }
        else if(showCategories){
            setFilter(e);
            dispatch(getCategorieAction(e));
            setSearch({...search,categorie: e});
        }
    }

    const onClick = () =>{
        props.change(search);
        
    }
    return (
        <>
            <AddCategorie  show={show} handleClose={handleClose} id={props.id}/>
                

            <InputGroup className="mb-3">
                <Button variant="primary" onClick={onClick}>
                    Search
                </Button>
                <FormControl
                placeholder="Search"
                name='title'
                value={search.title}
                onChange={handleChange}
                // onKeyDown={handleSend}
                />

                <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title={filter}
                id="input-group-dropdown-2"
                onSelect={handleSelect}
                >
                {showCategories  ? 
                <>
                    <Dropdown.Item eventKey={1}>Title</Dropdown.Item>
                    <Dropdown.Divider/>
                    {Categories.map(categorie =>
                        <div className="d-flex justify-content-around" key={categorie._id}>
                            <Dropdown.Item 
                                key={categorie._id} 
                                eventKey={categorie.name}
                            >{categorie.name}
                            </Dropdown.Item>
                            <div>
                                <i
                                    className="fa fa-trash-o"
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        delCategorie(categorie._id)
                                    }}
                                ></i>        
                            </div>
                        </div>
                    )}
                </>
                :   (
                    <>
                        <Dropdown.Item eventKey={1}>Title</Dropdown.Item>
                        <Dropdown.Item eventKey={2}>Categorie</Dropdown.Item>
                    </>
                )
                }
                    
                </DropdownButton>
                <Button variant="outline-primary" onClick={handleShow}>
                    Add Categorie
                </Button>
            </InputGroup>
        </>
    
    )
}

export default Buscador;
