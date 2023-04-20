import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "src/firebase-config";

import Form from "src/components/Forms/Form";

export default function LoginForm({ setFormState, state, showForm }) {
    const onSubmit = async (data) => {
        setFormState("LOADING");
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setFormState("SUCCESS");
        } catch (e) {
            if (
                e.message === "Firebase: Error (auth/invalid-email)." ||
                "Firebase: Error (auth/user-not-found)."
            ) {
                setFormState("ERROR", "Invalid Email.");
                console.log(e);
            } else if (e.message === "Firebase: Error (auth/wrong-password).") {
                setFormState("ERROR", "Wrong Password.");
                console.log(e);
            }
        }
    };

    return (
        <Form
            onSubmit={onSubmit}
            label={"Sign In"}
            inputs={["email", "password"]}
            state={state}
            showForm={showForm}
        />
    );
}
