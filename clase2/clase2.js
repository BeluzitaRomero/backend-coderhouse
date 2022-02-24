const fs = require("fs").promises;

class Container {
  constructor(file) {
    this.file = file;
  }

  async getAll() {
    /**Object[] - Devuelve un array con los objetos presentes en el archivo */
    try {
      const allProducts = await fs.readFile(this.file, "utf-8");
      return JSON.parse(allProducts);
    } catch (err) {
      console.log("No hay productos");
      return null;
    }
  }

  async save(product) {
    /*Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.*/
    const arrayProducts = await this.getAll();

    if (!arrayProducts) {
      await fs.writeFile(this.file, "[]");
    } else if (arrayProducts.length === 0) {
      product = { ...product, id: 1 };
      arrayProducts.push(product);
      await fs.writeFile(this.file, JSON.stringify(arrayProducts));
      console.log("se guardo el primer producto"); //despues los saco
      return product.id;
    } else {
      let id = arrayProducts.map((p) => p.id);
      let maxId = Math.max(...id) + 1;
      const saveProduct = { ...product, id: maxId };
      await arrayProducts.push(saveProduct);
      await fs.writeFile(this.file, JSON.stringify(arrayProducts));
      console.log("se guardo un producto mas"); //despues los saco
      return saveProduct.id;
    }
  }

  async getById(number) {
    /*Object - Recibe un id y devuelve el objeto con ese id, o null si no está.*/

    let showId = await this.getAll();
    let objectSelected = showId.find((obj) => obj.id === number);
    if (objectSelected) {
      return objectSelected;
    } else {
      return null;
    }
  }

  async deleteById(id) {
    /** void - Elimina del archivo el objeto con el id buscado.
     */
    const arrayProducts = await this.getAll();
    const updateArray = arrayProducts.filter((obj) => obj.id !== id);

    await fs.writeFile(this.file, JSON.stringify(updateArray));
  }

  async deleteAll() {
    /**void - Elimina todos los objetos presentes en el archivo.
     */
    try {
      await fs.writeFile(this.file, "[]");
    } catch {
      console.log("No hay productos para borrar");
    }
  }
}

(() => {
  const container = new Container("productos.json");

  const object = {
    title: "Cuaderno N°3",
    price: 480,
    thumbnail:
      "https://images.pexels.com/photos/236111/pexels-photo-236111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };
  const object2 = {
    title: "Microfibras x4",
    price: 800,
    thumbnail:
      "https://images.pexels.com/photos/998591/pexels-photo-998591.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260oto",
  };
  const object3 = {
    title: "Lapiceras",
    price: 800,
    thumbnail:
      "https://images.pexels.com/photos/998591/pexels-photo-998591.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260oto",
  };
  await container.deleteAll();
  console.log(await container.save(object));
  console.log(await container.save(object2));
  console.log(await container.save(object3));
  console.log(await container.getById(2));
  await container.deleteById(1);
})();
