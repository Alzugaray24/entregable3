import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.get("/", async (req, res) => {
  try {
    await ProductManager.addProduct(
      "Laptop",
      "Gamer desktop",
      200,
      "laptop1.jpg",
      1001,
      10
    );
    await ProductManager.addProduct(
      "Teléfono",
      "Smartphone",
      499,
      "telefono1.jpg",
      2002,
      15
    );
    await ProductManager.addProduct(
      "Tablet",
      "Tablet Android",
      149,
      "tablet1.jpg",
      3003,
      5
    );
    await ProductManager.addProduct(
      "Impresora",
      "Impresora WiFi",
      99,
      "impresora1.jpg",
      4004,
      7
    );

    const limit = req.query.limit;
    console.log(limit);
    const products = await ProductManager.loadProducts();

    if(!limit) return res.send({ products });

    const productLimit = products.slice(0, limit)

    if(limit > productLimit.length) return res.send("No es posible cargar esa cantidad de productos")

    res.send(productLimit)


  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send({ error: "Error al obtener productos" });
  }
});

app.get("/:id", async (req, res) => {
    const productoId = parseInt(req.params.id )

    try {
        const product = await ProductManager.getProductById(productoId)
        
        if(!product) return res.status(404).send({ error: "Producto no encontrado" });
        
        res.send({product})

    } catch (error) {
      console.error("Error al buscar el producto:", error);
      res.status(500).send({ error: "Error al buscar el producto:" });
    }
  });


app.listen(8080, () => console.log("Bienvenido al puerto 8080"));
