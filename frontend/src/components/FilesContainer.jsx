import React from 'react';
import { Container, Row } from 'react-bootstrap';
import File from './File';

const FilesContainer = props => {
    return (
        <div>
            <Container fluid>
                    <Row>
                        {
                            props.Files.map(file => <File one={file} key={file._id} />)
                        }
                        
                    </Row>
            </Container>
            
        </div>
    )
}

export default FilesContainer;