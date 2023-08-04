import * as Yup from "yup";

export function initialValues(email) {
    return {
        email,
        repeatEmail: email,
    };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email(true).required(true),
        repeatEmail: Yup.string()
            .email(true)
            .required(true)
            .oneOf([Yup.ref("email")], "Los emails no son iguales."),
    });
}
