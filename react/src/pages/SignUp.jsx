import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
    const [isRendered, setIsRendered] = useState(false);
    useEffect(() => {
        setIsRendered(true);
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
    };
    return (
        <div
            className={`bg-slate-200 border-2 border-slate-300 rounded-lg p-4 w-1/2 transition-transform duration-500 ${
                isRendered ? "translate-y-0 scale-100" : "-translate-y-56 scale-50"
            }`}
        >
            <form
                onSubmit={onSubmitHandler}
                action=""
                className="flex flex-col gap-2 items-center my-20"
            >
                <h1 className="text-center text-2xl font-bold mb-5">
                    Signup for free
                </h1>
                <div className="flex flex-col w-3/4">
                    <label htmlFor="fullname" className="text-lg font-medium">
                        Fullname
                    </label>
                    <input
                        type="text"
                        name="fullname"
                        required
                        className="p-2 rounded-md"
                        placeholder="John Doe"
                    />
                </div>
                <div className="flex flex-col w-3/4">
                    <label htmlFor="email" className="text-lg font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="p-2 rounded-md"
                        placeholder="example@gmail.com"
                    />
                </div>
                <div className="flex flex-col w-3/4">
                    <label htmlFor="password" className="text-lg font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="p-2 rounded-md"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="flex flex-col w-3/4">
                    <label className="text-lg font-medium">
                        Password confirmation
                    </label>
                    <input
                        type="password"
                        required
                        className="p-2 rounded-md"
                        placeholder="Confirm your password"
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
