import { toast } from "react-toastify";
import "../index.css";

export const notifySuccess = message => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-success",
        bodyClassName: "toast-success-body",
        progressClassName: "toast-success-progress-bar"
    });
};

export const notifyError = message => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
       
    });
};
