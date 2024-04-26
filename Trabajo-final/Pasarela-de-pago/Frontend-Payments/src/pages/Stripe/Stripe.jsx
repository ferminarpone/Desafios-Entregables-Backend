import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./components/PaymentForm";
import { useParams } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import styles from "./Stripe.module.scss";
import ProductCard from "./components/ProductCard";
/* import PaymentService from "../../services/paymentService"; */

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Stripe = () => {
  const [currentProduct, setCurrentProduct] = useState([]);
  const [clientSecret, setClientSecret] = useState(null);

  const { tid } = useParams();
  console.log(tid);

  useEffect(() => {
    fetch(`http://localhost:8080/api/carts/ticket/${tid}`).then((result) => {
      result.json().then((json) => {
        console.log(json.ticket.products);
        setCurrentProduct(json.ticket.products);
      });
    });
  }, [tid]);

  /*   useEffect(() => {
    const getClientSecret = async () => {
      console.log(currentProduct);
      const service = new PaymentService();
      service.createPaymentIntent({
        productId: currentProduct,
        callbackSuccess: callbackSuccessPaymentIntent,
        callbackError: callbackErrorPaymentIntent,
      });
    };
    currentProduct && getClientSecret();
  }, [currentProduct]); */

  /*   const callbackSuccessPaymentIntent = (res) => {
    setClientSecret(res.data.payload.client_secret);
  };

  const callbackErrorPaymentIntent = (err) => {
    console.log(err);
  }; */

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Stripe</h1>
      </div>
      <div className={classnames([styles.container, styles.highlighted])}>
        <Wrapper hidden={!currentProduct} /* agregar hidden de boton compra */>
          <div className={styles.productsContainer}>
            {currentProduct.map((product) => (
              <ProductCard
                key={product.updatedProduct._id}
                product={product}
                setCurrentProduct={setCurrentProduct}
              />
            ))}
          </div>
        </Wrapper>
        {/*        <Wrapper hidden={!clientSecret || !stripePromise}>
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: clientSecret }}
          >
            <PaymentForm />
          </Elements>
        </Wrapper> */}
      </div>
    </>
  );
};

export default Stripe;
