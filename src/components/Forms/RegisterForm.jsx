import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { set, ref as realref } from "firebase/database";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

import { auth, storage, firestoreDb, db } from "src/firebase-config";
import Form from "src/components/Forms/Form";
import { useContext } from "react";
import { UsersContext } from "src/context/UsersContext";

export default function RegisterForm({ state, setFormState, showForm }) {
    const users = useContext(UsersContext);

    const onSubmit = async (data) => {
        setFormState("LOADING");
        if (users?.find((e) => e.name === data.name)) {
            setFormState("ERROR", "Username is already exists.");

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
                            setFormState(
                                "ERROR",
                                "Error uploading Image (unauthorized)"
                            );
                            break;
                        case "storage/canceled":
                            setFormState(
                                "ERROR",
                                "Error uploading Image (canceled)"
                            );
                            break;
                        case "storage/unknown":
                            setFormState(
                                "ERROR",
                                "Error uploading Image (unknown)"
                            );
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
            setFormState("SUCCESS");

            // ===============================================================================
        } catch (e) {
            console.log(e.message);
            if (e.message === "Firebase: Error (auth/email-already-in-use).") {
                setFormState("ERROR", "Email is already exists.");
            }

            if (e.message === "Firebase: Error (auth/invalid-email).") {
                setFormState("ERROR", "Email is Invalid.");
            }
            if (
                e.message ===
                "Firebase: Password should be at least 6 characters (auth/weak-password)."
            ) {
                setFormState(
                    "ERROR",
                    "Password should be at least 6 characters."
                );
            }
        }
    };
    return (
        <Form
            label={"Register"}
            onSubmit={onSubmit}
            inputs={["name", "email", "password", "image"]}
            state={state}
            showForm={showForm}
        />
    );
}
