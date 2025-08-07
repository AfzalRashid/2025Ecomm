import { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'
  const userInfo = useSelector((state) => state.userInfo)
  const [login, { isLoading }] = useLoginMutation()


  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault();
    // handle login logic here
    try {
      const res = await login({ email: email, password: pwd }).unwrap() // unwrap gives you data directly or throws error, so you can use try/catch
      dispatch(setCredentials(res))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Login failed');
    }
  };

  return (
    <FormContainer>
      <h1 className="my-4">Sign In</h1>
      <Form onSubmit={submitHandler}>
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

        <Button type="submit" variant="primary" className="w-100" disabled={isLoading}>
          {isLoading ? 'Signing In...' :
          'Sign In'}
        </Button>
      </Form>
      <Row>
        <Col>New Cutomer?<Link to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
      </Row>
    </FormContainer>

  );
};

export default Login;
