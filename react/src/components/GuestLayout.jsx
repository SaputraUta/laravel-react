import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
export default function GuestLayout() {
    const {token} = useStateContext();
    if (token) {
        return <Navigate to="/"/>
    }
    return (
        <div className="bg-slate-400 h-screen flex items-center justify-center text-slate-700 placeholder:text-slate-700">
            <Outlet />
        </div>
    );
}
