import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../utils/firebase.js";
import { signInSuccess } from "../redux/user/userSlice.js";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      //implement proper error handling.
      console.log("Error signing in with google.", error);
    }
  };
  //Make sure to set the type of button to button. Because this component is used inside the form. So when clicked, it triggers the onSubmit event of the form by default, which we don't want to.
  return (
    <button
      type="button"
      className="p-2 text-white uppercase bg-red-700 rounded-lg hover:opacity-90"
      onClick={handleGoogleSignIn}
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
