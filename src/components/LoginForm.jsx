import CustomForm from "./CustomForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

export default function LoginForm({ hideModal, setFormState, state }) {
    const onSubmit = async (data) => {
        setFormState("LOADING");
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setFormState("SUCCESS");
            hideModal();
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
        <CustomForm
            onSubmit={onSubmit}
            label={"Sign In"}
            inputs={["email", "password"]}
            state={state}
        />
    );
}
