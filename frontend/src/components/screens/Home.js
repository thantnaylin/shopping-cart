import React from "react";
import { Row, Col } from "react-bootstrap";

import Product from "../Product";
import products from "./../../products";

const Home = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((p) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={p._id}>
              <Product product={p} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Home;
