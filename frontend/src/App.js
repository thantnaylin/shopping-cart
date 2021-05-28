import React from "react";
import { Container } from "react-bootstrap";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/screens/Home";

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <main className="py-3">
          <h1>Welcome to Market-place</h1>
          <Home />
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default App;
