import React, { createContext, useReducer, useMemo,useEffect } from 'react';
import { makeId } from '../utils/makeId';
import productReducer from './ProductReducer';
import { loadFromStorage, saveToStorage } from '../services/storageService'
import { productsList } from '../utils/productsList';
const KEY_PRODUCTS = 'PRODUCTS';


const initialState = {
    products: []
};

export const ProductContext = createContext(initialState);

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    useEffect(() => {
        let localProducts = loadFromStorage(KEY_PRODUCTS);
        if (!localProducts?.length) {
            localProducts = productsList
        }
        dispatch({ 
            type: "LOAD_PRODUCTS",
            payload: localProducts
        })
    }, [])

    function addProduct(newProduct) {
        const product = {
            id: makeId(),
            creationDate: new Date(),
            ...newProduct
        }
        dispatch({
            type: "ADD_PRODUCT",
            payload: product
        });
    }

    function editProduct(product) {
        dispatch({
            type: "EDIT_PRODUCT",
            payload: product
        });
    }

    function removeProduct(id) {
        dispatch({
            type: "REMOVE_PRODUCT",
            payload: id
        });
    }

    useEffect(() => {
        saveToStorage(KEY_PRODUCTS, state.products);
    }, [state.products])
    

    const value = useMemo(() => ({
        products: state.products,
        addProduct,
        editProduct,
        removeProduct
    }), [state.products]);

    return (  <ProductContext.Provider
        value={value}
      >
        {children}
      </ProductContext.Provider>
    )
};