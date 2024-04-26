import styles from "../Stripe.module.scss";
const ProductCard = ({ product, setCurrentProduct }) => {
  return (
<div className="col-sm-4 mb-4" /* style={{margin:"auto"}} */>
          <div className="card" style={{width:"auto", minHeight:"425px"}} >
            <img src={product.updatedProduct.thumbnail}  className={styles.imgCard}  alt="..." />
            <div className="card-body">
              <h5 className="card-title">{product.updatedProduct.title}</h5>
              <p className="card-text"><strong>Descripción:</strong>
                {product.updatedProduct.description}</p>
              <p className="card-text"><strong>Precio:</strong> ${product.updatedProduct.price}</p>
              <p className="card-text"><strong>Cantidad:</strong> {product.quantity}
                {product.updatedProduct.quantity}</p>
              <p className="card-text"><strong>Total:</strong> ${product.amount}</p>
            </div>
          </div>

                {/*         <div className={styles.productCard} onClick={()=>setCurrentProduct(product.id)} >
                      <p>{product.updatedProduct.title}</p>
                      <p>{product.updatedProduct.price}</p>
                  </div> */}
        </div>
  );
};

export default ProductCard;
