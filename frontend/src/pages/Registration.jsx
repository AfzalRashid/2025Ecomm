import { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify'

const Register = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [name, setName] = useState('');
  const [cnfrmpwd, setCnfrmpwd] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'
  const userInfo = useSelector((state) => state.userInfo)
  const [register, { isLoading }] = useRegisterMutation()


  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault();
    if(pwd !== cnfrmpwd) 
        toast.error('Password should be same')
    try {
      const res = await register({ name, email, password: pwd }).unwrap() // unwrap gives you data directly or throws error, so you can use try/catch
      dispatch(setCredentials(res))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Registration failed');
    }
  };

  return (
    <FormContainer>
      <h1 className="my-4">Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="cnfrmpwd" className="mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={cnfrmpwd}
            onChange={(e) => setCnfrmpwd(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100" disabled={isLoading}>
          {isLoading ? 'Signing In...' :
          'Register'}
        </Button>
      </Form>
      <Row>
        <Col>Already a Cutomer?<Link to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'}>Log In</Link></Col>
      </Row>
    </FormContainer>

  );
};

export default Register;
