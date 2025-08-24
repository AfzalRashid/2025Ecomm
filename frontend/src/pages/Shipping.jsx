import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const Shipping = () => {

    const { shippingAddress } = useSelector(state => state.cart)
    const [address, setAddress] = useState(shippingAddress?.address || '')
    const [city, setCity] = useState(shippingAddress?.city || '')
    const [zipcode, setZipcode] = useState(shippingAddress?.zipcode || '')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addShippingAddress({ address, city, zipcode }))
        navigate('/payment')
    }
    return <FormContainer>
        <h1 className="my-4">Shipping Details</h1>
        <CheckoutSteps step={2}/>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="address" className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="city" className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="zipcode" className="mb-3">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" >

                Save
            </Button>
        </Form>
    </FormContainer>
}

export default Shipping