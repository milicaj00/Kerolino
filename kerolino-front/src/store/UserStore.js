import { inject } from "react-ioc";
import { makeAutoObservable, runInAction } from "mobx";
import { UserService } from "./UserService";

export class UsersDataStore {
    userService = inject(this, UserService);

    state = {
        user: null
    };

    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true });
        this.getUser(); // fetch data once the UsersDataStore has been created
    }

    get user() {
        return this.state.user;
    }

    async getUser() {
        try {
            const response = await this.userService.getUser();
            runInAction(() => {
                console.log({ response });
                this.state.user = response.data;
            });
        } catch (e) {
           
        }
    }

    async editUser(user) {
        try {
            const response = await this.userService.editUser(user);
            runInAction(() => {
                console.log({ response });
                this.state.user = response.data;
            });
        } catch (e) {
            runInAction(() => {
                throw Error(e);
            });
        }
    }
}
