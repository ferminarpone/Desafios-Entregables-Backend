import { productModel } from "../../models/products.model.js";

class ProductDao {
  async getAllProducts(limit, page, sort, filter) {
    const query = {};
    if (filter != undefined) {
      if (
        filter.split(":")[0] == "title" ||
        filter.split(":")[0] == "category" ||
        filter.split(":")[0] == "description"
      ) {
        query[filter.split(":")[0]] = {
          $regex: new RegExp(filter.split(":")[1], "i"),
        };
      } else if (
        filter.split(":")[0] == "_id" ||
        filter.split(":")[0] == "price" ||
        filter.split(":")[0] == "code" ||
        filter.split(":")[0] == "status"
      ) {
        query[filter.split(":")[0]] = filter.split(":")[1];
      } else {
        throw Error("El campo que desea filtrar no existe.");
      }
    }
    const orderedQuery = productModel
      .find(query)
      .sort({ price: sort === "desc" ? -1 : 1 });
    try {
      const products = await productModel.paginate(orderedQuery, {
        page: page || 1,
        limit: limit || 10,
      });
      const newObject = {
        status: "succes",
        payload: products.docs,
        totalDocs: products.totalDocs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
      };
      return newObject;
    } catch (e) {
      throw Error(e.message);
    }
  }

  async getProductById(id) {
    return await productModel.findById(id);
  }

  async createProduct(product) {
    return await productModel.create(product);
  }

  async updateProduct(id, product) {
    return await productModel.findByIdAndUpdate(id, product);
  }

  async deleteProduct(id) {
    return await productModel.findByIdAndDelete(id);
  }
}

export default new ProductDao();
