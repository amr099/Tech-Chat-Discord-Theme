import React, { useContext, useState } from "react";
import CustomForm from "./CustomForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { AuthContext } from "context/AuthContext";

export default function LoginForm({ setModal }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data) => {
        setError(false);
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setModal(false);
            setLoading(false);
            setSuccess(true);
        } catch (e) {
            if (e.message === "Firebase: Error (auth/invalid-email).") {
                setError("Invalid Email.");
                setLoading(false);
                console.log(e);
            } else if (e.message === "Firebase: Error (auth/wrong-password).") {
                setError("Wrong Password.");
                setLoading(false);
                console.log(e);
            }
        }
    };

    return (
        <CustomForm
            onSubmit={onSubmit}
            label={"Sign In"}
            inputs={["email", "password"]}
            success={success}
            loading={loading}
            error={error}
        />
    );
}
