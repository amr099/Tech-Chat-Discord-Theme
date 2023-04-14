import CustomForm from "./CustomForm";
import { auth, storage, firestoreDb, db } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { set, ref as realref } from "firebase/database";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

export default function RegisterForm({ state, dispatch }) {
    const usersCol = collection(firestoreDb, "Users");
    const [users, uloading, uerror, snapshot] = useCollectionData(usersCol);

    const onSubmit = async (data) => {
        dispatch({ type: "LOADING" });
        if (users?.find((e) => e.name === data.name)) {
            dispatch({
                type: "ERROR",
                payloading: "Username is already exists.",
            });
            return;
        }
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await set(realref(db, "users/" + user.user.uid), {
                id: user.user.uid,
                name: data.name,
            });

            // ========================================================================

            /** @type {any} */
            const metadata = {
                contentType: "image/jpeg",
            };

            const storageRef = ref(storage, "images/" + data.name);
            const uploadTask = uploadBytesResumable(
                storageRef,
                data.image[0],
                metadata
            );
            let progress;
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    switch (error.code) {
                        case "storage/unauthorized":
                            dispatch({
                                type: "ERROR",
                                payloading:
                                    "Error uploading Image (unauthorized)",
                            });
                            break;
                        case "storage/canceled":
                            dispatch({
                                type: "ERROR",
                                payloading: "Error uploading Image (canceled)",
                            });
                            break;
                        case "storage/unknown":
                            dispatch({
                                type: "ERROR",
                                payloading: "Error uploading Image (unknown)",
                            });
                            break;
                    }
                },
                () => {
                    if (progress === 100) {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            async (downloadURL) => {
                                await setDoc(
                                    doc(firestoreDb, "Users", user.user.uid),
                                    {
                                        id: user.user.uid,
                                        name: data.name,
                                        email: data.email,
                                        img: downloadURL,
                                    }
                                );
                            }
                        );
                    }
                }
            );

            dispatch({
                type: "SUCCESS",
            });

            // ===============================================================================
        } catch (e) {
            console.log(e.message);
            if (e.message === "Firebase: Error (auth/email-already-in-use).") {
                dispatch({
                    type: "ERROR",
                    payloading: "Email is already exists.",
                });
            }

            if (e.message === "Firebase: Error (auth/invalid-email).") {
                dispatch({
                    type: "ERROR",
                    payloading: "Email is Invalid.",
                });
            }
            if (
                e.message ===
                "Firebase: Password should be at least 6 characters (auth/weak-password)."
            ) {
                dispatch({
                    type: "ERROR",
                    payloading: "Password should be at least 6 characters.",
                });
            }
        }
    };
    return (
        <CustomForm
            label={"Register"}
            onSubmit={onSubmit}
            inputs={["name", "email", "password", "image"]}
            state={state}
        />
    );
}
