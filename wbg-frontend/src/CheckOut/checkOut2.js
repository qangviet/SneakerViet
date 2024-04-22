import React, { useEffect } from "react";
import LoaddingClipLoader from "../Loadding/clipLoader";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { setLoadding } from "../Redux/appSlice";

const CheckOut2 = () => {
    const navigate = useNavigate();
    function addCommas(number) {
        let str = String(number);
        let result = "";
        for (let i = str.length - 1, count = 0; i >= 0; i--, count++) {
            if (count && count % 3 === 0) {
                result = "," + result;
            }
            result = str[i] + result;
        }
        return result;
    }

    const dispatch = useDispatch();
    let odID = useSelector((state) => state.order.orderID);
    const [total, setTotal] = useState(0);
    const products = useSelector((state) => state.cart.products);
    useEffect(() => {
        const totalPrice = () => {
            let total = 0;
            for (const product of products) {
                total += product.price * product.quantity;
            }
            if (orderInfo.method === "ship") total += 30000;
            return total;
        };
        const getOrderInfo = async () => {
            dispatch(setLoadding(true));
            const res = await axios.post("http://localhost:8088/api/get-order", {
                odID: odID,
            });
            if (res.data.EC === "0") {
                let data = res.data.DT;
                setReceiverInfo({
                    name: data.name,
                    phone: data.phone,
                    address: data.address,
                    note: "Ghi chú đơn hàng",
                });
                setTotal(totalPrice());
                setOrderInfo({
                    orderID: odID,
                    date: data.date,
                    method: data.delivery,
                });
            } else {
                alert(res.data.EM);
            }
            dispatch(setLoadding(false));
        };

        if (odID === "") {
            navigate("/");
        } else {
            getOrderInfo();
        }
    }, []);
    const [receiverInfo, setReceiverInfo] = useState({});
    const [orderInfo, setOrderInfo] = useState({});

    const successFully = () => {};

    return (
        <div className="flex justify-center flex-col items-center">
            <div className="flex flex-row w-[1300px] gap-20 mt-5">
                <div className="left-sec basis-[55%]">
                    <div>
                        <div
                            className="font-semibold py-5 text-2xl cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            <span>SNEAKER VIET</span>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="uppercase font-semibold text-white bg-red-600 px-5 py-2">
                            Thông tin chuyển khoản
                        </div>
                        <div className="grid grid-cols-2 bg-gray-200">
                            <div className="col-span-1 border border-gray-300 py-2 px-2">
                                Chủ tài khoản
                            </div>
                            <div className="col-span-1 border-l-0 border-gray-300 py-2 font-semibold px-2">
                                TRUONG QUANG VIET
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="col-span-1 border-r border-l border-gray-300 py-2 px-2">
                                Số tài khoản
                            </div>
                            <div className="col-span-1 border-r border-l-0 border-gray-300 py-2 font-semibold px-2">
                                1023345387
                            </div>
                        </div>
                        <div className="grid grid-cols-2 bg-gray-200">
                            <div className="col-span-1 border border-gray-300 py-2 px-2">
                                Ngân hàng
                            </div>
                            <div className="col-span-1 border border-l-0 border-gray-300 py-2 font-semibold px-2">
                                Vietcombank
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="col-span-1 border-r border-l border-gray-300 py-2 px-2">
                                Số tiền
                            </div>
                            <div className="col-span-1 border-r border-l-0 border-gray-300 py-2 font-semibold px-2">
                                {addCommas(total)}₫
                            </div>
                        </div>
                        <div className="grid grid-cols-2 bg-gray-200">
                            <div className="col-span-1 border border-gray-300 py-2 px-2">
                                Nội dung chuyển khoản
                            </div>
                            <div className="col-span-1 border border-l-0 border-gray-300 py-2 font-semibold px-2">
                                {odID}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-lg font-bold mt-5">
                            <span>Quét mã để thanh toán</span>
                        </div>
                        <div>
                            <div className="w-[400px] h-auto">
                                <img
                                    src={`https://img.vietqr.io/image/vietcombank-1023345387-print.jpg?amount=${total}&addInfo=${odID}&accountName=TRUONG%20QUANG%20VIET`}
                                />
                            </div>
                        </div>
                        <div>
                            <LoaddingClipLoader color="#fc4a44" size="20" />
                        </div>
                        <div className="text-red-500 font-bold text-center mt-5">
                            *Lưu ý: Vui lòng đợi 1-5 phút để hệ thống tự động xác nhận thanh toán.
                            Không làm mới trang hoặc thoát khỏi trang web trong quá trình chờ đợi!
                        </div>
                    </div>
                </div>
                <div className="right-sec basis-[45%] mt-20">
                    <div className="border-x border-y px-3 py-5 shadow-md">
                        <div className="py-2 px-5">
                            <span className="text-blue-600 text-lg font-medium">
                                Cảm ơn bạn. Đơn hàng của bạn đã được ghi nhận
                            </span>
                        </div>
                        <div className="px-10">
                            <ul className="list-disc flex flex-col gap-3">
                                <li>
                                    <span>Mã đơn hàng: </span>
                                    <span className="font-semibold">{odID}</span>
                                </li>
                                <li>
                                    <span>Ngày: </span>
                                    <span className="font-semibold">{orderInfo.date}</span>
                                </li>
                                <li>
                                    <span>Tổng cộng: </span>
                                    <span className="font-semibold">{addCommas(total)}₫</span>
                                </li>
                                <li>
                                    <span>Phương thức thanh toán: </span>
                                    <span className="font-semibold">Chuyển khoản ngân hàng</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl mt-5 mb-3 font-medium">
                            <span>Thông tin nhận hàng</span>
                        </div>
                        <div>
                            <ul className="list-disc px-5 flex flex-col gap-2">
                                <li>
                                    <span>Họ tên người nhận: </span>
                                    <span className="font-medium">{receiverInfo.name}</span>
                                </li>
                                <li>
                                    <span>Số điện thoại: </span>
                                    <span className="font-medium">{receiverInfo.phone}</span>
                                </li>
                                <li>
                                    <span>Địa chỉ nhận hàng: </span>
                                    <span className="font-medium">{receiverInfo.address}</span>
                                </li>
                                <li>
                                    <span>Ghi chú: </span>
                                    <span className="font-medium">{receiverInfo.note}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl mt-4 mb-2 font-medium">
                            <span>Thông tin sản phẩm</span>
                        </div>
                        <div className="">
                            {products.map((product, index) => {
                                return (
                                    <div className="grid grid-cols-12 items-center py-2">
                                        <div className="col-span-2 w-[96px] h-[96px] flex items-center relative">
                                            <img
                                                className="w-[90%] h-[90%] rounded-md"
                                                src={product.image}
                                            />
                                            <div className="absolute top-0 right-0">
                                                <div className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-xl">
                                                    {product.quantity}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-8 px-5 flex flex-col">
                                            <span>{product.name}</span>
                                            <span className="text-sm text-gray-400">
                                                {product.color}, {product.size}
                                            </span>
                                        </div>
                                        <div className="col-span-2 flex justify-end">
                                            <span>
                                                {addCommas(product.price * product.quantity)}₫
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="border-t border-gray-300 mt-5"></div>
                        <div className="mt-5 mx-20 text-gray-500">
                            <div className="flex justify-between py-2">
                                <span>Tạm tính</span>
                                <span>{addCommas(total)}₫</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span>Vận chuyển</span>
                                <span>{orderInfo.method === "ship" ? "30,000₫" : "0"}</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-300 mt-5"></div>
                        <div className="mt-5 mx-20">
                            <div className="flex justify-between">
                                <span className="font-semibold text-lg">Tổng cộng</span>
                                <span className="text-2xl font-medium">{addCommas(total)}₫</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 bg-gray-500 bg-opacity-20 text-slate-500 flex justify-center items-center w-full h-12">
                <span>©2024 - Trương Quang Việt </span>
            </div>
        </div>
    );
};
export default CheckOut2;
