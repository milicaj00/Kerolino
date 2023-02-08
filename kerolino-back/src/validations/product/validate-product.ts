import { ProductModelInterface } from "../../models/product/product.interface";

export const v_create = (data: ProductModelInterface): boolean => {

    if (data.name === " " || data.name.length < 2) {
        return false
    }

    if (data.price < 1 || data.price >= 100000) {
        return false
    }

    if (data.amount < 1 || data.amount >= 100000) {
        return false
    }

    return true
}

export const v_edit = (data: ProductModelInterface): boolean => {

    if (data.name)
        if (data.name === " " || data.name.length < 2) {
            return false
        }

    if (data.price)
        if (data.price < 1 || data.price >= 100000) {
            return false
        }

    if (data.amount)
        if (data.amount < 1 || data.amount >= 100000) {
            return false
        }

    return true
}