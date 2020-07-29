import React, { useState } from 'react';
import {Container, Row, Col, FormGroup, Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUserAction } from '../redux/usersDuck';


const Register = props => {
  const [signUp, setSignUp] = useState({name: '',email: '',password:'',passwordCheck: ''});
  const dispatch = useDispatch();

  const handleChange = (e) =>{
    setSignUp({...signUp,[e.target.name]: e.target.value})
  }

  const handleSubmit = e =>{
    e.preventDefault();
    dispatch(createUserAction(signUp));
    props.history.push('/Login')
  }

  return (
    <>
      <Container fluid className="d-flex align-items-center auth px-0">
        <Row className='w-100 mx-0'>
          <Col xs={6} md={6} xl={4} className='mx-auto'>
          <div className="auth-form-light text-left py-4 px-4 px-sm-5">
            <h4>New here?</h4>
            <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
            <Form className='pt-3' onSubmit={handleSubmit}>
              <FormGroup>
                <Form.Control 
                  type='text' 
                  placeholder='Name'
                  name='name'
                  value={signUp.name}
                  onChange={handleChange}
                  required
                /> 
              </FormGroup>
              <FormGroup>
                <Form.Control 
                  type='email' 
                  placeholder='Email'
                  name='email'
                  value={signUp.email}
                  onChange={handleChange}
                  required
                /> 
              </FormGroup>
              <FormGroup>
                <Form.Control 
                  type='password' 
                  placeholder='password'
                  name='password'
                  value={signUp.password}
                  onChange={handleChange}
                  required
                /> 
              </FormGroup>
              <FormGroup>
                <Form.Control 
                  type='password' 
                  placeholder='Confirm password'
                  name='passwordCheck'
                  value={signUp.passwordCheck}
                  onChange={handleChange}
                  required
                /> 
              </FormGroup>
              <div className="text-center mt-4 font-weight-light">
                Already have an account? <Link to="/user-pages/login" className="text-primary">Login</Link>
              </div>
              <div className="mt-3">
                <Button 
                  variant='primary' 
                  className='font-weight-medium auth-form-btn'
                  type='submit'
                  block
                >
                  <Link to='/Files' className="send">SIGN UP</Link>
                </Button>
              </div>
            </Form>
          </div>
          </Col>
        </Row>
      </Container>


    </>
  )
}
// export class Register extends Component {
//   render() {
//     return (
//       <div>
//         <div className="d-flex align-items-center auth px-0">
//           <div className="row w-100 mx-0">
//             <div className="col-xl-4 col-md-5 col-5 mx-auto">
//               <div className="auth-form-light text-left py-4 px-4 px-sm-5">
//                 <h4>New here?</h4>
//                 <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
//                 <form className="pt-3">
//                   <div className="form-group">
//                     <input type="text" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Name" required/>
//                   </div>
//                   <div className="form-group">
//                     <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" required/>
//                   </div>
//                   <div className="form-group">
//                     <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" required/>
//                   </div>
//                   <div className="mt-3">
//                     <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN UP</Link>
//                   </div>
//                   <div className="text-center mt-4 font-weight-light">
//                     Already have an account? <Link to="/user-pages/login" className="text-primary">Login</Link>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

export default Register
