import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded shadow-sm">
      {/* Wrap only image and title in Link, not entire Card */}
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title as="h5" className="text-truncate">{product.name}</Card.Title>
          <Rating rating={product.rating} numReview={product.numReviews} />
          <Card.Text as="h5">{product.price}</Card.Text>
          <Card.Text as="h5">{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Product;
