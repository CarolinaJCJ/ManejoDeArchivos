import { promises as fs } from "fs";


class ProductManager {
    constructor(ruta) {
        this.path = ruta;
        this.products = []
    }

    static id = 1


    getLeerArchivo = async () => {
      return await fs.readFile(this.path, 'utf-8');
    }

    getFileProductos = async () => {
       let listaProductos = await this.getLeerArchivo();
       this.products = JSON.parse (listaProductos);
       return console.log (this);
    }

    escribirArchivo = async ()=>{
        try{
            let textoJson = JSON.stringify(this.products);
            const lectura = await fs.writeFile(this.path,textoJson,'utf-8',(err,data)=>{
               /* this.products = JSON.parse (lectura);
                this.products = JSON.parse (err);
                this.products = JSON.parse (data);*/
                console.log("se actualizo el archivo data");
            });
        }catch(e){
            console.log ('Error de codigo',e);
        }
    }


    addProduct (products) {
        const code = this.products.find (p => p.code === products.code)
        if(code === undefined) {
        
        this.products.push (products)
        products.id = ProductManager.id++
        console.log("Producto agregado exitosamente");
    } else {
        console.log("El código del producto ya existe");
    }
        
        if(products.title && products.description && products.price && products.thumbnail && products.code 
            && products.stock){

        } else {
            return 'Campos obligatorios requeridos'

        }
    
        
    }

    updateProduct(idModificar,nuevoPrecio){
        let productoAModificar = this.getProductById(idModificar);
        productoAModificar.price = nuevoPrecio;
        console.log('Precio modificado');
    }

    deleteProduct(idABorrar){
        const idproducto = this.products.find (p => p.id === idABorrar)
        if(idproducto === undefined) {
            console.log("Producto no encontrado, no se puede borrar");
        } else {
            let indiceABorrar = null;
            this.products.forEach((elemento,indice)=>{
                if(elemento.id === idABorrar) indiceABorrar = indice;
            });
            if(indiceABorrar !== null){
                this.products.splice(indiceABorrar, 1);
                console.log("Borramos el producto");
            }else{
                console.log("no encontramos el indice");
            }
        }
        
    }

    //Buscar dentro del arreglo por su id
    getProductById(id) {
        const product = this.products.find (p => p.id === id)
        if (!product) { return 'NOT FOUND'}
        return product
    }

    getProducts() {
        return this.products
    }

}

let producto = new ProductManager('ProductManager2/data.json');
producto.getFileProductos();
console.log(producto);


producto.addProduct({title:'objeto 1', description:'Taburete ajustable', price: 31.25, thumbnail:'imag por definir', code:20063, stock: 1})
producto.addProduct({title:'objeto 2', description:'Set agujas 05 RL', price: 25.60, thumbnail:'imag por definir', code:29031, stock: 8})
producto.addProduct({title:'objeto 3', description:'Set tintas Intenze', price: 98.99, thumbnail:'imag por definir', code:18273, stock: 3})
producto.addProduct({title:'objeto 4', description:'Mesas de trabajo para el area desinfectada', price: 15.98, thumbnail:'imag por definir', code:89836, stock:9})
producto.addProduct({title:'objeto 5', description:'Set 100 Cups', price: 1.98, thumbnail:'imag por definir', code:94636, stock: 5})
console.log(producto);
producto.updateProduct(1,59.99);

producto.deleteProduct(2);
producto.deleteProduct(4);
console.log(producto);

producto.escribirArchivo();