import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, Row, Col, Image, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeItem } from "../slices/cartSlice";
import { Link } from "react-router-dom";


const Cart = () => {

    const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const updateCartByQty = (item, qty) => {
        dispatch(addToCart({ ...item, qty }))
    }

    const deleteItem = (id)=>{
        dispatch(removeItem(id))
    }

    return <>
    <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
        {cartItems.length === 0 ? (
            <div>Cart is empty...</div>
        ) : (<Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    {cartItems.map((item) => (
                        <ListGroupItem>
                            <Row>
                                <Col md={2}><Image fluid rounded src={item.image}></Image></Col>
                                <Col md={4}>{item.name}</Col>
                                <Col md={2}>${item.price}</Col>
                                <Col md={2}><select
                                    id="qty"
                                    value={item.qty}
                                    onChange={(e) => (updateCartByQty(item, Number(e.target.value)))}
                                >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select></Col>
                                <Col md={2}><Button 
                                variant="danger"
                                onClick={() => deleteItem(item._id)}
                                ><FaTrash /></Button></Col>
                            </Row>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card className="p-3 shadow-sm rounded">
                    <ListGroup variant="flush">
                        <ListGroupItem className="d-flex justify-content-between">
                            <strong>Sub-total</strong>
                            <span>${itemsPrice.toFixed(2)}</span>
                        </ListGroupItem>
                        <ListGroupItem className="d-flex justify-content-between">
                            <strong>Shipping</strong>
                            <span>${shippingPrice}</span>
                        </ListGroupItem>
                        <ListGroupItem className="d-flex justify-content-between">
                            <strong>Tax</strong>
                            <span>${taxPrice}</span>
                        </ListGroupItem>
                        <ListGroupItem className="d-flex justify-content-between">
                            <strong>Total</strong>
                            <strong>${totalPrice}</strong>
                        </ListGroupItem>
                    </ListGroup>
                    <Button>Proceed to checkout</Button>
                </Card>
            </Col>
        </Row>
        )}
    </>
}


export default Cart;