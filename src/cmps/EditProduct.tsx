import { useContext, useEffect, useState } from "react";
import { Product, NewProduct, ProductContextType } from "../interfaces/product.interface"
import { ProductContext } from "../productContext/ProductProvider";

interface Props{
  product:Product|{};
}
export const EditProduct = ({product}:Props) => {

    const [currProduct, setCurrProduct] = useState< Product | NewProduct | {} >(product as Product)
    const { addProduct, editProduct } = useContext(ProductContext) as ProductContextType;
    
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = (e.target.type === 'number') ? +e.target.value : e.target.value
        setCurrProduct((prevState => {
            return {...prevState, ...{[e.target.name]: value}}
        }))
    }

    useEffect(() => {
        setCurrProduct(product)
    }, [product])
    

    const onSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (currProduct as Product)?.id ?
        editProduct(currProduct as Product)
        :
        addProduct(currProduct as NewProduct)

        setCurrProduct({name:'', description:'', price:''})
    }

    return (
        <div className="edit-product-wrapper">
             <form className="edit-form" onSubmit={onSaveProduct}>
                <table>
                  <tr>
                    <th colSpan={2}>{`${(currProduct as Product)?.id?'Edit ':'Add '}`}Product:</th>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td><input autoFocus required maxLength={30} type="text" value={(currProduct as Product | NewProduct)?.name} onChange={handleInput} name="name" /></td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td><input autoFocus type="text" maxLength={200} value={(currProduct as Product | NewProduct)?.description} onChange={handleInput} name="description" /></td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td><input className="edit-price" autoFocus required min="1" step="1" type="number" value={(currProduct as Product | NewProduct)?.price} onChange={handleInput} name="price" /></td>
                  </tr>
                </table>
                <div className="edit-btn-container">
                    <button>Save</button>
                </div>
               
            </form>
        </div>
    )
}