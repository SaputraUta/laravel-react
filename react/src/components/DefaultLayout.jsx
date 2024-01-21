import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { FaHome, FaUsers } from "react-icons/fa";

export default function DefaultLayout() {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (e) => {
        e.preventDefault();
    };
    return (
        <div className="flex">
            <header className="min-h-screen w-64 bg-slate-700 text-slate-100 font-bold text-xl">
                <div className="flex flex-col">
                    <Link
                        to="/dashboard"
                        className="px-4 py-6 hover:bg-slate-800 hover:text-slate-200 flex gap-1 items-center"
                    >
                        <FaHome size={25} />
                        Dashboard
                    </Link>
                    <Link
                        to="/users"
                        className="px-4 py-6 hover:bg-slate-800  hover:text-slate-200 flex gap-1 items-center"
                    >
                        <FaUsers size={25} />
                        Users
                    </Link>
                </div>
            </header>
            <main className="flex-1">
                <nav className="flex justify-between bg-slate-400 w-full text-slate-100 px-10 py-5 items-center">
                    <h3 className="text-xl font-bold">Welcome {user.name}!</h3>
                    <button
                        onClick={onLogout}
                        className="text-xl font-bold flex gap-1 items-center hover:underline"
                    >
                        <MdLogout size={25} /> Logout
                    </button>
                </nav>
                <div className="mx-10 my-10 text-slate-700">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
