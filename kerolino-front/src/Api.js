import axios from "axios";

export async function getAllProducts(setProducts) {

    return await axios
      .get("http://localhost:8000/api/product/all-products")
      .then((data) => {
        console.log(data.data.products  );
        setProducts(data.data.products);
      });
  }
  