import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
export default function SignUp() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [isRendered, setIsRendered] = useState(false);
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        setIsRendered(true);
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        setErrors(null);
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                nameRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";
                passwordConfirmationRef.current.value = "";
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <div
            className={`bg-slate-200 border-2 border-slate-300 rounded-lg p-4 w-1/2 transition-transform duration-500 ${
                isRendered
                    ? "translate-y-0 scale-100"
                    : "-translate-y-56 scale-50"
            }`}
        >
            <form
                onSubmit={onSubmitHandler}
                action=""
                className="flex flex-col gap-2 items-center my-20"
            >
                <h1 className="text-center text-4xl font-bold mb-5">
                    Signup for free
                </h1>
                <div className="flex flex-col w-3/4">
                    <label htmlFor="fullname" className="text-lg font-medium">
                        Fullname
                    </label>
                    <input
                        ref={nameRef}
                        type="text"
                        name="fullname"
                        className="p-2 rounded-md"
                        placeholder="John Doe"
                        required
                    />
                    {errors && errors.name && (
                        <p className="text-red-500">{errors.name[0]}</p>
                    )}
                </div>
                <div className="flex flex-col w-3/4">
                    <label htmlFor="email" className="text-lg font-medium">
                        Email
                    </label>
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        className="p-2 rounded-md"
                        placeholder="example@gmail.com"
                        required
                    />
                    {errors && errors.email && (
                        <p className="text-red-500">{errors["email"][0]}</p>
                    )}
                </div>
                <div className="flex flex-col w-3/4">
                    <label htmlFor="password" className="text-lg font-medium">
                        Password
                    </label>
                    <input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        className="p-2 rounded-md"
                        placeholder="Enter your password"
                        required
                    />
                    {errors && errors.password && (
                        <p className="text-red-500">{errors["password"][0]}</p>
                    )}
                </div>
                <div className="flex flex-col w-3/4">
                    <label className="text-lg font-medium">
                        Password confirmation
                    </label>
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        className="p-2 rounded-md"
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-3/4 py-2 bg-slate-700 text-slate-100 font-bold text-lg mt-5 rounded-md hover:bg-slate-800 hover:text-slate-200"
                >
                    Sign up
                </button>
                <p className="mt-5">
                    Already have an account?{" "}
                    <Link to="/login" className="underline">
                        login here
                    </Link>
                </p>
            </form>
        </div>
    );
}
