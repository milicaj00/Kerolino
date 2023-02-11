import axiosInstance from "../api/axiosInstance";

export class UserService {
  getUser() {
    return axiosInstance.get("http://localhost:8000/api/user/get-user");
  }

  editUser(user) {
    return axiosInstance.put("http://localhost:8000/api/user/edit-user", user);
  }

  addUser(user) {
    console.log("add");
    const data = new FormData(user);
    return axiosInstance.post("/api/user/add-user", {
      name: data.get("name"),
      surname: data.get("surname"),
      email: data.get("email"),
      address: data.get("address"),
      postNumber: data.get("postNumber"),
      city: data.get("city"),
      phoneNum: data.get("phoneNum"),
    });
  }

  deleteUser(){
    return axiosInstance.delete("http://localhost:8000/api/user/delete-user");
  }
}
