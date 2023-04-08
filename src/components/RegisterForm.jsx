import React, { useState } from "react";
import CustomForm from "./CustomForm";
import { auth, storage, firestoreDb, db } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { set, ref as realref } from "firebase/database";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

export default function RegisterForm() {
    const usersCol = collection(firestoreDb, "Users");
    const [users, uloading, uerror, snapshot] = useCollectionData(usersCol);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);

        if (users?.find((e) => e.name === data.name)) {
            let alert = "Username is already exists.";
            setError(alert);
            console.log(alert);
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
                            setError("Error uploading Image (unauthorized)");
                            break;
                        case "storage/canceled":
                            setError("Error uploading Image (canceled)");
                            break;
                        case "storage/unknown":
                            setError("Error uploading Image (unknown)");
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

            setLoading(false);
            setSuccess(true);

            // ===============================================================================
        } catch (e) {
            console.log(e.message);
            if (e.message === "Firebase: Error (auth/email-already-in-use).") {
                setError("Email is already exists.");
                setLoading(false);
            }

            if (e.message === "Firebase: Error (auth/invalid-email).") {
                setError("Email is Invalid.");
                setLoading(false);
            }
            if (
                e.message ===
                "Firebase: Password should be at least 6 characters (auth/weak-password)."
            ) {
                setError("Password should be at least 6 characters.");
                setLoading(false);
            }
        }
    };
    return (
        <CustomForm
            label={"Register"}
            onSubmit={onSubmit}
            inputs={["name", "email", "password", "image"]}
            success={success}
            loading={loading}
            error={error}
        />
    );
}
