import React, { useState } from "react";
import {Container, Row, Col, Card, ListGroup,Button} from 'react-bootstrap'
import AddFile from '../components/AddFile';
import { useDispatch,useSelector } from 'react-redux';
import {createFileAction } from '../redux/filesDucks';

const AddFiles = () => {
    const [files, setFiles] = useState([]);
    const [change, setChange] = useState({ file:[{name:'Choose File'}],title: '',description: '' });
    const [show, setShow] = useState(false);
    const id = useSelector(store => store.user.user.id);
    const dispatch = useDispatch();

    const addfiles = (file) => {
        setFiles([...files, file])
        setChange({ file:[{name:'Choose File'}],title: '',description: '' });
    };
    const close = (show) => setShow(show);

    const submitFiles = async () => {
    const data = new FormData();
    data.append('user',id);
    files.forEach(file =>{
        data.append('file',...file.file);
        data.append('title',file.title);
        data.append('description',file.description);
    })
    setFiles([]);
    dispatch(createFileAction(data));
    };

    const deleleFile= fil =>{
        const f = []
        files.forEach(file=>{
            if(file !== fil){
                f.push(file);
            }
        })
        setFiles(f);
    }

    return (
        <>
            <Container fluid>
                <Row className="justify-content-end">
                    <Col 
                    className="mb-2"
                    >
                        <Button variant="primary" onClick={() => setShow(true)}>
                            Añadir archivos
                        </Button>

                        {show && 
                            <AddFile 
                            show={show}
                            sendFile={addfiles} 
                            file={change}
                            change={close}
                            />
                        }
                    </Col>
                    <Col sm={12}>
                        <Card>
                            <Card.Body>
                                <ListGroup >
                                    {files.map(file =>
                                        <ListGroup.Item key={file.file[0].name} className="d-flex justify-content-between">
                                            {file.file[0].name}
                                            <div>
                                                <i 
                                                    className="fa fa-times-circle icon-sm" 
                                                    onClick={() => deleleFile(file)}
                                                ></i>
                                            </div>
                                        </ListGroup.Item>    
                                    )}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col 
                    className="d-flex justify-content-end mt-2"
                    >
                        <Button variant="primary" size="lg" onClick={submitFiles}>Subir archivos</Button>
                    </Col>
                </Row>
                
            </Container>
        </>
    );
};

export default AddFiles;
