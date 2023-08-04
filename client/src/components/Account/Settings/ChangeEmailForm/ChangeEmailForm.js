import styles from "./ChangeEmailForm.module.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeEmailForm.form";
import { useAuth } from "@/hooks";
import { User } from "@/api";

const userCtrl = new User();

export function ChangeEmailForm() {
    const { user } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(user.email),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await userCtrl.updateMe(user.id, formValue);
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
            <label>Cambiar correo electrónico</label>

            <Form.Input
                name="email"
                placeholder="Nuevo correo electrónico"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <Form.Input
                name="repeatEmail"
                placeholder="Repetir correo electrónico"
                value={formik.values.repeatEmail}
                onChange={formik.handleChange}
                error={formik.errors.repeatEmail}
            />

            <Form.Button type="submit" loading={formik.isSubmitting}>
                Enviar
            </Form.Button>
        </Form>
    );
}
