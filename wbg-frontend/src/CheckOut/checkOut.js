import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import LoaddingSpiner from "../Loadding/loadding";
import {
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    getAccordionDetailsUtilityClass,
} from "@mui/material";
import Modal from "react-modal";
import zIndex from "@mui/material/styles/zIndex";
import { useNavigate } from "react-router-dom";
import { setOrderID } from "../Redux/orderSlice";

const customStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 5,
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        border: "none",
    },
};

const CheckOut = () => {
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

    const totalPrice = () => {
        let total = 0;
        for (const product of products) {
            total += product.price * product.quantity;
        }
        return total;
    };

    const [openSelect, setOpenSelect] = useState([false, false, false]);

    const products = useSelector((state) => state.cart.products);

    const [deliveryMethod, setDeliveryMethod] = useState("ship");

    const [address, setAddress] = useState("");

    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");

    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        const getProvinceList = async () => {
            setIsLoadding(true);
            await axios
                .get("https://esgoo.net/api-tinhthanh/1/0.htm")
                .then((res) => {
                    if (res.data.error === 0) {
                        setProvinceList(res.data.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            setIsLoadding(false);
        };
        getProvinceList();
    }, []);

    useEffect(() => {
        const getDistricList = async () => {
            const url = "https://esgoo.net/api-tinhthanh/1/0.htm";
            await axios
                .get(`https://esgoo.net/api-tinhthanh/2/${province}.htm`)
                .then((res) => {
                    if (res.data.error === 0) {
                        setDistrictList(res.data.data);
                    }
                })
                .catch((err) => console.log(err));
        };
        if (province) {
            setDistrict("");
            setWard("");
            getDistricList();
        } else {
            setDistrict("");
            setDistrictList([]);
        }
    }, [province]);

    useEffect(() => {
        const getWard = async () => {
            await axios
                .get(`https://esgoo.net/api-tinhthanh/3/${district}.htm`)
                .then((res) => {
                    if (res.data.error === 0) {
                        setWardList(res.data.data);
                    }
                })
                .catch((err) => console.log(err));
        };
        if (district) {
            setWard("");
            getWard();
        } else {
            setWard("");
            setWardList([]);
        }
    }, [district]);

    const [isLoadding, setIsLoadding] = useState(false);
    Modal.setAppElement("#root");

    const [countOD, setCountOD] = useState({});

    const getCurrentDate = () => {
        var today = new Date();
        var day = String(today.getDate()).padStart(2, "0");
        var month = String(today.getMonth() + 1).padStart(2, "0");
        var year = today.getFullYear();
        var formattedDate = day + "/" + month + "/" + year;

        return formattedDate;
    };

    const createID = () => {
        var today = new Date();
        var day = String(today.getDate()).padStart(2, "0");
        var month = String(today.getMonth() + 1).padStart(2, "0");
        var year = String(today.getFullYear()).slice(-2);
        let formattedDate = day + month + year;
        let count = localStorage.getItem("qv-order-count");
        if (!count) {
            count = {
                c: 1,
                date: new Date().toDateString(),
            };
        } else {
            count = JSON.parse(count);
            if (today.toDateString() !== count.date) {
                count = {
                    c: 1,
                    date: today.toDateString(),
                };
            }
        }
        setCountOD(count);
        let id = "OD" + formattedDate + String(count.c).padStart(5, "0");
        return id;
    };
    const dispatch = useDispatch();
    const nextStep = async () => {
        setIsLoadding(true);
        if (!name || !email || !phone) {
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        }
        if (deliveryMethod === "ship") {
            if (!province || !district || !ward || !address) {
                alert("Vui lòng chọn địa chỉ giao hàng");
                return;
            }
        }
        let address_od = "";
        if (deliveryMethod === "ship") {
            let wardOd = "";
            let districtOd = "";
            let provinceOd = "";
            for (let i = 0; i < wardList.length; i++) {
                if (wardList[i].id === ward) {
                    wardOd = wardList[i].full_name;
                    break;
                }
            }
            for (let i = 0; i < districtList.length; i++) {
                if (districtList[i].id === district) {
                    districtOd = districtList[i].full_name;
                    break;
                }
            }
            for (let i = 0; i < provinceList.length; i++) {
                if (provinceList[i].id === province) {
                    provinceOd = provinceList[i].name;
                    break;
                }
            }
            address_od = `${address}, ${wardOd}, ${districtOd}, ${provinceOd}`;
        } else {
            address_od = "Tại cửa hàng: Số 206 Đường Cổ Loa, Xã Cổ Loa, Huyện Đông Anh, Hà Nội";
        }
        let products_od = [];
        for (let i = 0; i < products.length; i++) {
            let product = {
                code: products[i].code,
                name: products[i].name,
                price: products[i].price,
                size: products[i].size,
                color: products[i].color,
                quantity: products[i].quantity,
            };
            products_od.push(product);
        }
        let id = createID();
        let order_info = {
            id: id,
            name: name,
            email: email,
            phone: phone,
            deliveryMethod: deliveryMethod,
            address: address_od,
            products: products_od,
            date: getCurrentDate(),
        };

        const res = await axios.post("http://localhost:8088/api/create-order", order_info);
        if (res.data.EC === "0") {
            alert("Đặt hàng thành công");
            if (countOD) {
                countOD.c += 1;
                localStorage.setItem("qv-order-count", JSON.stringify(countOD));
            }
            dispatch(setOrderID(id));
            navigate("/checkout/next");
        } else {
            console.log(res.data.EM);
        }
        setIsLoadding(false);
    };

    return (
        <>
            <Modal
                isOpen={isLoadding}
                onRequestClose={() => setIsLoadding(false)}
                style={customStyles}
            >
                <div className="w-full h-full flex justify-center items-center">
                    <LoaddingSpiner />
                </div>
            </Modal>
            <div className="grid grid-cols-2">
                <div className="col-span-1 flex justify-end border-r h-[100vh] border-gray-300 shadow-sm">
                    <div className="w-[700px] mx-10 mt-10">
                        <div
                            className="font-semibold py-3 text-2xl cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            <span>SNEAKER VIET</span>
                        </div>
                        <div className="py-3 text-2xl">
                            <span>Thông tin đơn hàng</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Bạn đã có tài khoản? </span>
                            <Link to="/login" className="text-blue-400 underline">
                                Đăng nhập
                            </Link>
                        </div>
                        <div className="py-2">
                            <label className="inline-block mb-2 text-base">Họ và tên</label>
                            <input
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                             disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                required
                                type="text"
                                placeholder="Trương Văn A"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div className="py-2 flex flex-row gap-3">
                            <div className="basis-[70%]">
                                <label className="inline-block mb-2 text-base">Email</label>
                                <input
                                    className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                            disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="abc@gmail.com"
                                ></input>
                            </div>
                            <div className="basis-[30%]">
                                <label className="inline-block mb-2 text-base">Số điện thoại</label>
                                <input
                                    className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                             disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                    required
                                    type="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="0123456789"
                                ></input>
                            </div>
                        </div>
                        <div className="border-slate-300 w-full rounded-md border-[1px] my-5">
                            <div className="px-4 py-2 text-gray-700">
                                <FormControlLabel
                                    value="ship"
                                    checked={deliveryMethod === "ship"}
                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                    control={<Radio />}
                                    label="Giao tận nơi"
                                />
                            </div>
                            {deliveryMethod === "ship" ? (
                                <div className="bg-gray-600 bg-opacity-10 w-full border">
                                    <div className="flex flex-row justify-between px-[14px] mt-3 items-center">
                                        <FormControl sx={{ m: 1, width: 200, bgcolor: "#fff" }}>
                                            <InputLabel id="label-province">
                                                Tỉnh/Thành phố
                                            </InputLabel>
                                            <Select
                                                labelId="label-province"
                                                open={openSelect[0]}
                                                onClose={() =>
                                                    setOpenSelect((prev) => {
                                                        return [false, prev[1], prev[2]];
                                                    })
                                                }
                                                onOpen={() =>
                                                    setOpenSelect((prev) => {
                                                        return [true, prev[1], prev[2]];
                                                    })
                                                }
                                                value={province}
                                                label="Tỉnh/Thành phố"
                                                onChange={(e) => setProvince(e.target.value)}
                                            >
                                                <MenuItem value="">
                                                    <em>Chọn Tỉnh/Thành phố</em>
                                                </MenuItem>
                                                {provinceList.map((province, index) => {
                                                    return (
                                                        <MenuItem value={province.id}>
                                                            {province.name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ m: "1", width: 200, bgcolor: "#fff" }}>
                                            <InputLabel id="label-district">Quận/Huyện</InputLabel>
                                            <Select
                                                labelId="label-district"
                                                open={openSelect[1]}
                                                onClose={() =>
                                                    setOpenSelect((prev) => {
                                                        return [prev[0], false, prev[2]];
                                                    })
                                                }
                                                onOpen={() =>
                                                    setOpenSelect((prev) => {
                                                        return [prev[0], true, prev[2]];
                                                    })
                                                }
                                                value={district}
                                                label="Quận/Huyện"
                                                onChange={(e) => setDistrict(e.target.value)}
                                            >
                                                <MenuItem value="">
                                                    <em>Chọn Quận/Huyện</em>
                                                </MenuItem>
                                                {districtList.map((district, index) => {
                                                    return (
                                                        <MenuItem value={district.id}>
                                                            {district.full_name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ m: 1, width: 200, bgcolor: "#fff" }}>
                                            <InputLabel id="label-ward">Phường/Xã</InputLabel>
                                            <Select
                                                labelId="label-ward"
                                                open={openSelect[2]}
                                                onClose={() =>
                                                    setOpenSelect((prev) => {
                                                        return [prev[0], prev[1], false];
                                                    })
                                                }
                                                onOpen={() =>
                                                    setOpenSelect((prev) => {
                                                        return [prev[0], prev[1], true];
                                                    })
                                                }
                                                value={ward}
                                                label="Phường/Xã"
                                                onChange={(e) => setWard(e.target.value)}
                                            >
                                                <MenuItem value="">
                                                    <em>Chọn Phường/Xã</em>
                                                </MenuItem>
                                                {wardList.map((ward, index) => {
                                                    return (
                                                        <MenuItem value={ward.id}>
                                                            {ward.full_name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="bg-white mt-2 mb-5 mx-5">
                                        <TextField
                                            fullWidth
                                            required
                                            variant="outlined"
                                            label="Địa chỉ"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        ></TextField>
                                    </div>
                                </div>
                            ) : (
                                <div className="border-t bg-gray-800 w-full"></div>
                            )}

                            <div className="px-4 py-2 text-gray-700">
                                <FormControlLabel
                                    value="in-shop"
                                    checked={deliveryMethod === "in-shop"}
                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                    control={<Radio />}
                                    label="Nhận trực tiếp tại cửa hàng"
                                />
                            </div>
                            {deliveryMethod === "in-shop" ? (
                                <div className="border-t border-slate-300 bg-gray-600 bg-opacity-10 px-7 py-2">
                                    <FormControlLabel
                                        value="shopAddress"
                                        checked={1}
                                        control={<Radio />}
                                        label="Cổ Loa: Số 206 Đường Cổ Loa, Xã Cổ Loa, Huyện Đông Anh, Hà Nội"
                                    />
                                </div>
                            ) : (
                                <div className="border-t bg-gray-800 w-full"></div>
                            )}
                        </div>
                        <div className="flex justify-end mt-7">
                            <button
                                className="px-5 bg-sky-600 rounded-md text-slate-100 py-3 hover:bg-opacity-75 hover:text-white"
                                onClick={nextStep}
                            >
                                Tiếp tục đến phương thức thanh toán
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 h-[100vh] bg-gray-300 bg-opacity-20">
                    <div className="mt-16 mx-12 w-[600px]">
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
                                        <span>{addCommas(product.price * product.quantity)}₫</span>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="border-t border-gray-300 mt-5"></div>
                        <div className="mt-5 mx-20 text-gray-500">
                            <div className="flex justify-between py-2">
                                <span>Tạm tính</span>
                                <span>{addCommas(totalPrice())}₫</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span>Vận chuyển</span>
                                <span>{deliveryMethod === "ship" ? "30,000₫" : "0"}</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-300 mt-5"></div>
                        <div className="mt-5 mx-20">
                            <div className="flex justify-between">
                                <span className="font-semibold text-lg">Tổng cộng</span>
                                <span className="text-3xl font-semibold">
                                    {deliveryMethod === "ship"
                                        ? addCommas(totalPrice() + 30000)
                                        : addCommas(totalPrice())}
                                    ₫
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckOut;
