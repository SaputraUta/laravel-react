import { useEffect, useState, useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    const [isRendered, setIsRendered] = useState(false);
    useEffect(() => {
        setIsRendered(true);
    }, []);
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setErrors(null);
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                emailRef.current.value = "";
                passwordRef.current.value = "";
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
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
                    Login into your account
                </h1>
                <div className="flex flex-col w-3/4">
                    <label htmlFor="email" className="text-lg font-medium">
                        Email
                    </label>
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        required
                        className="p-2 rounded-md"
                        placeholder="example@gmail.com"
                    />
                    {errors && errors.email && (
                        <p className="text-red-500">{errors.email[0]}</p>
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
                        required
                        className="p-2 rounded-md"
                        placeholder="Enter your password"
                    />
                    {errors && errors.password && (
                        <p className="text-red-500">{errors.password[0]}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-3/4 py-2 bg-slate-700 text-slate-100 font-bold text-lg mt-5 rounded-md hover:bg-slate-800 hover:text-slate-200"
                >
                    Login
                </button>
                <p className="mt-5">
                    Don't have any account?{" "}
                    <Link to="/signup" className="underline">
                        register here
                    </Link>
                </p>
            </form>
        </div>
    );
}
