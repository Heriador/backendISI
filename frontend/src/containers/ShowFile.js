import React,{ useEffect, useState } from 'react';
import Buscador from '../components/Buscador';
import {Container, Row} from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import File from '../components/File';
import { getFilesAction,getFileAction} from '../redux/filesDucks';
import { isVerifiedAction } from '../redux/usersDuck'



const ShowFile = props => {

    const [query, setQuery] = useState({title: '', categorie:''})
    const dispatch = useDispatch();
    const id = useSelector(store => store.user.user.id);
    const verified =  useSelector(store => store.user.verified);

    useEffect(() =>{
        const data =  () =>{
            dispatch(isVerifiedAction())
            if(!verified){
                props.history.push('/Login')
            }
            dispatch(getFilesAction(id))
        }
        data()
        

    },[dispatch,id,props.history,verified])

    const Files = useSelector(store => store.files.array);
    const FileFound = useSelector(store => store.files.file);
    const Categorie = useSelector(store => store.categories.categorie);

    const searchFor = async Query => {
        if(Query.title !== '' && Query.categorie === ''){
            setQuery(Query);
            let one = Files.find(file => file.title === Query.title);
            dispatch(getFileAction(one._id));
        }
        else if(Query.categorie !== '' && Query.title === ''){
            setQuery(Query)
        }
        else{
            setQuery(Query);
        }
    }

    return (
        <div>
            <Buscador change={searchFor} id={id}/>
            <Container fluid>
                    <Row>
                        {
                            Files === 0 ?
                                null
                                :query.title === '' && query.categorie === '' ?
                                    Files.map(file => <File one={file} key={file._id} />)
                                    :query.title !== '' ?
                                            <File one={FileFound} key={FileFound._id} />
                                        :query.categorie !== '' && 
                                            Categorie.Files.map(file => <File one={file} key={file._id} />)
                        }
                        
                    </Row>
            </Container>
            
            
            
        </div>
    )
}

export default ShowFile;
