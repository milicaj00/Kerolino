import { inject } from "react-ioc";
import { makeAutoObservable, runInAction } from "mobx";
import { UserService } from "./UserService";

export class UsersDataStore {
    userService = inject(this, UserService);

    state = {
        user: null,
        loading: false
    };

    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true });
        this.getUser(); // fetch data once the UsersDataStore has been created
    }

    get user() {
        return this.state.user;
    }
    get loading() {
        return this.state.loading;
    }

    async addUser(user) {
        try {
            const response = await this.userService.addUser(user);
            runInAction(() => {
                console.log({ response });
                this.state.user = response.data;
            });
        } catch (e) {}
    }

    async getUser() {
        try {
            this.state.loading = true;
            const response = await this.userService.getUser();
            runInAction(() => {
                console.log({ response });
                this.state.user = response.data;
                this.state.loading = false;
            });
        } catch (e) {
            this.state.loading = false;
        }
    }

    async editUser(form) {
        const data = new FormData(form);
        const pom = {
            address: data.get("address"),
            postNumber: data.get("postNumber"),
            city: data.get("city"),
            phoneNum: data.get("phoneNum")
        };
        if (
            this.user.address === pom.address &&
            this.user.postNumber === pom.postNumber &&
            this.user.city === pom.city &&
            this.user.phoneNum === pom.phoneNum
        ) {
            return;
        }
        try {
            this.state.loading = true;
            const response = await this.userService.editUser(pom);
            runInAction(() => {
                console.log({ response });
                this.state.user = response.data;
                this.state.loading = false;
            });
        } catch (e) {
            runInAction(() => {
                throw Error(e);
                this.state.loading = false;
            });
        }
    }

    async deleteUser() {
        try {
            const response = await this.userService.deleteUser();
            runInAction(() => {
                console.log({ response });
                this.state.user = null;
                localStorage.removeItem("token");
            });
        } catch (e) {}
    }
}
