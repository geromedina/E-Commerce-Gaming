import { JoinLayout } from "@/layouts";
import styles from "./sign-in.module.scss";
import React from "react";

export default function SignInPage() {
    return (
        <>
            <JoinLayout>
                <div className={styles.signIn}>
                    <h3>Iniciar sesión</h3>
                </div>
            </JoinLayout>
        </>
    );
}
