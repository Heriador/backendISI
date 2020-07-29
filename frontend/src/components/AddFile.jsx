import React, { useState } from "react";
import {
    Modal,
    Button,
    InputGroup,
    Card,
    Form,
    FormControl,
} from "react-bootstrap";


const AddFile = props => {
    const [file, setFile] = useState(props.file);
    const [show, setShow] = useState(props.show);

    const handleClose = () => {
        setFile({   file:[{ name: "Choose file"}],
                    title: '',
                    description: '' 
                });
        setShow(false);
        props.change(false);
    };

    const submitFiles =  () => {
        props.sendFile(file);
        setFile({});
        handleClose();
    };

    const handleChange = (e) => {
        if(e.target.name !== 'file'){
            setFile({...file,
                [e.target.name]: e.target.value});
        }
        else{
            setFile({...file,
                file: [...e.target.files]});
        }
        
    };

    return (
        <>
            
            <Modal show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                    <Modal.Title>Nuevo archivo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Card>
                        <Card.Body className="pb-2">
                            <InputGroup className="mb-3">
                            <div className="custom-file">
                                <input
                                name='file'
                                type="file"
                                className="custom-file-input"
                                id="inputGroupFile02"
                                onChange={handleChange}
                                />
                                <label
                                className="custom-file-label"
                                htmlFor="inputGroupFile02"
                                aria-describedby="inputGroupFileAddon02"
                                >
                                {file.file[0].name}
                                </label>
                            </div>
                            </InputGroup>
                            <Form.Group className="mb-2">
                            <FormControl
                                name='title'
                                type="text"
                                placeholder="Title"
                                value={file.title}
                                className="input"
                                onChange={handleChange}
                            />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <textarea 
                                    name="description"
                                    placeholder="Description"
                                    className="input area form-control"
                                    value={file.description}
                                    onChange={handleChange} 
                                ></textarea>
                            </Form.Group>
                        </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={submitFiles}>
                        Save File
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default  AddFile;
