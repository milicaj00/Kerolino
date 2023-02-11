// import axios from "axios";
import axiosInstance from "./api/axiosInstance";

export async function addOrder(buyerId, products) {
  await axiosInstance
    .post("/api/order/add-order", {
      buyerId,
      products,
    })
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((error) => {
      if (error.response.status === 422) {
        alert(error.response.data.message);
      } else {
        console.log(error.response);
      }
    });
}

export async function sendOrder(id) {
  await axiosInstance
    .put("/api/order/send-order/" + id)
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getAllOrders(setOrders) {
  return await axiosInstance
    .get("/api/order/all-orders")
    .then((data) => {
      console.log(data.data.all_orders);
      setOrders(data.data.all_orders);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getMyOrders(setOrders) {
  return await axiosInstance
    .get("/api/order/my-orders/")
    .then((data) => {
      console.log(data.data.all_orders);
      setOrders(data.data.all_orders);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function deleteOrder(id) {
  return await axiosInstance
    .delete("/api/order/delete-order/" + id)
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getAllCategories(setCategories) {
  return await axiosInstance
    .get("/api/category/get")
    .then((data) => {
      console.log(data.data.categories);
      setCategories(data.data.categories);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function deleteCategory(id) {
  return await axiosInstance
    .delete("/api/category/delete/" + id)
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function addCategory(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  await axiosInstance
    .post("/api/category/add", {
      name: data.get("name"),
    })
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function findProducts(
  setProducts,
  filterName = "",
  filterCategory = ""
) {
  return await axiosInstance
    .get(
      `/api/product/filter-products?name=${filterName}&catId=${filterCategory}`
    )
    .then((data) => {
      console.log(data.data.products);
      setProducts(data.data.products);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function deleteProduct(id) {
  return await axiosInstance
    .delete("/api/product/delete-product/" + id)
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function addProduct(event, picture) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  data.append("image", picture);
  console.log(data.get("image"));
  await axiosInstance
    .post("/api/product/add-product", data)
    .then((res) => {
      console.log(res.data.message);
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 1000);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function modifyProduct(event, picture, id) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  {
    picture !== "" && data.append("image", picture);
  }
  data.append("productId", id);
  console.log(data.get("image"));
  await axiosInstance
    .put("/api/product/edit-product", data)
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function signIn(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  await axiosInstance
    .post("/api/user/login", {
      email: data.get("email"),
      password: data.get("password"),
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data.access_token));

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

export async function signUp(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  await axiosInstance
    .post("/api/user/register", {
      name: data.get("name"),
      surname: data.get("surname"),
      email: data.get("email"),
      password: data.get("password"),
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data.access_token));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

export async function addUser(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  await axiosInstance
    .post("/api/user/add-user", {
      name: data.get("name"),
      surname: data.get("surname"),
      email: data.get("email"),
      address: data.get("address"),
      postNumber: data.get("postNumber"),
      city: data.get("city"),
      phoneNum: data.get("phoneNum"),
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}
