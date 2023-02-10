import { makeAutoObservable, runInAction } from "mobx";

export class BagStore {
  state = {
    product: [],
  };

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get product() {
    return this.state.product;
  }

  async addProduct(p) {
    try {
      runInAction(() => {
        this.state.product.push(p);
      });
    } catch (e) {
      runInAction(() => {
        throw Error(e);
      });
    }
  }
  async removeProduct(p) {
    try {
      const tmp = this.state.product.filter((p1) => p1._id !== p._id);
      runInAction(() => {
        this.state.product = tmp;
      });
    } catch (e) {
      runInAction(() => {
        throw Error(e);
      });
    }
  }
}
