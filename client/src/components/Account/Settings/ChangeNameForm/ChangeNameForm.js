import { useFormik } from "formik";
import styles from "./ChangeNameForm.module.scss";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./ChangeNameForm.form";
import { User } from "@/api";
import { Form } from "semantic-ui-react";

const userCtrl = new User();

export function ChangeNameForm() {
    const { user } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(user.firstname, user.lastname),
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
        <Form onSubmit={formik.handleSubmit}>
            <label>Nombre y apellidos</label>
            <div className={styles.content}>
                <Form.Group widths="equal">
                    <Form.Input
                        name="firstname"
                        type="text"
                        placeholder="Nombre"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        error={formik.errors.firstname}
                    />
                    <Form.Input
                        name="lastname"
                        type="text"
                        placeholder="Apellido"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        error={formik.errors.lastname}
                    />
                </Form.Group>
                <Form.Button type="submit" loading={formik.isSubmitting}>
                    Enviar
                </Form.Button>
            </div>
        </Form>
    );
}
