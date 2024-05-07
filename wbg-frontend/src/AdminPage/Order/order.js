import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { setLoadding } from "../../Redux/appSlice";
import { Alert } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import BarChart from "./graph";
import RenderBarChart from "./graph2";
const styleCancel =
    "px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-red-100 border-red-200 text-red-500";
const styleSuccess =
    "px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-green-100 border-green-200 text-green-500";
const stylePending =
    "px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-yellow-100 border-yellow-200 text-yellow-500";
const styleShipping =
    "px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-purple-100 border-purple-200 text-purple-500";
const action_active =
    "px-3 py-[13px] rounded-md cursor-pointer bg-slate-500 text-gray-50 w-7 flex justify-center items-center";
const action_hover =
    "px-3 py-[13px] bg-opacity-40 rounded-md cursor-pointer hover:bg-slate-500 hover:text-gray-50 bg-slate-200 w-7 flex justify-center items-center";
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};
const styleQuery =
    "flex flex-row items-center text-gray-400 px-1 text-[15px] py-[6px] hover:text-blue-500 cursor-pointer";
const styleQuery_active =
    "flex flex-row items-center bg-blue-500 text-white rounded-md font-medium px-3 py-[6px] transition-all ease-linear duration-200";
const Order = () => {
    const addCommans = (str) => {
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const [dropAction, setDropAction] = useState(-1);
    const dispatch = useDispatch();
    Modal.setAppElement("#root");

    const [orderList, setOrderList] = useState([]);
    const [updateOrderList, setUpdateOrderList] = useState(0);
    useEffect(() => {
        function isInCurrentMonth(dateString) {
            const dateParts = dateString.split("/");
            const day = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10);
            const year = parseInt(dateParts[2], 10);

            const currentDate = new Date(); // Ngày hiện tại
            const currentMonth = currentDate.getMonth() + 1; // Lấy tháng hiện tại (giá trị từ 0-11, nên cộng thêm 1)
            const currentYear = currentDate.getFullYear(); // Lấy năm hiện tại

            return (
                day <= new Date(year, month, 0).getDate() &&
                month === currentMonth &&
                year === currentYear
            );
        }
        const getOrderList = async () => {
            dispatch(setLoadding(true));
            let response = await axios.post("http://localhost:8088/api/get-order", {
                type: "get-all",
            });
            if (response.data.EC === "0") {
                let dt = [];
                let newOd = 0;
                let pendingOd = 0;
                let shippingOd = 0;
                let successOd = 0;
                let cancelOd = 0;
                for (const order of response.data.DT) {
                    let status = "";
                    if (order.status === "Đã hủy") {
                        status = [order.status, styleCancel];
                        cancelOd++;
                    } else if (order.status === "Thành công") {
                        status = [order.status, styleSuccess];
                        successOd++;
                    } else if (order.status === "Đợi thanh toán") {
                        status = [order.status, stylePending];
                        pendingOd++;
                    } else if (order.status === "Đang giao hàng") {
                        status = [order.status, styleShipping];
                        shippingOd++;
                    }
                    if (isInCurrentMonth(order.dateOrder)) {
                        newOd++;
                    }
                    dt.push({
                        orderID: order.id,
                        date: order.dateOrder,
                        customerName: order.name,
                        deliveryMethod: order.delivery,
                        paymentMethod: order.paymentMethod,
                        total: order.total,
                        status: status,
                    });
                }
                setTotalOrders(dt.length);
                setNewOrders(newOd);
                setShippingOrders(shippingOd);
                setSuccessOrders(successOd);
                setCancelOrders(cancelOd);
                setNewOrders(newOd);
                setOrderList(dt);
                setOrderList2(dt);
            } else {
                alert(response.data.EM);
            }
            dispatch(setLoadding(false));
        };
        getOrderList();
    }, [updateOrderList]);

    const [modalEdit, setModalEdit] = useState(false);
    const [infoEdit, setInfoEdit] = useState({});
    // const [indexEdit, setIndexEdit] = useState(-1);
    const openModalEdit = (index) => {
        dispatch(setLoadding(true));
        setModalEdit(true);
        setInfoEdit(orderList[index]);
        dispatch(setLoadding(false));
    };

    const closeModalEdit = () => {
        setInfoEdit({});
        setModalEdit(false);
    };
    const handleChangeStatus = async () => {
        dispatch(setLoadding(true));
        let response = await axios.post("http://localhost:8088/api/update-order", {
            type: "update-one",
            data: {
                orderID: infoEdit.orderID,
                status: infoEdit.status[0],
            },
        });
        if (response.data.EC === "0") {
            toast.success("Cập nhật trạng thái thành công");
            setUpdateOrderList((prev) => prev + 1);
        } else {
            alert(response.data.EM);
        }
        dispatch(setLoadding(false));
        closeModalEdit();
    };

    const [activeQuery, setActiveQuery] = useState(0);

    const [orderList2, setOrderList2] = useState([]);

    const handleQuery = (type) => {
        if (type === 0) {
            setOrderList2(orderList);
        } else if (type === 1) {
            setOrderList2(orderList.filter((order) => order.status[0] === "Đợi thanh toán"));
        } else if (type === 2) {
            setOrderList2(orderList.filter((order) => order.status[0] === "Thành công"));
        } else if (type === 3) {
            setOrderList2(orderList.filter((order) => order.status[0] === "Đang giao hàng"));
        } else if (type === 4) {
            setOrderList2(orderList.filter((order) => order.status[0] === "Đã hủy"));
        }
        setActiveQuery(type);
    };

    const [totalOrders, setTotalOrders] = useState(0);
    const [newOrders, setNewOrders] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [shippingOrders, setShippingOrders] = useState(0);
    const [successOrders, setSuccessOrders] = useState(0);
    const [cancelOrders, setCancelOrders] = useState(0);

    return (
        <>
            {modalEdit && (
                <Modal style={customStyles} isOpen={modalEdit} onRequestClose={closeModalEdit}>
                    <div className="pb-4 text-lg font-semibold text-slate-700 flex flex-row items-center justify-between">
                        <span>Chỉnh sửa trạng thái</span>
                        <div
                            className="text-gray-500 text-sm hover:text-red-500 cursor-pointer"
                            onClick={closeModalEdit}
                        >
                            <i className="fa-solid fa-x"></i>
                        </div>
                    </div>
                    <div className="border-t border-gray-300 py-2"></div>
                    <div className="w-[500px] grid grid-cols-2 gap-5 text-gray-500 font-normal">
                        <div className="col-span-2">
                            <label className="inline-block mb-2 text-base">Order ID</label>
                            <input
                                type="text"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                disabled
                                value={infoEdit.orderID}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="inline-block mb-2 text-base">Ngày đặt hàng</label>
                            <input
                                type="text"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                disabled
                                value={infoEdit.date}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="inline-block mb-2 text-base">Tên khách hàng</label>
                            <input
                                type="text"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                disabled
                                value={infoEdit.customerName}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="inline-block mb-2 text-base">
                                Phương thức vận chuyển
                            </label>
                            <input
                                type="text"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                disabled
                                value={
                                    infoEdit.deliveryMethod === "ship"
                                        ? "Giao hàng"
                                        : "Tại cửa hàng"
                                }
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="inline-block mb-2 text-base">
                                Phương thức thanh toán
                            </label>
                            <input
                                type="text"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                disabled
                                value={infoEdit.paymentMethod}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="inline-block mb-2 text-base">Tổng tiền</label>
                            <input
                                type="text"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                disabled
                                value={infoEdit.total}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="inline-block mb-2 text-base">Trạng thái</label>
                            <select
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                               placeholder:text-slate-400 text-lg"
                                value={infoEdit.status[0]}
                                onChange={(e) =>
                                    setInfoEdit((prev) => {
                                        let styleStatus = "";
                                        if (e.target.value === "Đã hủy") {
                                            styleStatus = styleCancel;
                                        } else if (e.target.value === "Thành công") {
                                            styleStatus = styleSuccess;
                                        } else if (e.target.value === "Đợi thanh toán") {
                                            styleStatus = stylePending;
                                        } else if (e.target.value === "Đang giao hàng") {
                                            styleStatus = styleShipping;
                                        }
                                        return {
                                            ...prev,
                                            status: [e.target.value, styleStatus],
                                        };
                                    })
                                }
                            >
                                <option value={"Đã hủy"}>Đã hủy</option>
                                <option value={"Thành công"}>Thành công</option>
                                <option value={"Đợi thanh toán"}>Đợi thanh toán</option>
                                <option value={"Đang giao hàng"}>Đang giao hàng</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="flex flex-row justify-end gap-3">
                            <button onClick={closeModalEdit}>
                                <span className="text-red-500 px-3 py-2 hover:bg-red-100 hover:rounded-md transition-all ease-linear duration-200">
                                    Hủy
                                </span>
                            </button>
                            <button onClick={() => handleChangeStatus()}>
                                <span className="text-white bg-blue-500 px-3 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-all ease-linear duration-200">
                                    Lưu
                                </span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="ml-3 h-[100vh]">
                <div class="grow py-5">
                    <h5 class="text-16 font-semibold">Order lists</h5>
                </div>
                <div className="grid grid-cols-12 gap-x-8">
                    <div className="card col-span-2 row-span-1">
                        <div className="mb-5 rounded-md border-transparent border-[0px] bg-white shadow-md">
                            <div className="flex items-center gap-3 p-4">
                                <div className="flex items-center justify-center rounded-md size-12 text-[15px] bg-[#eff6ff] text-[#3b82f6] shrink-0">
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
                                        data-lucide="boxes"
                                        className="lucide lucide-boxes"
                                    >
                                        <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path>
                                        <path d="m7 16.5-4.74-2.85"></path>
                                        <path d="m7 16.5 5-3"></path>
                                        <path d="M7 16.5v5.17"></path>
                                        <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path>
                                        <path d="m17 16.5-5-3"></path>
                                        <path d="m17 16.5 4.74-2.85"></path>
                                        <path d="M17 16.5v5.17"></path>
                                        <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"></path>
                                        <path d="M12 8 7.26 5.15"></path>
                                        <path d="m12 8 4.74-2.85"></path>
                                        <path d="M12 13.5V8"></path>
                                    </svg>
                                </div>
                                <div className="grow">
                                    <h5 className="mb-1 text-base">{totalOrders}</h5>
                                    <p className="text-slate-500 text-sm">Tổng đơn hàng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card col-span-2 row-span-1">
                        <div className="mb-5 rounded-md border-transparent border-[0px] bg-white shadow-md">
                            <div className="flex items-center gap-3 p-4">
                                <div className="flex items-center justify-center rounded-md size-12 text-[15px] bg-[#f0f9ff] text-sky-500 shrink-0">
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
                                        data-lucide="package-plus"
                                        class="lucide lucide-package-plus"
                                    >
                                        <path d="M16 16h6"></path>
                                        <path d="M19 13v6"></path>
                                        <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                                        <path d="m7.5 4.27 9 5.15"></path>
                                        <polyline points="3.29 7 12 12 20.71 7"></polyline>
                                        <line x1="12" x2="12" y1="22" y2="12"></line>
                                    </svg>
                                </div>
                                <div className="grow">
                                    <h5 className="mb-1 text-base">{newOrders}</h5>
                                    <p className="text-slate-500 text-sm">Đơn hàng mới</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-8 row-span-3 mb-5 rounded-md border-transparent border-[0px] mr-4 bg-white shadow-md order-none">
                        <div className="p-5">
                            <h6 className="mb-4 text-gray-800 text-15 dark:text-zink-50">
                                Orders Overview
                            </h6>
                            <div className="flex flex-row justify-center items-center">
                                <div className="w-full">
                                    <RenderBarChart />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card col-span-2 row-span-1">
                        <div className="mb-5 rounded-md border-transparent border-[0px] bg-white shadow-md">
                            <div className="flex items-center gap-3 p-4">
                                <div className="flex items-center justify-center rounded-md size-12 text-[15px] bg-[#fefce8] text-yellow-500 shrink-0">
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
                                        data-lucide="loader"
                                        class="lucide lucide-loader"
                                    >
                                        <line x1="12" x2="12" y1="2" y2="6"></line>
                                        <line x1="12" x2="12" y1="18" y2="22"></line>
                                        <line x1="4.93" x2="7.76" y1="4.93" y2="7.76"></line>
                                        <line x1="16.24" x2="19.07" y1="16.24" y2="19.07"></line>
                                        <line x1="2" x2="6" y1="12" y2="12"></line>
                                        <line x1="18" x2="22" y1="12" y2="12"></line>
                                        <line x1="4.93" x2="7.76" y1="19.07" y2="16.24"></line>
                                        <line x1="16.24" x2="19.07" y1="7.76" y2="4.93"></line>
                                    </svg>
                                </div>
                                <div className="grow">
                                    <h5 className="mb-1 text-base">{pendingOrders}</h5>
                                    <p className="text-slate-500 text-sm">Đợi thanh toán</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card col-span-2 row-span-1">
                        <div className="mb-5 rounded-md border-transparent border-[0px] bg-white shadow-md">
                            <div className="flex items-center gap-3 p-4">
                                <div className="flex items-center justify-center rounded-md size-12 text-[15px] bg-purple-50 text-purple-500 shrink-0">
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
                                <div className="grow">
                                    <h5 className="mb-1 text-base">{shippingOrders}</h5>
                                    <p className="text-slate-500 text-sm">Đang giao hàng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card col-span-2 row-span-1">
                        <div className="mb-5 rounded-md border-transparent border-[0px] bg-white shadow-md">
                            <div className="flex items-center gap-3 p-4">
                                <div className="flex items-center justify-center rounded-md size-12 text-[15px] bg-green-50 text-green-500 shrink-0">
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
                                        data-lucide="package-check"
                                        class="lucide lucide-package-check"
                                    >
                                        <path d="m16 16 2 2 4-4"></path>
                                        <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                                        <path d="m7.5 4.27 9 5.15"></path>
                                        <polyline points="3.29 7 12 12 20.71 7"></polyline>
                                        <line x1="12" x2="12" y1="22" y2="12"></line>
                                    </svg>
                                </div>
                                <div className="grow">
                                    <h5 className="mb-1 text-base">{successOrders}</h5>
                                    <p className="text-slate-500 text-sm">Thành công</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card col-span-2 row-span-1">
                        <div className="mb-5 rounded-md border-transparent border-[0px] bg-white shadow-md">
                            <div className="flex items-center gap-3 p-4">
                                <div className="flex items-center justify-center rounded-md size-12 text-[15px] bg-red-50 text-red-500 shrink-0">
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
                                <div className="grow">
                                    <h5 className="mb-1 text-base">{cancelOrders}</h5>
                                    <p className="text-slate-500 text-sm">Đã hủy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white mr-3 rounded-lg">
                    <div className="px-4 pt-5">
                        <ul className="flex flex-row gap-5 text-base">
                            <li
                                className={activeQuery === 0 ? styleQuery_active : styleQuery}
                                onClick={() => {
                                    if (activeQuery !== 0) handleQuery(0);
                                }}
                            >
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
                                    data-lucide="boxes"
                                    class="w-[18px] h-[18px] inline-block size-4 ltr:mr-1 rtl:ml-1"
                                >
                                    <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path>
                                    <path d="m7 16.5-4.74-2.85"></path>
                                    <path d="m7 16.5 5-3"></path>
                                    <path d="M7 16.5v5.17"></path>
                                    <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path>
                                    <path d="m17 16.5-5-3"></path>
                                    <path d="m17 16.5 4.74-2.85"></path>
                                    <path d="M17 16.5v5.17"></path>
                                    <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"></path>
                                    <path d="M12 8 7.26 5.15"></path>
                                    <path d="m12 8 4.74-2.85"></path>
                                    <path d="M12 13.5V8"></path>
                                </svg>
                                <span className="px-2">Tất cả</span>
                            </li>
                            <li
                                className={activeQuery === 1 ? styleQuery_active : styleQuery}
                                onClick={() => {
                                    if (activeQuery !== 1) handleQuery(1);
                                }}
                            >
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
                                    data-lucide="loader"
                                    className="w-[18px] h-[18px] inline-block size-4 ltr:mr-1 rtl:ml-1"
                                >
                                    <line x1="12" x2="12" y1="2" y2="6"></line>
                                    <line x1="12" x2="12" y1="18" y2="22"></line>
                                    <line x1="4.93" x2="7.76" y1="4.93" y2="7.76"></line>
                                    <line x1="16.24" x2="19.07" y1="16.24" y2="19.07"></line>
                                    <line x1="2" x2="6" y1="12" y2="12"></line>
                                    <line x1="18" x2="22" y1="12" y2="12"></line>
                                    <line x1="4.93" x2="7.76" y1="19.07" y2="16.24"></line>
                                    <line x1="16.24" x2="19.07" y1="7.76" y2="4.93"></line>
                                </svg>
                                <span className="px-2">Đợi thanh toán</span>
                            </li>
                            <li
                                className={activeQuery === 2 ? styleQuery_active : styleQuery}
                                onClick={() => {
                                    if (activeQuery !== 2) handleQuery(2);
                                }}
                            >
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
                                    data-lucide="package-check"
                                    class="w-[18px] h-[18px] inline-block size-4 ltr:mr-1 rtl:ml-1"
                                >
                                    <path d="m16 16 2 2 4-4"></path>
                                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                                    <path d="m7.5 4.27 9 5.15"></path>
                                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                                    <line x1="12" x2="12" y1="22" y2="12"></line>
                                </svg>
                                <span className="px-2">Thành công</span>
                            </li>
                            <li
                                className={activeQuery === 3 ? styleQuery_active : styleQuery}
                                onClick={() => {
                                    if (activeQuery !== 3) handleQuery(3);
                                }}
                            >
                                <i class="fa-solid fa-truck-fast"></i>
                                <span className="px-2">Đang giao hàng</span>
                            </li>
                            <li
                                className={activeQuery === 4 ? styleQuery_active : styleQuery}
                                onClick={() => {
                                    if (activeQuery !== 4) handleQuery(4);
                                }}
                            >
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
                                    className="inline-block size-4 ltr:mr-1 rtl:ml-1 w-[18px] h-[18px]"
                                >
                                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                                    <path d="m7.5 4.27 9 5.15"></path>
                                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                                    <line x1="12" x2="12" y1="22" y2="12"></line>
                                    <path d="m17 13 5 5m-5 0 5-5"></path>
                                </svg>
                                <span className="px-2">Đã hủy</span>
                            </li>
                        </ul>
                    </div>
                    <div className="relative overflow-x-auto px-4 py-5">
                        <table class="w-full text-sm text-left rtl:text-right text dark:text-gray-400">
                            <thead class="text-xs text-gray-600 uppercase bg-gray-100 rounded-sm">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Order ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ngày đặt hàng
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tên khách hàng
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phương thức vận chuyển
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phương thức thanh toán
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tổng tiền
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Trạng thái
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList2.map((order, index) => {
                                    return (
                                        <tr className="bg-white border-b">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap dark:text-white"
                                            >
                                                #{order.orderID}
                                            </th>
                                            <td className="px-6 py-4">{order.date}</td>
                                            <td className="px-6 py-4">{order.customerName}</td>
                                            <td className="px-6 py-4">
                                                {order.deliveryMethod === "ship"
                                                    ? "Giao hàng"
                                                    : "Tại cửa hàng"}
                                            </td>
                                            <td className="px-6 py-4">{order.paymentMethod}</td>
                                            <td className="px-6 py-4">
                                                {addCommans(order.total)}₫
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={order.status[1]}>
                                                    {order.status[0]}
                                                </span>
                                            </td>
                                            <td className="pl-6 w-40 py-2 ">
                                                <div className="relative">
                                                    <button
                                                        onClick={() =>
                                                            setDropAction((prev) => {
                                                                if (prev === index) return -1;
                                                                else return index;
                                                            })
                                                        }
                                                        className={
                                                            dropAction === index
                                                                ? action_active
                                                                : action_hover
                                                        }
                                                    >
                                                        <i className="fa-solid fa-ellipsis fa-sm"></i>
                                                    </button>
                                                    {dropAction === index && (
                                                        <div className="absolute top-0 translate-y-[26px] w-min-[300px] z-50 bg-white rounded-md">
                                                            <ul className="border rounded-md shadow-md">
                                                                <li className="flex flex-row gap-3 items-center px-2 py-2 hover:bg-gray-200 cursor-pointer">
                                                                    <i class="fa-regular fa-eye fa-sm"></i>
                                                                    <span>Xem chi tiết</span>
                                                                </li>
                                                                <li
                                                                    className="flex flex-row gap-3 items-center px-2 py-2 hover:bg-gray-200 cursor-pointer"
                                                                    onClick={() => {
                                                                        setDropAction(-1);
                                                                        openModalEdit(index);
                                                                    }}
                                                                >
                                                                    <i class="fa-regular fa-pen-to-square fa-sm"></i>
                                                                    <span>Chỉnh sửa</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Order;
