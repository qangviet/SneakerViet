import React from "react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import sussces from "./success.png";
const CheckOut3 = () => {
    const [loadding, setLoadding] = useState(false);

    return (
        <>
            {loadding ? (
                <div className="mx-10 my-1 flex justify-center items-center">
                    <BeatLoader
                        color={"#123abc"}
                        loading={loadding}
                        size={10}
                        aria-label="Beat loadder"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <div className="mx-10 my-1 flex justify-center items-center flex-col">
                    <div>
                        <img src={sussces} alt="success" />
                    </div>
                    <div>
                        <span>Đơn hàng của bạn sẽ sớm được xử lý.</span>
                    </div>
                    <div>
                        <span>
                            * Đơn hàng của bạn sẽ được giao trong giờ hành chính, từ thứ 2 đến thứ
                            7. Các bạn vui lòng chú ý điện thoại để nhận hàng nhanh nhất nhé!
                        </span>
                    </div>
                    <div>
                        <span>Hotline hỗ trợ: 0347 0349 022</span>
                    </div>
                </div>
            )}
        </>
    );
};
export default CheckOut3;
