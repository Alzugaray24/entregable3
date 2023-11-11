import fs from "fs/promises";
const fileName = "./productos.json";

class ProductManager {

  static get path() {
    return fileName;
  }

  static async loadProducts() {
    try {
      const contenido = await fs.readFile(fileName, "utf-8");
      if (contenido) {
        return JSON.parse(contenido);
      }
      return [];
    } catch (err) {
      console.error("Error al leer el archivo:", err);
      return [];
    }
  }

  static async addProduct(title, descripcion, price, thumbnail, code, stock) {
    try {
      const products = await ProductManager.loadProducts();

      if (!title || !descripcion || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      const codeExiste = products.find((buscar) => buscar.code === code);

      if (codeExiste) {
        console.log("El código ya existe");
        return;
      }

      const producto = {
        id: products.length + 1,
        title,
        descripcion,
        price,
        thumbnail,
        code,
        stock,
      };

      products.push(producto);
      await fs.writeFile(fileName, JSON.stringify(products, null, "\t"));
      console.log("Producto agregado exitosamente.");
    } catch (err) {
      console.error("Error al agregar el producto:", err);
    }
  }

  static async getProductById(id) {
    try {
      const contenido = await fs.readFile(ProductManager.path, "utf-8");
      const data = JSON.parse(contenido);
      const product = data.find((elemento) => elemento.id === id);

      if (!product) {
        console.log("El id no existe.");
      } else {
        console.log(`Elemento encontrado: ${JSON.stringify(product)}`);
        return product;
      }
    } catch (err) {
      console.error("Error al leer el archivo:", err);
    }
  }

  static async updateProduct(id, fieldToUpdate, newValue) {
    try {
      const contenido = await fs.readFile(ProductManager.path, "utf-8");
      const data = JSON.parse(contenido);

      const index = data.findIndex((elemento) => elemento.id === id);

      if (index === -1) {
        console.log("El producto con el ID proporcionado no existe.");
        return;
      }

      if (!(fieldToUpdate in data[index])) {
        console.log(`El campo "${fieldToUpdate}" no existe en el producto.`);
        return;
      }

      data[index][fieldToUpdate] = newValue;

      await fs.writeFile(ProductManager.path, JSON.stringify(data, null, "\t"));
      console.log("Producto actualizado exitosamente.");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }

  static async deleteProduct(id) {
    try {
      const contenido = await fs.readFile(ProductManager.path, "utf-8");
      const data = JSON.parse(contenido);

      const index = data.findIndex((elemento) => elemento.id === id);

      if (index === -1) {
        console.log("El elemento no existe");
      } else {
        data.splice(index, 1);
        await fs.writeFile(ProductManager.path, JSON.stringify(data, null, "\t"));
        console.log("Producto eliminado exitosamente.");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }
}

export default ProductManager;
