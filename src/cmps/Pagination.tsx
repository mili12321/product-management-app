import { usePagination } from "../hooks/usePagination"
import { Product } from "../interfaces/product.interface"

export const Pagination = ({products, setProductsForDisplayEachPage}:{products:Product[]; setProductsForDisplayEachPage:(productsForDisplayEachPage:Product[])=>void}) => {
    
    const itemsPerPage = 5
    const { next, prev, jump, currentPage, maxPage } = usePagination({data:products, itemsPerPage, setProductsForDisplayEachPage})

    return (
        <div className="pagination-wrapper flex place-center justify-center">
            <div className="prev-page" onClick={prev}>Prev page</div>
            {[...Array(maxPage)].map((val,idx)=>{
                return (
                    <div 
                    className={`page-number ${currentPage===idx+1?'current-page':''}`}
                    key={idx}
                    onClick={()=>jump(idx+1)}
                    >
                        {idx+1}
                    </div>
                )
            })}
            <div className="next-page" onClick={next}>Next page</div>
        </div>
    )
}