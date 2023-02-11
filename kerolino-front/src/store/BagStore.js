import { makeAutoObservable, runInAction } from "mobx";

export class BagStore {
    state = {
        product: []
    };

    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true });
        this.getProducts();
    }

    get product() {
        return this.state.product;
    }

    async getProducts() {
        try {
            const prod = JSON.parse(localStorage.getItem("products"));
            runInAction(() => {
                this.state.product = prod ? prod : [];
            });
        } catch (e) {
            runInAction(() => {
                throw Error(e);
            });
        }
    }

    addProduct(p) {
        console.log(p);
        try {
            runInAction(() => {
                let found = false;
                for (let i = 0; i < this.state.product.length; i++) {
                    if (this.state.product[i].pr._id === p._id) {
                        if (p.amount > this.state.product[i].amount) {
                            this.state.product[i].amount += 1;
                        }
                        found = true;
                        return;
                    }
                }
                if (!found) {
                    this.state.product.push({
                        pr: p,
                        productId: p._id,
                        amount: 1
                    });
                }
                localStorage.setItem("products", JSON.stringify(this.product));
            });
        } catch (e) {
            runInAction(() => {
                throw Error(e);
            });
        }
    }
    removeProduct(p) {
        try {
            const tmp = this.state.product.filter(p1 => p1.pr._id !== p._id);
            runInAction(() => {
                this.state.product = tmp;
            });
        } catch (e) {
            runInAction(() => {
                throw Error(e);
            });
        }
    }

    emptyBag() {
        runInAction(() => {
            this.state.product = [];
            localStorage.removeItem("products");
        });
    }
}
