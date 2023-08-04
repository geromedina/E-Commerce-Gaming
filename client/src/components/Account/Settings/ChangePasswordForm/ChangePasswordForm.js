import styles from "./ChangePasswordForm.module.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangePasswordForm.form";
import { User } from "@/api";
import { useAuth } from "@/hooks";

const userCtrl = new User();

export function ChangePasswordForm() {
    const { user, logout } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await userCtrl.updateMe(user.id, {
                    password: formValue.password,
                });
                logout();
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit} className={styles.form}>
            <label>Cambiar contraseña</label>

            <Form.Input
                type="password"
                name="password"
                placeholder="Nueva contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <Form.Input
                name="repeatPassword"
                type="password"
                placeholder="Repetir contraseña"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                error={formik.errors.repeatPassword}
            />

            <Form.Button type="submit" loading={formik.isSubmitting}>
                Enviar
            </Form.Button>
        </Form>
    );
}