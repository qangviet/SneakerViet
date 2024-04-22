import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../HomePage/Header/header";

function ProfilePage() {
    return (
        <>
            <Header />
            <div className="flex flex-col justify-center items-center">
                <h1 className="py-2 mt-2 mb-4 text-4xl">Thông tin cá nhân</h1>
                <div className="py-[1px] mb-10 bg-slate-500 bg-opacity-15 w-full h-0"></div>
                <div className="text-xl w-1/2 flex items-center">
                    <label className="font-semibold basis-1/4  px-3">Họ tên: </label>
                    <span>Trương Viet</span>
                </div>
                <div className="text-xl w-1/2 flex items-center">
                    <label className="font-semibold basis-1/4  px-3">Email: </label>
                    <span>viet@gmail.com</span>
                </div>
                <div className="text-xl w-1/2 flex items-center">
                    <label className="font-semibold basis-1/4 px-3">Số điện thoại: </label>
                    <span>0123456789</span>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
