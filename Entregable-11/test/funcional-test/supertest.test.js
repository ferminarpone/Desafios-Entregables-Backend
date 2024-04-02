import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:9090");

describe("Testing Ecommerce App", () => {

  describe("Testing Products Api", () => {

    it("Crear prducto: El API POST /api/products debe crear un producto correctamente", async() => {
      //Given
      const product = {
        title: "Testing product",
        description: "Product to test",
        code: "Test1",
        price: 10,
        stock: 4,
        category: "Testing"
      };

      //Then
      /* { statusCode, ok, _body } */
      const result = await requester.post("/api/products").send(product);

      console.log(statusCode, ok, _body);
      /* console.log(statusCode, ok, _body) */
    });

  });
  /*     describe("Testing login",()=>{

    }) */
});
