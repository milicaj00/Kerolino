import { UserModelInterface } from "../../models/user/user.interface"

export const v_register = (data: UserModelInterface): boolean => {
    if (data.name === " " || data.name.length < 2) {
        return false
    }
    if (data.surname === " " || data.surname.length < 2) {
        return false
    }

    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!data.email || !data.email.match(emailFormat)) {
        return false
    }
    if (data.password === " " || data.password.length < 5) {
        return false
    }
    if (data.address === " " || data.address.length < 2) {
        return false
    }
    if (data.postNumber < 10000 || data.postNumber >= 100000) {
        return false
    }
    if (data.city === " " || data.city.length < 2) {
        return false
    }
    // const phone_format = '+381([0-9])[9]'
    if (data.phoneNum === " " || data.phoneNum.length < 2) {
        return false
    }

    return true
}

export const v_login = (data: UserModelInterface): boolean => {

    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!data.email || !data.email.match(emailFormat)) {
        return false
    }
    if (data.password === " " || data.password.length < 5) {
        return false
    }

    return true
}


export const v_edit = (data: UserModelInterface): boolean => {
    if (data.name && (data.name === " " || data.name.length < 2)) {
        return false
    }
    if (data.surname)
        if (data.surname === " " || data.surname.length < 2) {
            return false
        }

    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (data.email)
        if (!data.email || !data.email.match(emailFormat)) {
            return false
        }

    if (data.password)
        if (data.password === " " || data.password.length < 5) {
            return false
        }

    if (data.address)
        if (data.address === " " || data.address.length < 2) {
            return false
        }

    if (data.postNumber)
        if (data.postNumber < 10000 || data.postNumber >= 100000) {
            return false
        }
    if (data.city)
        if (data.city === " " || data.city.length < 2) {
            return false
        }
    // const phone_format = '+381([0-9])[9]'
    if (data.phoneNum)
        if (data.phoneNum === " " || data.phoneNum.length < 2) {
            return false
        }

    return true
}