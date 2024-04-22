import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openCart, closeCart } from "../../Redux/cartSlice";
import SideCart from "../../SideCart/sideCart";
function Header() {
    const products = useSelector((state) => state.cart.products);

    const [hidden, setHidden] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const goToProfile = () => {
        const acc = JSON.parse(sessionStorage.getItem("account"));
        if (!acc) {
            navigate("/login");
        } else {
            navigate("/profile");
        }
    };
    const menuItem = (
        <ul
            className="absolute top-14 text-center z-30 uppercase bg-slate-100 
            w-full text-sm text-gray-500 font-medium animate-slideDown"
        >
            <li className="tqv-top-menu-item">
                <a href="#">Nike</a>
            </li>
            <li className="tqv-top-menu-item">
                <a href="#">Adidas</a>
            </li>
            <li className="tqv-top-menu-item">
                <a href="#">NewBalance</a>
            </li>
            <li className="tqv-top-menu-item">
                <a href="#">Vans</a>
            </li>
            <li className="tqv-top-menu-item">
                <a href="#">MLB</a>
            </li>
            <li className="tqv-top-menu-item">
                <a href="#">Hãng khác</a>
            </li>
        </ul>
    );
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setHidden(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const isOpen = useSelector((state) => state.cart.isOpen);

    const showMenu = () => {
        setHidden((prev) => !prev);
    };
    const openModalCart = () => {
        dispatch(openCart());
    };

    return (
        <>
            <SideCart></SideCart>
            <div className="py-6 mx-10 flex flex-row justify-between items-center relative">
                {hidden && menuItem}
                <Link
                    className="logo basis-2/6 text-center text-xl font-semibold cursor-pointer"
                    to={"/"}
                >
                    SneakersViet
                </Link>
                <ul className="basis-3/6 hidden lg:flex lg:flex-row lg:justify-end lg:items-center lg:gap-8 uppercase text-sm text-gray-500 font-medium">
                    <li className="tqv-top-menu-item">
                        <a href="#">Nike</a>
                    </li>
                    <li className="tqv-top-menu-item">
                        <a href="#">Adidas</a>
                    </li>
                    <li className="tqv-top-menu-item">
                        <a href="#">NewBalance</a>
                    </li>
                    <li className="tqv-top-menu-item">
                        <a href="#">Vans</a>
                    </li>
                    <li className="tqv-top-menu-item">
                        <a href="#">MLB</a>
                    </li>
                    <li className="tqv-top-menu-item">
                        <a href="#">Hãng khác</a>
                    </li>
                </ul>
                <ul className="basis-3/6 lg:basis-1/6 flex justify-end lg:justify-start items-center ml-16 uppercase text-sm text-gray-500 font-medium">
                    <li className="tqv-top-menu-item flex flex-row">
                        <div className="flex items-center" onClick={openModalCart}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 tqv-icon"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                            <span className="mx-1.5">Cart</span>
                            <span className="tqv-badge-circle bg-orange-500 text-white">
                                {products.length > 99 ? +99 : products.length}
                            </span>
                        </div>
                    </li>
                </ul>
                <div
                    className="lg:hidden basis-1/6 flex justify-end sm:justify-center items-center cursor-pointer px-2 sm:px-3"
                    onClick={showMenu}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 tqv-icon"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                        />
                    </svg>
                </div>
                <div className=" text-gray-500 tqv-top-menu-item flex  items-center">
                    <div onClick={goToProfile} className="flex items-center px-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="tqv-icon"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Header;
