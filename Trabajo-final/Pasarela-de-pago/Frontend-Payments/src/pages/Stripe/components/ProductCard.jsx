
import styles from '../Stripe.module.scss'
const ProductCard = ({ product, setCurrentProduct}) => {
    return (<>
        <div className={styles.productCard} /* onClick={()=>setCurrentProduct(product.id)} */>
            <p>{product.updatedProduct.title}</p>
            <p>{product.updatedProduct.price}</p>
        </div>
    </>)
}

export default ProductCard;