import styles from "../Stripe.module.scss";
const ProductCard = ({ product, setCurrentProduct }) => {
  return (

<div class="col-sm-4 mb-4">
          <div className="card" style={{width:"250px"}} >
            <img src={product.updatedProduct.thumbnail}  className={styles.imgCard}  alt="..." />
            <div className="card-body">
              <h5 className="card-title">{product.updatedProduct.title}</h5>
              <p className="card-text"><strong>Descripción:</strong>
                {product.updatedProduct.description}</p>
              <p className="card-text"><strong>Categoria:</strong>
                {product.updatedProduct.category}</p>
              <p className="card-text"><strong>Precio:</strong> {product.updatedProduct.price}</p>
              <p className="card-text"><strong>Code:</strong> {product.updatedProduct.code}</p>
              <p className="card-text"><strong>Stock:</strong> {product.updatedProduct.stock}</p>
              <p className="card-text"><strong>Total:</strong> ${product.amount}</p>
              <p className="card-text"><strong>Cantidad:</strong> VER CANTIDAD
                {product.updatedProduct.quantity}</p>
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
