import React from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import Product from "../Product";

const HomeScreen = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    getProducts();
  }, []);

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

export default HomeScreen;
