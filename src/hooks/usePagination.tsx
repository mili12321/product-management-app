import React, {useEffect, useState} from 'react';
import { Product } from '../interfaces/product.interface';

interface Props{
    itemsPerPage:number;
    data:Product[];
    setProductsForDisplayEachPage:(productsForDisplayEachPage:Product[])=>void;
}

export const usePagination = ({data, itemsPerPage,setProductsForDisplayEachPage}:Props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);  
 
    useEffect(() => {
        function currentData() {
            const begin = (currentPage - 1) * itemsPerPage;
            const end = begin + itemsPerPage;
            return data.slice(begin, end);
        } 
        setProductsForDisplayEachPage(currentData())
    }, [currentPage, data, setProductsForDisplayEachPage, itemsPerPage])


    function next() {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    }   
    function prev() {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }   
    function jump(page:number) {
        const pageNumber = Math.max(1, page);
        setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
    }   
    return { next, prev, jump, currentPage, maxPage };
 }
