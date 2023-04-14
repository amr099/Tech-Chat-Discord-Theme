import CustomForm from "./CustomForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

export default function LoginForm({ setModal, dispatch, state }) {
    const onSubmit = async (data) => {
        dispatch({ type: "LOADING" });
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setModal(false);
            dispatch({ type: "SUCCESS" });
        } catch (e) {
            if (
                e.message === "Firebase: Error (auth/invalid-email)." ||
                "Firebase: Error (auth/user-not-found)."
            ) {
                dispatch({ type: "ERROR", payload: "Invalid Email." });
                console.log(e);
            } else if (e.message === "Firebase: Error (auth/wrong-password).") {
                dispatch({ type: "ERROR", payload: "Wrong Password." });
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
