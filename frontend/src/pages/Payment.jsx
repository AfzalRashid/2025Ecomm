import { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import CheckoutSteps from '../components/CheckoutSteps'
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {shippingAddress} = useSelector((state)=>state.cart)

  useEffect(()=>{
if (!shippingAddress) {
    navigate('/shipping')
}
  },[navigate, shippingAddress])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeOrder')
  };

  return (
    <>
    <CheckoutSteps step={3}/>
    <Form onSubmit={submitHandler} className="p-4 border rounded shadow">
      <h2 className="mb-3">Payment Method</h2>

      <Form.Group>
        <Form.Label as="legend">Select Method</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            label="PayPal"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked={paymentMethod === "PayPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <Form.Check
            type="radio"
            label="Credit / Debit Card"
            id="Card"
            name="paymentMethod"
            value="Card"
            checked={paymentMethod === "Card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <Form.Check
            type="radio"
            label="UPI"
            id="UPI"
            name="paymentMethod"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Button type="submit" variant="primary" className="mt-3">
        Continue
      </Button>
    </Form>
    </>
  );
};

export default Payment;
