import {create} from "zustand"; //zustand is a state management library for react

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "Missing required fields"}
        }
        if(typeof Number(newProduct.price) !== "number" || Number(newProduct.price) <= 0){
            return {success: false, message: "Price must be a number greater than 0"}
        }
    const res = await fetch("/api/products",{ //we dont need to write http://localhost:3000/api/products because we have proxy in vite.config.js
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({products: [...state.products, data.data]}))
    return {success: true, message: "Product created successfully"}
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data})
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message}
        
        set(state => ({ products: state.products.filter(product => product._id !== pid)})); //filter out the product with the id that we want to delete also it will update the ui immediately
        return {success: true, message: data.message}
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return {success: false, message: data.message}
        //update the ui immediately
        set((state) => ({
            products: state.products.map(product => product._id === pid ? data.data : product)
        }))
        return {success: true, message: data.message}
    }
}))
