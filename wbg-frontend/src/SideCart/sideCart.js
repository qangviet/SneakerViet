import React from "react";
import { Drawer } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { openCart, closeCart, decrease, increase, setLoadding, remove } from "../Redux/cartSlice";
import LoaddingSpiner from "../Loadding/loadding";
import { useNavigate } from "react-router-dom";
const SideCart = () => {
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

    const isOpen = useSelector((state) => state.cart.isOpen);

    const openModalCart = () => {
        dispatch(openCart());
    };

    const closeModalCart = () => {
        dispatch(closeCart());
    };

    const products = useSelector((state) => state.cart.products);

    const decreaseQuantity = (index) => {
        dispatch(setLoadding(true));
        dispatch(decrease(index));
        dispatch(setLoadding(false));
    };
    const increaseQuantity = (index) => {
        dispatch(setLoadding(true));
        dispatch(increase(index));
        dispatch(setLoadding(false));
    };

    const removeFromCart = (index) => {
        dispatch(setLoadding(true));
        dispatch(remove(index));
        dispatch(setLoadding(false));
    };

    const EmptyCart = (
        <div className="w-[450px] h-full">
            <div className="bg-slate-100">
                <div
                    className="flex justify-end px-4 hover:cursor-pointer py-8 hover:text-red-500 text-gray-500"
                    onClick={closeModalCart}
                >
                    <i className="fa-solid fa-xmark fa-xl"></i>
                </div>
            </div>
            <div className="flex flex-col gap-5 justify-center items-center h-[70%]">
                <div className="px-7 py-7 rounded-[50%] bg-gray-100 text-gray-500">
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
                        class="feather feather-shopping-bag w-8 h-8"
                    >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                </div>
                <div className="text-gray-500 font-medium mb-16">
                    Chưa có sản phẩm trong giỏ hàng
                </div>
                <div
                    onClick={closeModalCart}
                    className="border-solid border-[2px] border-blue-500 text-blue-500 cursor-pointer px-5 py-2"
                >
                    <button>Tiếp tục mua sắm</button>
                </div>
            </div>
        </div>
    );

    const DrawerList = (
        <div className="w-[450px]">
            <div className="bg-slate-100">
                <div
                    className="flex justify-end px-4 hover:cursor-pointer py-8 hover:text-red-500 text-gray-500"
                    onClick={closeModalCart}
                >
                    <i className="fa-solid fa-xmark fa-xl"></i>
                </div>
            </div>
            {products.map((product, index) => {
                return (
                    <div className="mt-8 pl-3 flex flex-row gap-4 mx-4">
                        <div className="max-w-[100px] max-h-[100px]">
                            <img className="w-full h-full" src={product.image} />
                        </div>
                        <div>
                            <div className="flex flex-row">
                                <div>
                                    <div>{product.name}</div>
                                    <div className="flex flex-row gap-1">
                                        <div className="text-[13px] py-1 ">
                                            <span>{product.color}, </span>
                                        </div>
                                        <div className="text-[13px] py-1 ">
                                            <span>Size: </span>
                                            <span className="text-gray-600">{product.size}</span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="px-3 hover:cursor-pointer text-gray-400 hover:text-red-500"
                                    onClick={() => removeFromCart(index)}
                                >
                                    <i className="fa-solid fa-xmark fa-md"></i>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row items-center my-1 gap-2">
                                        <div
                                            className="hover:bg-gray-300 hover:bg-opacity-25 hover:rounded-3xl cursor-pointer"
                                            onClick={() => decreaseQuantity(index)}
                                        >
                                            <i className="fa-solid fa-minus fa-xs px-1"></i>
                                        </div>
                                        <div className="bg-slate-400 bg-opacity-10 px-3 py-1">
                                            <span>{product.quantity}</span>
                                        </div>
                                        <div
                                            className="hover:bg-gray-300 hover:bg-opacity-25 hover:rounded-3xl cursor-pointer"
                                            onClick={() => increaseQuantity(index)}
                                        >
                                            <i className="fa-solid fa-plus fa-xs px-1"></i>
                                        </div>
                                    </div>
                                    <div className="px-5 text-gray-500">
                                        <span>{addCommas(product.price * product.quantity)}₫</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="py-16 px-10">
                <div className="flex justify-between flex-row">
                    <span className="font-semibold">Tổng số tiền:</span>
                    <span className="font-semibold">
                        {addCommas(
                            products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                        )}
                        ₫
                    </span>
                </div>
                <div className="py-5">
                    <button
                        className="w-full bg-orange-600 hover:bg-opacity-85 hover:cursor-pointer text-white py-2 mt-4"
                        onClick={() => {
                            navigate("/checkout");
                            closeModalCart();
                        }}
                    >
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );

    const isLoadding = useSelector((state) => state.cart.isLoadding);

    return (
        <>
            <Drawer anchor="right" open={isOpen} onClose={closeModalCart}>
                {isLoadding ? (
                    <div className="flex justify-center items-center w-[450px] h-[100vh]">
                        <LoaddingSpiner />
                    </div>
                ) : products.length === 0 ? (
                    EmptyCart
                ) : (
                    DrawerList
                )}
            </Drawer>
        </>
    );
};

export default SideCart;
