const fs = require("fs");

class Container {
  constructor(file) {
    this.file = file;
  }

  async save(product) {
    /*Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.*/
    const arrayProducts = await this.getAll();
    let id = arrayProducts.map((p) => p.id);
    let maxId = Math.max(...id);
    const saveProduct = { ...product, id: maxId + 1 };
    await arrayProducts.push(saveProduct);

    try {
      await fs.promises.writeFile(this.file, JSON.stringify(arrayProducts));
      return saveProduct.id;
    } catch {
      console.log("No se pudo guardar el producto");
    }
  }

  async getById(number) {
    /*Object - Recibe un id y devuelve el objeto con ese id, o null si no está.*/
    try {
      let showId = await this.getAll();
      let objectSelected = showId.find((obj) => obj.id === number);
      if (objectSelected) {
        return objectSelected;
      } else {
        return null;
      }
    } catch (err) {
      console.log("No se encuentra el producto");
    }
  }

  async getAll() {
    /**Object[] - Devuelve un array con los objetos presentes en el archivo */
    try {
      const allProducts = await fs.promises.readFile(this.file, "utf-8");
      return JSON.parse(allProducts);
    } catch (err) {
      console.log("No hay productos");
      return null;
    }
  }

  async deleteById(id) {
    /** void - Elimina del archivo el objeto con el id buscado.
     */
    const arrayProducts = await this.getAll();
    const updateArray = arrayProducts.filter((obj) => obj.id !== id);

    try {
      await fs.promises.writeFile(this.file, JSON.stringify(updateArray));
    } catch (err) {
      console.log("Error al guardar");
    }
  }

  async deleteAll() {
    /**void - Elimina todos los objetos presentes en el archivo.
     */
    const fs = require("fs");
    try {
      await fs.promises.writeFile(this.file, "[]");
    } catch {
      console.log("No hay productos para borrar");
    }
  }
}

async function process() {
  const newProduct = new Container("productos.json");

  const objeto = {
    title: "Cuaderno N°3",
    price: 480,
    thumbnail:
      "https://images.pexels.com/photos/236111/pexels-photo-236111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };
  const objeto2 = {
    title: "Microfibras x4",
    price: 800,
    thumbnail:
      "una fhttps://images.pexels.com/photos/998591/pexels-photo-998591.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260oto",
  };

  console.log(await newProduct.save(objeto));
  console.log(await newProduct.save(objeto2));
  console.log(await newProduct.getById(2));
  console.log(await newProduct.getById(10));
  await newProduct.deleteById(4);
  //   await newProduct.deleteAll();
}

process();
