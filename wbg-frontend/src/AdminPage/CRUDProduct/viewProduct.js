import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPCodeDisplay } from "../../Redux/productSlice";
import { setLoadding } from "../../Redux/appSlice";
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

const stylePublish =
    "px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-green-100 border-green-200 text-green-500";
const styleHidden =
    "px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-red-100 border-red-200 text-red-500";
const action_active =
    "px-3 py-[13px] rounded-md cursor-pointer bg-slate-500 text-gray-50 w-7 flex justify-center items-center";
const action_hover =
    "px-3 py-[13px] bg-opacity-40 rounded-md cursor-pointer hover:bg-slate-500 hover:text-gray-50 bg-slate-200 w-7 flex justify-center items-center";

const ViewProduct = () => {
    const [listProducts, setListProducts] = useState([]);
    const [change, setChange] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const getListProducts = async () => {
            dispatch(setLoadding(true));
            await axios.get("http://localhost:8088/api/admin/get-products").then((res) => {
                if (res.data.EC === "0") {
                    for (const d of res.data.DT) {
                        const imageUrl = `data:image/jpg;base64,${d.img}`;
                        d.img = imageUrl;
                        if (d.status === "public") {
                            d.status = ["Hiển thị", stylePublish];
                        } else if (d.status === "hidden") {
                            d.status = ["Ẩn", styleHidden];
                        }
                    }
                    setListProducts(res.data.DT);
                } else {
                    alert(res.data.EM);
                }
            });
            dispatch(setLoadding(false));
        };
        getListProducts();
    }, [change]);
    const calculateSalePrice = (price, sale) => {
        let p = price - (price * sale) / 100;
        p = Math.round(p / 10000) * 10000;
        return p;
    };
    const calculateSaleRate = (price, priceSale) => {
        let sale = ((price - priceSale) / price) * 100;
        sale = Math.round(sale);
        return sale;
    };
    const [dropAction, setDropAction] = useState(-1);
    const [details, setDetails] = useState([-1, -1]);
    Modal.setAppElement("#root");
    const [modalAdjustPrice, setModalAdjustPrice] = useState(false);
    const [productAdjustPrice, setProductAdjustPrice] = useState({});
    const openModalAdjustPrice = (index) => {
        let data = {
            code: listProducts[index].code,
            name: listProducts[index].name,
            price: listProducts[index].price,
            sale: listProducts[index].sale,
            priceSale: calculateSalePrice(listProducts[index].price, listProducts[index].sale),
        };
        setProductAdjustPrice(data);
        setModalAdjustPrice(true);
    };
    const closeModalAdjustPrice = () => {
        setModalAdjustPrice(false);
        setProductAdjustPrice({});
    };
    const handleAdjustPrice = async () => {
        dispatch(setLoadding(true));
        await axios
            .post("http://localhost:8088/api/admin/edit-price", {
                code: productAdjustPrice.code,
                price: productAdjustPrice.price,
                sale: productAdjustPrice.sale,
            })
            .then((res) => {
                if (res.data.EC === "0") {
                    alert("Chỉnh giá thành công!");
                    closeModalAdjustPrice();
                    setChange((prev) => prev + 1);
                } else {
                    alert(res.data.EM);
                }
            });
        dispatch(setLoadding(false));
    };

    const [modalAdjustQuantity, setModalAdjustQuantity] = useState(false);
    const [productAdjustQuantity, setProductAdjustQuantity] = useState({});
    const [quantity, setQuantity] = useState(0);
    const openModalAdjustQuantity = (index) => {
        let data = {
            code: listProducts[index].code,
            name: listProducts[index].name,
            color: listProducts[index].color,
        };
        setQuantity(listProducts[index].stock.details);
        setProductAdjustQuantity(data);
        setModalAdjustQuantity(true);
    };
    const closeModalAdjustQuantity = () => {
        setModalAdjustQuantity(false);
        setProductAdjustQuantity({});
    };
    const handleAdjustQuantity = async () => {
        if (quantity.length === 0) {
            alert("Vui lòng nhập số lượng");
            return;
        }
        for (let i = 0; i < quantity.length; i++) {
            if (quantity[i].size === "") {
                quantity.splice(i, 1);
            }
        }
        let color = {
            name: productAdjustQuantity.color,
            size_quan: quantity,
        };
        dispatch(setLoadding(true));
        await axios
            .post("http://localhost:8088/api/admin/edit-quantity", {
                code: productAdjustQuantity.code,
                color: color,
            })
            .then((res) => {
                if (res.data.EC === "0") {
                    alert("Chỉnh số lượng thành công!");
                    closeModalAdjustQuantity();
                    setChange((prev) => prev + 1);
                } else {
                    alert(res.data.EM);
                }
            });
        dispatch(setLoadding(false));
    };
    const addSize = () => {
        setQuantity((prev) => {
            let newQuantity = [...prev];
            newQuantity.push({ size: "", quantity: 0 });
            return newQuantity;
        });
    };
    const deleteSize = (index) => {
        setQuantity((prev) => {
            let newQuantity = [...prev];
            newQuantity.splice(index, 1);
            return newQuantity;
        });
    };

    const [modalHide, setModalHide] = useState(false);
    const [productHide, setProductHide] = useState("");
    const openModalHide = (index) => {
        setProductHide(listProducts[index].code);
        setModalHide(true);
    };
    const closeModalHide = () => {
        setModalHide(false);
    };
    const handleHide = async () => {
        dispatch(setLoadding(true));
        await axios
            .post("http://localhost:8088/api/admin/hide-product", {
                code: productHide,
                type: "hidden",
            })
            .then((res) => {
                if (res.data.EC === "0") {
                    alert("Ẩn sản phẩm thành công!");
                    closeModalHide();
                    setChange((prev) => prev + 1);
                } else {
                    alert(res.data.EM);
                }
            });
        dispatch(setLoadding(false));
    };

    const [modalDisplay, setModalDisplay] = useState(false);
    const [productDisplay, setProductDisplay] = useState("");
    const openModalDisplay = (index) => {
        setProductDisplay(listProducts[index].code);
        setModalDisplay(true);
    };
    const closeModalDisplay = () => {
        setModalDisplay(false);
    };
    const handleDisplay = async () => {
        await axios
            .post("http://localhost:8088/api/admin/hide-product", {
                code: productDisplay,
                type: "public",
            })
            .then((res) => {
                if (res.data.EC === "0") {
                    alert("Hiển thị sản phẩm thành công!");
                    closeModalDisplay();
                    setChange((prev) => prev + 1);
                } else {
                    alert(res.data.EM);
                }
            });
    };

    return (
        <>
            {modalAdjustPrice && (
                <Modal
                    isOpen={modalAdjustPrice}
                    onRequestClose={closeModalAdjustPrice}
                    style={customStyles}
                >
                    <div className="pb-4 text-lg font-semibold text-slate-700 flex flex-row items-center justify-between">
                        <span>Chỉnh sửa giá</span>
                        <div
                            className="text-gray-500 text-sm hover:text-red-500 cursor-pointer"
                            onClick={closeModalAdjustPrice}
                        >
                            <i className="fa-solid fa-x"></i>
                        </div>
                    </div>
                    <div className="border-t border-gray-300 py-2"></div>
                    <div className="w-[500px] grid grid-cols-2 gap-5 text-gray-500 font-normal">
                        <div className="col-span-2">
                            <label className="inline-block mb-2 text-base">Product Code</label>
                            <input
                                type="text"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                disabled
                                value={productAdjustPrice.code}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="inline-block mb-2 text-base">Tên sản phẩm</label>
                            <input
                                type="text"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                disabled
                                value={productAdjustPrice.name}
                            />
                        </div>
                        <div className="col-span-2 relative">
                            <label className="inline-block mb-2 text-base">Giá gốc</label>
                            <input
                                type="number"
                                className="block w-full rounded-md border-[1px] pl-4 pr-8 py-2 text-sm border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                value={productAdjustPrice.price}
                                onChange={(e) => {
                                    if (e.target.value < 0) {
                                        alert("Giá gốc không thể nhỏ hơn 0");
                                        return;
                                    }

                                    setProductAdjustPrice({
                                        ...productAdjustPrice,
                                        price: e.target.value,
                                        priceSale: calculateSalePrice(
                                            e.target.value,
                                            productAdjustPrice.sale
                                        ),
                                    });
                                }}
                            />
                            <i class="fa-solid fa-dong-sign absolute top-1/2 right-3 translate-y-1/2"></i>
                        </div>
                        <div className="col-span-1 relative">
                            <label className="inline-block mb-2 text-base">Sale Rate</label>
                            <input
                                type="number"
                                className="block w-full rounded-md border-[1px] pl-4  pr-8 py-2 text-sm border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                value={productAdjustPrice.sale}
                                onChange={(e) => {
                                    if (e.target.value > 100) {
                                        alert("Sale rate không thể lớn hơn 100%");
                                        return;
                                    } else if (e.target.value < 0) {
                                        alert("Sale rate không thể nhỏ hơn 0%");
                                        return;
                                    }
                                    setProductAdjustPrice({
                                        ...productAdjustPrice,
                                        sale: e.target.value,
                                        priceSale: calculateSalePrice(
                                            productAdjustPrice.price,
                                            e.target.value
                                        ),
                                    });
                                }}
                            />
                            <i className="fa-solid fa-percent absolute top-1/2 right-3 translate-y-1/2"></i>
                        </div>
                        <div className="col-span-1 relative ">
                            <label className="inline-block mb-2 text-base">Giá sale</label>
                            <input
                                type="number"
                                className="block w-full rounded-md border-[1px] pl-4  pr-8 py-2 text-sm border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                value={productAdjustPrice.priceSale}
                                onChange={(e) => {
                                    if (e.target.value > productAdjustPrice.price) {
                                        alert("Giá sale không thể lớn hơn giá gốc");
                                        return;
                                    } else if (e.target.value < 0) {
                                        alert("Giá sale không thể nhỏ hơn 0");
                                        return;
                                    }
                                    setProductAdjustPrice({
                                        ...productAdjustPrice,
                                        priceSale: e.target.value,
                                        sale: calculateSaleRate(
                                            productAdjustPrice.price,
                                            e.target.value
                                        ),
                                    });
                                }}
                            />
                            <i class="fa-solid fa-dong-sign absolute top-1/2 right-3 translate-y-1/2"></i>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="flex flex-row justify-end gap-3">
                            <button onClick={closeModalAdjustPrice}>
                                <span className="text-red-500 px-3 py-2 hover:bg-red-100 hover:rounded-md transition-all ease-linear duration-200">
                                    Hủy
                                </span>
                            </button>
                            <button onClick={() => handleAdjustPrice()}>
                                <span className="text-white bg-blue-500 px-3 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-all ease-linear duration-200">
                                    Lưu
                                </span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            {modalAdjustQuantity && (
                <Modal
                    isOpen={modalAdjustQuantity}
                    style={customStyles}
                    onRequestClose={closeModalAdjustQuantity}
                >
                    <div className="pb-4 text-lg font-semibold text-slate-700 flex flex-row items-center justify-between">
                        <span>Chỉnh sửa số lượng</span>
                        <div
                            className="text-gray-500 text-sm hover:text-red-500 cursor-pointer"
                            onClick={closeModalAdjustQuantity}
                        >
                            <i className="fa-solid fa-x"></i>
                        </div>
                    </div>
                    <div className="border-t border-gray-300 py-2"></div>
                    <div className="w-[900px] grid grid-cols-2 gap-5 text-gray-500 font-normal">
                        <div className="col-span-2">
                            <label className="inline-block mb-2 text-base">Product Code</label>
                            <input
                                type="text"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                          disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                disabled
                                value={productAdjustQuantity.code}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="inline-block mb-2 text-base">Tên sản phẩm</label>
                            <input
                                type="text"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                          disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                value={productAdjustQuantity.name}
                                disabled
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="flex flex-row justify-between items-center">
                                <label className="inline-block mb-2 text-base font-medium">
                                    Color
                                </label>
                            </div>
                            <div className="border-slate-200 w-full rounded-md border-[1px] px-4 py-2">
                                <div className="flex flex-row gap-5 ml-3">
                                    <div className="basis-[20%]">
                                        <label className="inline-block mb-2 text-base font-medium">
                                            Name
                                        </label>
                                        <input
                                            className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                                                disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                            required
                                            type="text"
                                            value={productAdjustQuantity.color}
                                            disabled
                                        ></input>
                                    </div>
                                    <div className="basis-[80%] grid grid-cols-2">
                                        {quantity.map((size_quan, index) => {
                                            return (
                                                <div className=" flex flex-row gap-5 col-span-1">
                                                    <div className="basis-[45%]">
                                                        <label className="inline-block mb-2 text-base font-medium">
                                                            Size
                                                        </label>
                                                        <input
                                                            className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                                                                    disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                                            required
                                                            value={size_quan.size}
                                                            onChange={(e) => {
                                                                setQuantity((prev) => {
                                                                    let newQuantity = [...prev];
                                                                    newQuantity[index].size =
                                                                        e.target.value;
                                                                    return newQuantity;
                                                                });
                                                            }}
                                                            type="number"
                                                        ></input>
                                                    </div>
                                                    <div className="basis-[45%]">
                                                        <label className="inline-block mb-2 text-base font-medium">
                                                            Quantity
                                                        </label>
                                                        <input
                                                            className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                                                                    disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                                            required
                                                            type="number"
                                                            onChange={(e) => {
                                                                if (e.target.value < 0) {
                                                                    alert(
                                                                        "Số lượng không thể nhỏ hơn 0"
                                                                    );
                                                                }
                                                                setQuantity((prev) => {
                                                                    let newQuantity = [...prev];
                                                                    newQuantity[index].quantity =
                                                                        e.target.value;
                                                                    return newQuantity;
                                                                });
                                                            }}
                                                            value={size_quan.quantity}
                                                        ></input>
                                                    </div>
                                                    {index > 0 ? (
                                                        <div
                                                            className="pr-7 mt-8"
                                                            onClick={() => deleteSize(index)}
                                                        >
                                                            <div className="flex justify-center flex-col text-red-400 cursor-pointer items-center h-full">
                                                                <i class="fa-solid fa-trash"></i>
                                                                <div className="border mt-1 border-gray-500 w-[16px]"></div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="px-7"></div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center items-center py-3">
                                    <div
                                        className="border-slate-200 rounded-md border-[1px] px-2 py-2 flex flex-row hover:border-blue-500 cursor-pointer"
                                        onClick={() => addSize()}
                                    >
                                        <div className="px-3 flex justify-center items-center">
                                            <i class="fa-solid fa-plus"></i>
                                        </div>
                                        <button className="text-sm font-medium">Add Size</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="flex flex-row justify-end gap-3">
                            <button onClick={closeModalAdjustQuantity}>
                                <span className="text-red-500 px-3 py-2 hover:bg-red-100 hover:rounded-md transition-all ease-linear duration-200">
                                    Hủy
                                </span>
                            </button>
                            <button onClick={() => handleAdjustQuantity()}>
                                <span className="text-white bg-blue-500 px-3 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-all ease-linear duration-200">
                                    Lưu
                                </span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            {modalHide && (
                <Modal isOpen={modalHide} onRequestClose={closeModalHide} style={customStyles}>
                    <div className="pb-4 text-lg font-semibold text-slate-700 flex flex-row items-center justify-between w-[300px]">
                        Xác nhận ẩn sản phẩm?
                    </div>
                    <div className="mt-8">
                        <div className="flex flex-row justify-end gap-3">
                            <button onClick={closeModalHide}>
                                <span className="text-red-500 px-3 py-2 hover:bg-red-100 hover:rounded-md transition-all ease-linear duration-200">
                                    Hủy
                                </span>
                            </button>
                            <button onClick={() => handleHide()}>
                                <span className="text-white bg-blue-500 px-3 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-all ease-linear duration-200">
                                    Xác nhận
                                </span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            {modalDisplay && (
                <Modal
                    isOpen={modalDisplay}
                    onRequestClose={closeModalDisplay}
                    style={customStyles}
                >
                    <div className="pb-4 text-lg font-semibold text-slate-700 flex flex-row items-center justify-between w-[300px]">
                        Xác nhận hiển thị sản phẩm?
                    </div>
                    <div className="mt-8">
                        <div className="flex flex-row justify-end gap-3">
                            <button onClick={closeModalDisplay}>
                                <span className="text-red-500 px-3 py-2 hover:bg-red-100 hover:rounded-md transition-all ease-linear duration-200">
                                    Hủy
                                </span>
                            </button>
                            <button onClick={() => handleDisplay()}>
                                <span className="text-white bg-blue-500 px-3 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-all ease-linear duration-200">
                                    Xác nhận
                                </span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="ml-3 h-[95vh]">
                <div class="py-5">
                    <h5 class="text-16 font-semibold">Product lists</h5>
                </div>
                <div className="bg-white mr-3 rounded-lg">
                    <div className="px-4 pt-5 grid grid-cols-12">
                        <div class="col-span-3">
                            <div class="relative">
                                <input
                                    type="text"
                                    className="py-2 px-8 block w-full rounded-md border text-sm border-slate-200 focus:outline-none focus:border-blue-500 
                                disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                    placeholder="Search for ..."
                                />
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
                                    data-lucide="search"
                                    className="inline-block size-4 absolute left-2.5 top-2.5 text-slate-500 fill-slate-100"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="col-span-2 col-start-11 text-right">
                            <button
                                className="inline-block rounded-md border px-4 py-2 text-center font-[15px] transition-all ease-linear duration-200 text-white btn 
                            bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:text-white 
                            focus:bg-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-100 active:text-white 
                        active:bg-blue-600 active:border-blue-600"
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
                                    data-lucide="plus"
                                    class="lucide lucide-plus inline-block size-4"
                                >
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5v14"></path>
                                </svg>
                                <span className="pl-2 align-middle">Thêm sản phẩm</span>
                            </button>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto px-4 py-5 h-[800px]">
                        <table class="w-full text-sm text-left rtl:text-right text dark:text-gray-400">
                            <thead class="text-xs text-gray-600 uppercase bg-gray-100 rounded-sm">
                                <tr>
                                    <th scope="col" className="px-3 py-3">
                                        Product Code
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Tên sản phẩm
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Brand
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Giá gốc
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Đã bán
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Hàng còn
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Sale
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Trạng thái
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProducts.map((product, index) => {
                                    return (
                                        <tr className="bg-white border-b">
                                            <th
                                                scope="row"
                                                className="px-3 py-4 font-medium text-blue-500 whitespace-nowrap"
                                            >
                                                #{product.code}
                                            </th>
                                            <td className="px-3 py-4">
                                                <div className="flex flex-row gap-3 items-center">
                                                    <div className="w-10 h-10">
                                                        <img src={product.img} alt={product.name} />
                                                    </div>
                                                    <span>{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-4">
                                                <div className="px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-purple-100 border-purple-200 text-purple-500">
                                                    {product.brand}
                                                </div>
                                            </td>
                                            <td className="px-3 py-4">
                                                <div className="px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-slate-100 border-slate-200 text-slate-500">
                                                    {product.category}
                                                </div>
                                            </td>
                                            <td className="px-3 py-4">
                                                {product.price.toLocaleString()}₫
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-row pl-2 items-center gap-2">
                                                    <span>{product.sold.total}</span>
                                                    <div className="relative">
                                                        <div
                                                            className="text-blue-500 cursor-pointer"
                                                            onMouseEnter={() => {
                                                                setDetails([index, 0]);
                                                            }}
                                                            onMouseLeave={() => {
                                                                if (details[2] === 2) return;
                                                                else setDetails([-1, -1]);
                                                            }}
                                                        >
                                                            <i className="fa-regular fa-eye fa-sm"></i>
                                                        </div>
                                                        {details[0] === index &&
                                                            details[1] === 0 && (
                                                                <div
                                                                    onMouseEnter={() => {
                                                                        setDetails([index, 0, 2]);
                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        setDetails([-1, -1]);
                                                                    }}
                                                                    className="absolute top-0 translate-y-5 -translate-x-[50%] z-50 w-20 bg-white rounded-md border px-2 border-gray-200 shadow-sm flex flex-col justify-center"
                                                                >
                                                                    {product.sold.details.map(
                                                                        (sq) => {
                                                                            return (
                                                                                <div className="flex flex-row gap-2 items-center px-2 py-2">
                                                                                    <span>
                                                                                        {sq.size}:
                                                                                    </span>
                                                                                    <span>
                                                                                        {
                                                                                            sq.quantity
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-row pl-2 items-center gap-2">
                                                    <span>{product.stock.total}</span>
                                                    <div className="relative">
                                                        <div
                                                            className="text-blue-500 cursor-pointer"
                                                            onMouseEnter={() => {
                                                                setDetails([index, 1]);
                                                            }}
                                                            onMouseLeave={() => {
                                                                if (details[2] === 2) return;
                                                                else setDetails([-1, -1]);
                                                            }}
                                                        >
                                                            <i className="fa-regular fa-eye fa-sm"></i>
                                                        </div>
                                                        {details[0] === index &&
                                                            details[1] === 1 && (
                                                                <div
                                                                    onMouseEnter={() =>
                                                                        setDetails([index, 1, 2])
                                                                    }
                                                                    onMouseLeave={() =>
                                                                        setDetails([-1, -1])
                                                                    }
                                                                    className="absolute top-0 translate-y-5 -translate-x-[50%] z-50 w-20 bg-white rounded-md border px-2 border-gray-200 shadow-sm flex flex-col justify-center"
                                                                >
                                                                    {product.stock.details.map(
                                                                        (sq) => {
                                                                            return (
                                                                                <div className="flex flex-row gap-2 items-center px-2 py-2">
                                                                                    <span>
                                                                                        {sq.size}:{" "}
                                                                                    </span>
                                                                                    <span>
                                                                                        {
                                                                                            sq.quantity
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pr-3 py-4 text-green-600 font-medium">
                                                <div className=" flex flex-row gap-x-2 items-center justify-center">
                                                    <span>{product.sale}%</span>
                                                    <i class="fa-regular fa-circle-right"></i>
                                                    <span>
                                                        {calculateSalePrice(
                                                            product.price,
                                                            product.sale
                                                        )}
                                                        ₫
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <span className={product.status[1]}>
                                                        {product.status[0]}
                                                    </span>
                                                </div>
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
                                                        <div className="absolute top-0 -left-1/2 translate-x-[25%] translate-y-[27px] w-min-[350px] z-50 bg-white rounded-md">
                                                            <ul className="border rounded-md shadow-md">
                                                                <li
                                                                    onClick={() => {
                                                                        navigate("/product");
                                                                        dispatch(
                                                                            setPCodeDisplay(
                                                                                product.code
                                                                            )
                                                                        );
                                                                    }}
                                                                    className="flex flex-row gap-3 items-center px-2 py-2 hover:bg-gray-200 cursor-pointer"
                                                                >
                                                                    <i class="fa-regular fa-eye fa-sm"></i>
                                                                    <span>Xem chi tiết</span>
                                                                </li>

                                                                <li
                                                                    onClick={() => {
                                                                        setDropAction(-1);
                                                                        openModalAdjustPrice(index);
                                                                    }}
                                                                    className="flex flex-row gap-3 items-center px-2 py-2 hover:bg-gray-200 cursor-pointer"
                                                                >
                                                                    <i class="fa-solid fa-hand-holding-dollar"></i>
                                                                    <span>Chỉnh giá</span>
                                                                </li>
                                                                <li
                                                                    onClick={() => {
                                                                        setDropAction(-1);
                                                                        openModalAdjustQuantity(
                                                                            index
                                                                        );
                                                                    }}
                                                                    className="flex flex-row gap-3 items-center px-2 py-2 hover:bg-gray-200 cursor-pointer"
                                                                >
                                                                    <i class="fa-regular fa-pen-to-square fa-sm"></i>
                                                                    <span>Thay đổi số lượng</span>
                                                                </li>
                                                                <li
                                                                    onClick={() => {
                                                                        setDropAction(-1);
                                                                        if (
                                                                            product.status[0] ===
                                                                            "Hiển thị"
                                                                        ) {
                                                                            openModalHide(index);
                                                                        } else {
                                                                            openModalDisplay(index);
                                                                        }
                                                                    }}
                                                                    className="flex flex-row gap-3 items-center px-2 py-2 hover:bg-gray-200 cursor-pointer"
                                                                >
                                                                    <i class="fa-regular fa-eye-slash"></i>
                                                                    {product.status[0] ===
                                                                    "Hiển thị" ? (
                                                                        <span>Ẩn</span>
                                                                    ) : (
                                                                        <span>Hiển thị</span>
                                                                    )}
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
export default ViewProduct;
