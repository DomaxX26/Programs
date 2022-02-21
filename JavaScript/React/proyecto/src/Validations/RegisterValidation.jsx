import * as yup from "yup";

export const userSchema = yup.object().shape({
    name: yup.string().min(6, "Name: To Short").max(255, "Name: Too Long").required("Required"),
    email: yup.string().email().min(6, "Email: Too Short").max(1024, "Email: Too Long").required("Required"),
    password: yup.string().min(6, "Password: Too Short").required("Required"),
    passwordc: yup.string().min(6, "Password: Too Short").oneOf([yup.ref('password'), null], "Passwords don't match!").required("Required"),
});