import { useContext } from "react"
import { GenericButton } from "../../cmps/GenericButton"
import { Product, ProductContextType } from "../../interfaces/product.interface"
import { ProductContext } from "../../productContext/ProductProvider"
import { ItemImage } from "./cmps/ItemImage"

interface Props {
    product:Product;
    setCurrProduct: (product:Product) => void;
    shouldShowForm: boolean;
    setShouldShowForm: (shouldShowForm:boolean) => void;
}
export const ProductDetails = ({ product, setCurrProduct, shouldShowForm, setShouldShowForm }:Props) => {

    const { removeProduct } = useContext(ProductContext) as ProductContextType;

    const onRemoveProduct = async (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        removeProduct(product.id)
    }

    const onHandleClick = () => {
        setCurrProduct(product)
        if(!shouldShowForm){
            setShouldShowForm(!shouldShowForm)
        }
    }
    return (
        <div className="product-details-wrapper flex" onClick={onHandleClick}>
            <ItemImage url={product.image}/>
            <div className='product-details flex column space-between'>
                <div className='flex column'>
                    <div className='name'>{product.name}</div>
                    <div className='description'>{product.description}</div>
                </div>
                <GenericButton name={'remove'} handelClick={onRemoveProduct}/>
            </div>
        </div>
    )
}