import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, db, facebookProvider, googleProvider } from "../firebase";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import facebook from "../assets/facebook-icon.png";
import google from "../assets/google.png";

const Form = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignu, setIsSigUp] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isSignu) {
        const userCreadential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCreadential.user;

        console.log(user);
        toast.success("user login successefully!!");
        navigate("/dash");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
        console.log("run at this line ");
        if (user) {
          await setDoc(doc(db, "user", user.uid), {
            email,
            name,
          });
          toast.success("user sign up successfully");
          setIsSigUp(true);
        }
      }
      setEmail("");
      setName("");
      setPassword("");
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      toast.success("user login successefully!!");
      navigate("/dash");
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  const loginFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log(result);
      toast.success("user login successefully!!");
      navigate("/dash");
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-xl rounded-xl p-10">
        <p className="text-[#FF6C37] font-bold text-2xl text-center">
          {isSignu ? "Log In" : "Sign Up"}
        </p>
        <form
          className="mt-5 flex flex-col gap-2"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          {!isSignu && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="userName"
              className="border-b-2 border-[#FF6C37] text-sm px-3 py-2 outline-none"
            />
          )}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="border-b-2 border-[#FF6C37] text-sm px-3 py-2 outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="border-b-2 border-[#FF6C37] text-sm px-3 py-2 outline-none "
          />
          <button
            type="submit"
            className="mt-3 border border-[#FF6C37] py-1 font-semibold text-sm rounded-lg bg-[#FF9100] cursor-pointer text-white"
          >
            {isSignu ? "Log In" : "Sign Up"}
          </button>
          <div className="mt-1">
            {isSignu ? (
              <p className="text-gray-500 text-sm">
                Create an new account ?
                <span
                  className="text-[#FF6C37] font-semibold cursor-pointer"
                  onClick={() => setIsSigUp(false)}
                >
                  Sign up
                </span>
              </p>
            ) : (
              <p className="text-gray-500 text-sm">
                Already have an account?
                <span
                  className="text-[#FF6C37] font-semibold cursor-pointer"
                  onClick={() => setIsSigUp(true)}
                >
                  {" "}
                  Log in
                </span>
              </p>
            )}
          </div>
        </form>
        <div
          className={`flex flex-col gap-2 items-center mt-2 ${
            isSignu ? "block" : "hidden"
          }`}
        >
          <button
            className="flex gap-5 w-[227px] px-3 border border-[#FF6C37] py-1 font-semibold text-sm rounded-lgcursor-pointer text-white cursor-pointer items-center rounded-lg"
            onClick={loginGoogle}
          >
            {" "}
            <div>
              <img
                src={google}
                alt="facebook-image"
                className="w-[30px] h-[30px]"
              />
            </div>
            <span className="text-black opacity-[65%] font-semibold">
              Continue with google
            </span>
          </button>
          <button
            type="button"
            className="flex gap-5 px-3 border border-[#FF6C37] py-1 font-semibold text-sm rounded-lgcursor-pointer text-white w-fit cursor-pointer items-center rounded-lg "
            onClick={loginFacebook}
          >
            {" "}
            <div>
              <img
                src={facebook}
                alt="facebook-image"
                className="w-[30px] h-[30px]"
              />
            </div>
            <span className="text-black opacity-[65%] font-semibold">
              Continue with facebook
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
