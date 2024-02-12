import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";

const GoogleAuth = ({ disabled }) => {
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
  };

  return (
    <button
      disabled={disabled}
      type="button"
      onClick={handleGoogleClick}
      className="flex justify-center bg-white border-orange-600 w-full mt-4 text-orange-600 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
    >
      <FcGoogle size={25} className="mr-6" />
      Continue Whith Google
    </button>
  );
};

export default GoogleAuth;
