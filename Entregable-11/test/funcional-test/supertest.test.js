import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:9090");

describe("Testing Ecommerce App", () => {
  describe("Testing Products Api", () => {
    it("Crear prducto: El API POST /api/products debe crear un producto correctamente", async () => {
      //Given
      const product = {
        title: "Testing product",
        description: "Product to test",
        code: "Test1",
        price: 10,
        stock: 4,
        category: "Testing",
      };

      //Then
      const { statusCode, ok, _body } = await requester
        .post("/api/products")
        .send(product);

      //Assert
      expect(_body.response._id).to.be.ok;
      expect(statusCode).is.eqls(200);
    });

    it("Crear prducto sin un dato requerido: El API POST /api/products no debe crear un producto y debe retornar status code HTTP 400", async () => {
      //Given
      const product = {
        /*           title: "Testing product", */
        description: "Product to test",
        code: "Test1",
        price: 10,
        stock: 4,
        category: "Testing",
      };

      //Then
      const { statusCode, ok, _body } = await requester
        .post("/api/products")
        .send(product);

      //Assert
      expect(statusCode).is.eqls(400);
      expect(ok).is.eql(false);
    });
  });
  /*     describe("Testing login",()=>{

    }) */
});
