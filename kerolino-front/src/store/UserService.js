import axiosInstance from "../api/axiosInstance";

export class UserService {
    getUser() {
        return axiosInstance.get("http://localhost:8000/api/user/get-user");
    }

    editUser(user) {
        return axiosInstance.put(
            "http://localhost:8000/api/user/edit-user",
            user
        );
    }
}
