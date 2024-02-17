import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = async () => {
        try{
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return(
        <div>
        <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)}></input>
        <input placeholder="Password..."  onChange={(e) => setPassword(e.target.value)}></input>
        <button onClick={signIn}>Sign In</button> <br/>

        <button onClick={signInWithGoogle}>SignIn With Google</button><br />
        <button onClick={logOut}>Logout</button>


        </div>
    );
};