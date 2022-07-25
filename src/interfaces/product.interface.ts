export interface Product {
    id: string | number;
    name: string;
    description?: string;
    price: number;
    creationDate: Date;
    image?: string;
}
export interface NewProduct {
    name: string;
    description?: string;
    price: number;
    image?: string;
}
export interface ProductContextType {
    products: Product[] | [];
    addProduct: (newProduct: NewProduct) => void;
    editProduct: (product: Product) => void;
    removeProduct: (id: string|number) => void;
}