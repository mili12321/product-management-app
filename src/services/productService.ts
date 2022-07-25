import { NewProduct, Product } from '../interfaces/product.interface';
import { makeId } from '../utils/makeId';
import { productsList } from '../utils/productsList';
import { loadFromStorage, saveToStorage } from './storageService'

const KEY_PRODUCTS = 'PRODUCTS';
const KEY_PAGE = "PAGE";
const products = productsList
let gProducts: Product[] | []
let gPageData

export const loadProducts = async () : Promise<Product[]> => {
    gProducts = loadFromStorage(KEY_PRODUCTS);
    if (!gProducts?.length) {
        gProducts = products
        saveToStorage(KEY_PRODUCTS, gProducts);
    }
    return gProducts
}

export const getById = (productId: string | number) : Promise<Product> | any => {
    const product = gProducts?.find(product => product.id === productId);
    return Promise.resolve(product);
}

export const remove = (productId: string | number) : Promise<Product[] | []>  => {
    gProducts = gProducts?.filter(product => product.id !== productId)
    if (!gProducts?.length) saveToStorage(KEY_PRODUCTS, []);
    else saveToStorage(KEY_PRODUCTS, gProducts);
    return Promise.resolve(gProducts);
}

export const save = (currProduct: Product| NewProduct) : Promise<Product> => {
    if ((currProduct as Product).id) {
        const idx = gProducts.findIndex(product => product.id === (currProduct as Product).id)
        gProducts.splice(idx, 1, (currProduct as Product));
    }else{
        const productToAdd : Product = {
            id:makeId(),
            creationDate: new Date(),
            ...currProduct
        }
        gProducts=[...gProducts, productToAdd]
    }

    saveToStorage(KEY_PRODUCTS, gProducts);

    return Promise.resolve(currProduct as Product);
}

// export const getPrevNextId = (currProduct: Product) => {
//     const currIdx = gProducts.findIndex(product => product.id === currProduct.id)
//     const nextProduct = gProducts[currIdx + 1] || gProducts[0]
//     const prevProduct = gProducts[currIdx - 1] || gProducts[gProducts.length - 1]

//     return Promise.resolve({
//         prevId: prevProduct.id,
//         nextId: nextProduct.id
//     })
// }

// export const getPageData = () : Promise<PageData> => {
//     gPageData = loadFromStorage(KEY_PAGE) || { chosenBtn: 0, pageIdx: 0 }
//     return Promise.resolve(gPageData)
// }

// export const setPageData = (chosenBtn:any, pageIdx:any) : void => {
//     gPageData = { chosenBtn, pageIdx };
//     saveToStorage(KEY_PAGE, gPageData)
// }