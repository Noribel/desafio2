import { promises as fs } from "fs"

class ProductManager {
    constructor(){
        this.patch = "./productsManager.txt"
        this.productsData = []
    }

    static id = 0 

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {title, description, price, thumbnail, code, stock, id: ProductManager.id }


        this.productsData.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.productsData))
    }

    readProducts = async () => {
        let responseRP = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(responseRP)
    }

    getProducts = async () => {
        let responseGP = await this.readProducts()
        return await console.log(responseGP)
    }

    getProductsById = async (id) =>{
        let responseProdAll = await this.readProducts()
        let responseProdId = responseProdAll.find(product => product.id === id)
        if(!responseProdId){
            console.log("Producto no encontrado")
        }else{
            console.log(responseProdId)
        }   
    }

    deleteProductsById = async (id) => {
        let responseProdAll = await this.readProducts()
        let productFilter = responseProdAll.filter(products => products.id != id)
        if (productFilter.length === responseProdAll.length) {
            console.log("No se encontró ningún producto con el ID " + id);
        } else {
            await fs.writeFile(this.patch, JSON.stringify(productFilter))
            console.log("Producto eliminado con ID " + id);
        }
    }

    updateProducts = async ({ id, ...productUp }) => {
        await this.deleteProductsById(id)
        let responseProdAll = await this.readProducts()
        let prodUpdate = [{ ...productUp, id}, ...responseProdAll]
        await fs.writeFile(this.patch, JSON.stringify(prodUpdate))
    }
}

const products = new ProductManager

