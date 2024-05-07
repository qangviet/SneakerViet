import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setContentPage } from "../Redux/adminPageSlice";
const sb_item_hover =
    "py-3 px-2 my-3 hover:fill-blue-500 hover:bg-blue-500 hover:bg-opacity-5 hover:rounded-xl hover:text-[#578fff] cursor-pointer";
const sb_item_active =
    " py-3 px-2 my-3 bg-blue-500 fill-blue-500 bg-opacity-5 rounded-xl text-blue-600 cursor-pointer";
const sub_item = "pb-3 hover:text-blue-400 hover:cursor-pointer";
const active_sub_item = "pb-3 text-blue-400 cursor-pointer";
const SideBar = ({ content, setContent }) => {
    const [activeContent, setActiveContent] = useState("");
    const dispatch = useDispatch();
    const contentPage = useSelector((state) => state.admin.contentPage);

    return (
        <div className=" bg-white py-4">
            <h2 className="font-bold text-3xl px-4 mt-2 mb-4">Admin</h2>
            <div className="text-gray-400 px-3 text-[12px] text-left">MENU</div>
            <div className="navbar px-4 text-gray-500 text-opacity-70 text-sm font-semibold">
                <div
                    className={sb_item_hover}
                    onClick={() => {
                        if (activeContent === "1") setActiveContent("-1");
                        else setActiveContent("1");
                    }}
                >
                    <div className="flex flex-row items-center justify-between">
                        <span>Dashbroads</span>
                        <div className="w-7 h-7 flex justify-center items-center">
                            {activeContent === "1" ? (
                                <i class="fa-solid fa-chevron-down"></i>
                            ) : (
                                <i class="fa-solid fa-chevron-right"></i>
                            )}
                        </div>
                    </div>
                </div>
                {activeContent === "1" && (
                    <div className="ml-9">
                        <ul className="list-disc">
                            <li className="pb-3 hover:text-blue-400 hover:cursor-pointer">
                                <span>View User</span>
                            </li>
                            <li className="pb-3 hover:text-blue-400 hover:cursor-pointer">
                                <span>Analytics</span>
                            </li>
                        </ul>
                    </div>
                )}
                <div
                    className={sb_item_hover}
                    onClick={() => {
                        if (activeContent === "2") setActiveContent("-1");
                        else setActiveContent("2");
                    }}
                >
                    <div className="flex flex-row items-center justify-between">
                        <span>Brand</span>
                        <div className="w-7 h-7 flex justify-center items-center">
                            {activeContent === "2" ? (
                                <i class="fa-solid fa-chevron-down"></i>
                            ) : (
                                <i class="fa-solid fa-chevron-right"></i>
                            )}
                        </div>
                    </div>
                </div>
                {activeContent === "2" && (
                    <div className="ml-9">
                        <ul className="list-disc">
                            <li className="pb-3 hover:text-blue-400 hover:cursor-pointer">
                                <span>View Brand</span>
                            </li>
                            <li className="pb-3 hover:text-blue-400 hover:cursor-pointer">
                                <span>Create Brand</span>
                            </li>
                        </ul>
                    </div>
                )}
                <div
                    className={sb_item_hover}
                    onClick={() => {
                        if (activeContent === "3") setActiveContent("-1");
                        else setActiveContent("3");
                    }}
                >
                    <div className="flex flex-row items-center justify-between">
                        <span>Category</span>
                        <div className="w-7 h-7 flex justify-center items-center">
                            {activeContent === "3" ? (
                                <i class="fa-solid fa-chevron-down"></i>
                            ) : (
                                <i class="fa-solid fa-chevron-right"></i>
                            )}
                        </div>
                    </div>
                </div>
                {activeContent === "3" && (
                    <div className="ml-9">
                        <ul className="list-disc" contentPages>
                            <li className="pb-3 hover:text-blue-400 hover:cursor-pointer">
                                <span>View Category</span>
                            </li>
                            <li className="pb-3 hover:text-blue-400 hover:cursor-pointer">
                                <span>Create Category</span>
                            </li>
                        </ul>
                    </div>
                )}
                <div
                    className={activeContent === "4" ? sb_item_active : sb_item_hover}
                    onClick={() => {
                        if (activeContent === "4") setActiveContent("-1");
                        else setActiveContent("4");
                    }}
                >
                    <div className="flex flex-row items-center justify-between">
                        <span>Product</span>
                        <div className="w-7 h-7 flex justify-center items-center">
                            {activeContent === "4" ? (
                                <i class="fa-solid fa-chevron-down"></i>
                            ) : (
                                <i class="fa-solid fa-chevron-right"></i>
                            )}
                        </div>
                    </div>
                </div>
                {activeContent === "4" && (
                    <div className="ml-9">
                        <ul className="list-disc">
                            <li
                                className={content === "view-product" ? active_sub_item : sub_item}
                                onClick={() => setContent("view-product")}
                            >
                                <span>View</span>
                            </li>
                            <li
                                className={
                                    content === "add-new-product" ? active_sub_item : sub_item
                                }
                                onClick={() => setContent("add-new-product")}
                            >
                                <span>Add New</span>
                            </li>
                        </ul>
                    </div>
                )}
                <div
                    className={activeContent === "5" ? sb_item_active : sb_item_hover}
                    onClick={() => {
                        // if (activeContent === "5") setActiveContent("-1");
                        // else
                        setActiveContent("5");
                        setContent("order");
                    }}
                >
                    <div className="flex flex-row items-center justify-between">
                        <span>Order</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SideBar;
