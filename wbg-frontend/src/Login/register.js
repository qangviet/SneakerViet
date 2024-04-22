import React, { useState } from "react";
import img from "./login_img.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    //Gender: Male, Female, Other
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [checkValid, setCheckValid] = useState([]);

    const handleSubmit = async () => {
        if (!gender) {
            alert("Vui lòng chọn giới tính!");
            return;
        }
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            alert("Email không hợp lệ!");
            return;
        }
        const pattern = /^\d{10}$/;
        if (!pattern.test(phone)) {
            alert("Số điện thoại không hợp lệ!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }
        const data = { name, email, gender, phone, password };
        let response = await axios.post("http://localhost:8088/api/register", data);
        if (response.data.EC === "1") {
            alert(response.data.EM);
        } else if (response.data.EC === "0") {
            alert(response.data.EM);
            navigate("/login");
        } else {
            alert("Đã có lỗi xảy ra!");
        }
        return;
    };

    return (
        <div className="bg-white font-family-karla h-screen">
            <div className="w-full flex flex-wrap">
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                        <a
                            href="/"
                            className="bg-black text-white font-bold text-xl p-4"
                            alt="Logo"
                        >
                            Trang chủ
                        </a>
                    </div>
                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p className="text-center text-3xl">Join Us.</p>
                        <div className="flex flex-col pt-3 md:pt-8">
                            <div className="flex flex-col pt-4">
                                <label for="name" className="text-lg">
                                    Họ tên
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="John Smith"
                                    className="tqv-ele-form-register"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col pt-4">
                                <label for="email" className="text-lg">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="your@email.com"
                                    className="tqv-ele-form-register"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col pt-4">
                                <label for="name" className="text-lg">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    id="sdt"
                                    placeholder="0123456789"
                                    className="tqv-ele-form-register"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col pt-4">
                                <label for="gender" className="text-lg">
                                    Giới tính
                                </label>
                                <fieldset className="flex flex-row gap-10 pt-3">
                                    <legend className="sr-only">Gender</legend>
                                    <div className="flex items-center">
                                        <input
                                            id="gender-option-1"
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={gender === "Male"}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            for="gender-option-1"
                                            className="block ms-2 text-sm text-gray-900 dark:text-gray-300"
                                        >
                                            Nam
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            id="gender-option-2"
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={gender === "Female"}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            for="gender-option-2"
                                            className="block ms-2 text-sm text-gray-900 dark:text-gray-300"
                                        >
                                            Nữ
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="gender-option-3"
                                            type="radio"
                                            name="gender"
                                            value="Other"
                                            checked={gender === "Other"}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            for="gender-option-3"
                                            className="block ms-2 text-sm text-gray-900 dark:text-gray-300"
                                        >
                                            Khác
                                        </label>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="flex flex-col pt-4">
                                <label for="password" className="text-lg">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="tqv-ele-form-register"
                                    required
                                />
                            </div>

                            <div className="flex flex-col pt-4">
                                <label for="confirm-password" className="text-lg">
                                    Nhập lại mật khẩu
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Password"
                                    className="tqv-ele-form-register"
                                    required
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 hover:cursor-pointer"
                            >
                                Đăng ký
                            </button>
                        </div>
                        <div className="text-center pt-12 pb-12">
                            <p>
                                Đã có tài khoản?{" "}
                                <a href="/login" className="underline font-semibold">
                                    Đăng nhập.
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 shadow-2xl">
                    <img
                        className="object-cover w-full h-screen hidden md:block"
                        src={img}
                        alt="Background"
                    />
                </div>
            </div>
        </div>
    );
}

export default Register;
