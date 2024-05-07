import React, { useEffect } from "react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import sussces from "./success.png";
import { useNavigate } from "react-router-dom";
const CheckOut3 = () => {
    const navigate = useNavigate();
    const [loadding, setLoadding] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoadding(false);
        }, 5000);
        const timeout2 = setTimeout(() => {
            navigate("/");
        }, 15000);
        return () => {
            clearTimeout(timeout);
            clearTimeout(timeout2);
        };
    }, []);
    return (
        <>
            {loadding ? (
                <div className="mx-10 my-1 flex justify-center items-center h-[80%]">
                    <BeatLoader
                        color={"#123abc"}
                        loading={loadding}
                        size={10}
                        aria-label="Beat loadder"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <div className="flex justify-center items-center h-[80%]">
                    <div className="mx-10 my-1 flex justify-center items-center flex-col">
                        <div>
                            <img src={sussces} alt="success" />
                        </div>
                        <div className="font-semibold text-2xl py-2">
                            <span>Thanh toán thành công</span>
                        </div>
                        <div className="py-2">
                            <span>Đơn hàng của bạn sẽ sớm được xử lý.</span>
                        </div>
                        <div className="text-red-500 py-2 font-medium">
                            <span>
                                * Đơn hàng của bạn sẽ được giao trong giờ hành chính, từ thứ 2 đến
                                thứ 7. Các bạn vui lòng chú ý điện thoại để nhận hàng nhanh nhất
                                nhé!
                            </span>
                        </div>
                        <div className="text-sky-500 font-medium text-xl">
                            <span>Hotline hỗ trợ: 0347 0349 022</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default CheckOut3;
