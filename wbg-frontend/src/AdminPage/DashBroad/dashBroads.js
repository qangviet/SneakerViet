import React, { useState } from "react";
import RenderLineChart from "./graph";
import { useDispatch } from "react-redux";
import { setContentPage } from "../../Redux/adminSlice";

const DashBroads = () => {
    const dispatch = useDispatch();
    const data = {
        totalRevenue: 25560000,
        totalOrder: 1000,
        successed: 900,
        cancel: 100,
        pending: 10,
    };
    const [yearChart, setYearChart] = useState(2023);
    const handlePending = () => {
        dispatch(setContentPage("order"));
    };
    const handleViewProduct = () => {
        dispatch(setContentPage("view-product"));
    };
    return (
        <div>
            <div className="ml-3 h-[95vh]">
                <div class="py-5">
                    <h5 class="text-16 font-semibold">Dashbroads</h5>
                </div>
                <div className="grid grid-cols-12 gap-x-5">
                    <div class="col-span-2 card">
                        <div class="text-center p-5">
                            <div class="flex items-center justify-center mx-auto rounded-full size-14 bg-blue-100 text-blue-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    data-lucide="wallet-2"
                                    class="lucide lucide-wallet-2"
                                >
                                    <path d="M17 14h.01"></path>
                                    <path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"></path>
                                </svg>
                            </div>
                            <h5 class="mt-4 mb-2">
                                <span class="font-semibold">
                                    {data.totalRevenue.toLocaleString()}₫
                                </span>
                            </h5>
                            <p class="text-slate-500">Tổng doanh thu</p>
                        </div>
                    </div>
                    <div class="col-span-2 card">
                        <div class="text-center p-5">
                            <div class="flex items-center justify-center mx-auto rounded-full size-14 bg-purple-100 text-purple-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    data-lucide="package"
                                    class="lucide lucide-package"
                                >
                                    <path d="m7.5 4.27 9 5.15"></path>
                                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                                    <path d="m3.3 7 8.7 5 8.7-5"></path>
                                    <path d="M12 22V12"></path>
                                </svg>
                            </div>
                            <h5 class="mt-4 mb-2">
                                <span class="font-semibold">
                                    {data.totalOrder.toLocaleString()}
                                </span>
                            </h5>
                            <p class="text-slate-500">Tổng đơn hàng</p>
                        </div>
                    </div>
                    <div class="col-span-2 card">
                        <div class="text-center p-5">
                            <div class="flex items-center justify-center mx-auto rounded-full size-14 bg-green-100 text-green-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    data-lucide="truck"
                                    class="lucide lucide-truck"
                                >
                                    <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"></path>
                                    <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"></path>
                                    <circle cx="7" cy="18" r="2"></circle>
                                    <path d="M15 18H9"></path>
                                    <circle cx="17" cy="18" r="2"></circle>
                                </svg>
                            </div>
                            <h5 class="mt-4 mb-2">
                                <span class="font-semibold">{data.successed.toLocaleString()}</span>
                            </h5>
                            <p class="text-slate-500">Đơn hàng thành công</p>
                        </div>
                    </div>
                    <div class="col-span-2 card">
                        <div class="text-center p-5">
                            <div class="flex items-center justify-center mx-auto rounded-full size-14 bg-red-100 text-red-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    data-lucide="package-x"
                                    class="lucide lucide-package-x"
                                >
                                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                                    <path d="m7.5 4.27 9 5.15"></path>
                                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                                    <line x1="12" x2="12" y1="22" y2="12"></line>
                                    <path d="m17 13 5 5m-5 0 5-5"></path>
                                </svg>
                            </div>
                            <h5 class="mt-4 mb-2">
                                <span class="font-semibold">{data.cancel.toLocaleString()}</span>
                            </h5>
                            <p class="text-slate-500">Đơn hàng đã hủy</p>
                        </div>
                    </div>
                    <div className="col-span-4 card">
                        <div className="flex justify-center items-center text-xl my-5">
                            <div className="text-yellow-500 px-2 py-2">
                                <i class="fa-solid fa-circle-exclamation"></i>
                            </div>
                            <span>Có</span>
                            <span className="text-yellow-500 px-2 text-2xl">{`${data.pending}`}</span>
                            <span>đơn hàng đang chờ xử lý</span>
                        </div>
                        <div className="flex justify-center items-center">
                            <div
                                onClick={() => handlePending()}
                                className="text-xl text-white cursor-pointer bg-blue-500 rounded-md hover:bg-blue-700 transition-all ease-in duration-300   flex justify-center items-center px-5 py-2 gap-3"
                            >
                                <span>Xem chi tiết</span>
                                <div className="text-white">
                                    <i class="fa-solid fa-arrow-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 card">
                        <div className="flex flex-row justify-between items-center">
                            <div className="font-medium px-5 py-2">
                                <h5>Tổng quan doanh thu</h5>
                            </div>
                            <div className="w-[200px] mx-10 py-2 relative">
                                <label for="underline_select" class="sr-only">
                                    Underline select
                                </label>
                                <select
                                    id="underline_select"
                                    onChange={(e) => setYearChart(e.target.value)}
                                    value={yearChart}
                                    class="block py-2.5 px-2 w-full text-base text-gray-500 bg-gray-50 border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 cursor-pointer"
                                >
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                </select>
                                <div className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500">
                                    <i class="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                        <div className="px-10 py-5 flex justify-center items-center">
                            <RenderLineChart year={yearChart} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBroads;
