import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import img from "./login_img.jpg";
import axios from "axios";
const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [checkEmpty, setCheckEmpty] = useState([false, false]);

    const handleLogin = async () => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            alert("Email không hợp lệ!");
            return;
        }
        let response = await axios.post("http://localhost:8088/api/login", { email, password });
        if (response.data.EC === "0") {
            alert("Đăng nhập thành công!");
            let dt = { email, role: response.data.DT.role, token: "" };
            sessionStorage.setItem("account", JSON.stringify(dt));
            navigate("/");
        } else if (response.data.EC === "1") {
            alert(response.data.EM);
        } else {
            alert(response.data.EM);
        }
    };

    return (
        <div class="bg-white font-family-karla h-screen">
            <div class="w-full flex flex-wrap">
                <div class="w-full md:w-1/2 flex flex-col">
                    <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                        <Link to="/" className="bg-black text-white font-bold text-xl p-4">
                            Trang chủ
                        </Link>
                    </div>
                    <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p class="text-center text-3xl">Welcome.</p>
                        <div class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
                            <div class="flex flex-col pt-4">
                                <label className="text-lg">Email</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (e.target.value === "") {
                                            setCheckEmpty([true, checkEmpty[1]]);
                                        } else {
                                            setCheckEmpty([false, checkEmpty[1]]);
                                        }
                                    }}
                                    className={
                                        checkEmpty[0]
                                            ? "tqv-ele-form-register border-red-600"
                                            : "tqv-ele-form-register"
                                    }
                                />
                            </div>

                            <div class="flex flex-col pt-4">
                                <label for="password" class="text-lg">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (e.target.value === "") {
                                            setCheckEmpty([checkEmpty[0], true]);
                                        } else {
                                            setCheckEmpty([checkEmpty[0], false]);
                                        }
                                    }}
                                    className={
                                        checkEmpty[1]
                                            ? "tqv-ele-form-register border-red-600"
                                            : "tqv-ele-form-register"
                                    }
                                />
                            </div>

                            <button
                                onClick={handleLogin}
                                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <div class="text-center pt-12 pb-12">
                            <p>
                                <Link to="" className="underline font-semibold">
                                    Quên mật khẩu?
                                </Link>
                                <Link
                                    to="/register"
                                    class="underline font-semibold px-2 text-blue-400"
                                >
                                    Tạo tài khoản.
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="w-1/2 shadow-2xl">
                    <img class="object-cover w-full h-screen hidden md:block" src={img} />
                </div>
            </div>
        </div>
    );
};

export default Login;
