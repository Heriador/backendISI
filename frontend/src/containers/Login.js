import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form,Container, Row,Col,Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getUserAction} from '../redux/usersDuck';


const Login = props => {
  const [login, setLogin] = useState({email: '',password: ''});
  const dispatch = useDispatch();

  const handleChange = (e) =>{
    setLogin({...login,[e.target.name]: e.target.value})
  }

  const handleSubmit = e =>{
    e.preventDefault();
    dispatch(getUserAction(login));
    props.history.push('/showFiles');
  }
  return (
    <>
      <Container className="d-flex align-items-center auth px-0">
        <Row className="w-100 mx-0">
          <Col xs={6} md={7} xl={5} className='mx-auto'>
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className='pt-3' onSubmit={handleSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control 
                      type="email" 
                      placeholder="email"
                      name='email'
                      className="h-auto" 
                      value={login.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control 
                      type="password" 
                      placeholder="Password" 
                      name='password'
                      className="h-auto" 
                      value={login.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <div className="mt-3 mb-2">
                    <Button 
                      type='submit'
                      variant='primary' 
                      size='lg' 
                      className='font-weight-medium auth-form-btn' 
                      block
                    >
                      SIGN IN
                    </Button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/Register" className="text-primary">Create</Link>
                  </div>
                </Form>
              </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login
