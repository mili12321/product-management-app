import { ProductDetails } from "./product/ProductDetails"
import { Product, ProductContextType } from "../interfaces/product.interface"
import { useContext, useEffect, useMemo, useState } from "react"
import { ProductContext } from "../productContext/ProductProvider"
import { EditProduct } from "../cmps/EditProduct"
import { Menu } from "../cmps/Menu"
import { IFilter, ISort } from "../interfaces/filter.interface"
import { Pagination } from "../cmps/Pagination"
import { usePagination } from "../hooks/usePagination"

export const Home = () => {

    const { products } = useContext(ProductContext) as ProductContextType;
    const [productsForDisplay, setProductsForDisplay] = useState<Product[] | []>([])
    const [productsForDisplayEachPage, setProductsForDisplayEachPage] = useState<Product[] | []>([])
    const [shouldShowForm, setShouldShowForm] = useState(false)
    const [currProduct, setCurrProduct] = useState< Product | {} >({})
    const [filterBy, setFilterBy] = useState<IFilter>({name:'', description:''})
    const [sortBy, setSortBy] = useState<ISort>('')
    
    useEffect(() => {
        const getProductsForDisplay = () => {
            let filteredProducts = [...products]
            if(sortBy){
                filteredProducts = onSortProducts()
            }
            if(filterBy.name||filterBy.description){
                filteredProducts = filteredProducts.filter(product =>
                    (product as Product)?.name.toLowerCase().includes(filterBy.name.toLowerCase()) ||
                    (product as Product)?.description?.toLowerCase().includes(filterBy.description.toLowerCase())
                )
            }

            return filteredProducts
        }
        
        const onSortProducts = () => {
            const sortable: Product[]= [...products]?.sort(
                (a: Product, b: Product) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
            )
            return sortable
        }

        const newProductList = getProductsForDisplay()
        setProductsForDisplay(newProductList)
    }, [filterBy,sortBy,products])
    
    return (
        <>
            {!products ? <div>Loading...</div>
            :
            <div className="home flex column">
                <Menu 
                setShouldShowForm={setShouldShowForm} 
                setCurrProduct={setCurrProduct}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                setSortBy={setSortBy}
                sortBy={sortBy}
                />
               <div className="flex">
                <div className="products-list-wrapper">
                    {
                        productsForDisplayEachPage.length ? 
                        productsForDisplayEachPage.map((product:Product) =>
                        <ProductDetails 
                        key={product.id} 
                        product={product} 
                        setCurrProduct={setCurrProduct}
                        shouldShowForm={shouldShowForm}
                        setShouldShowForm={setShouldShowForm}
                        />)
                        :<div>No Items</div>
                    }
                    </div>
                    {
                        shouldShowForm&&
                        <EditProduct product={currProduct}/>
                    }
               </div>
               <Pagination products={productsForDisplay} setProductsForDisplayEachPage={setProductsForDisplayEachPage}/>
            </div>}
        </>
    )
}