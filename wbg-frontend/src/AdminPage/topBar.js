import React from "react";
import { useNavigate } from "react-router-dom";
import profile from "./profile.png";
const Topbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
        window.location.reload();
    };
    return (
        <div className="flex flex-row bg-white justify-between items-center py-2 shadow-sm">
            <div></div>
            <div className="h-[50px] w-[50px]">
                <img src={profile} alt="Avatar" className="w-full h-full" />
            </div>
            <div className="text-blue-400 underline px-5 cursor-pointer" onClick={handleLogout}>
                Đăng xuất
            </div>
        </div>
    );
};
export default Topbar;
