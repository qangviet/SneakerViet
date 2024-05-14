import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoadding } from "../../Redux/appSlice";
import Modal from "react-modal";
import { toast } from "react-toastify";
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
const ViewBrand = () => {
    const dispatch = useDispatch();

    const [listBrands, setListBrands] = useState([]);
    const [change, setChange] = useState(0);

    useEffect(() => {
        const getListBrands = async () => {
            dispatch(setLoadding(true));
            await axios.get("http://localhost:8088/api/admin/get-brands").then((res) => {
                if (res.data.EC === "0") {
                    for (const brand of res.data.DT) {
                        let cates = [];
                        let categories = JSON.parse(brand.categories);
                        for (const cate of categories) {
                            cates.push(cate);
                        }
                        brand.categories = cates;
                    }
                    setListBrands(res.data.DT);
                } else {
                    alert(res.data.EM);
                }
            });
            dispatch(setLoadding(false));
        };
        getListBrands();
    }, [change]);

    const [modalNewBrand, setModalNewBrand] = useState(false);
    const [newBrand, setNewBrand] = useState("");
    const openModalNewBrand = () => {
        setModalNewBrand(true);
    };
    const closeModalNewBrand = () => {
        setModalNewBrand(false);
        setNewBrand("");
    };
    const handleAddBrand = async () => {
        if (!newBrand === "") {
            alert("Vui lòng nhập tên brand");
            return;
        }
        for (const brand of listBrands) {
            if (brand.name === newBrand) {
                alert("Brand đã tồn tại");
                return;
            }
        }
        let res = await axios.post("http://localhost:8088/api/admin/add-brand", { name: newBrand });
        if (res.data.EC === "0") {
            setChange(change + 1);
            closeModalNewBrand();
            toast.success("Thêm brand thành công!");
        } else {
            alert(res.data.EM);
        }
    };

    return (
        <>
            <Modal isOpen={modalNewBrand} onRequestClose={closeModalNewBrand} style={customStyles}>
                <div className="pb-4 text-lg font-semibold text-slate-700 flex flex-row items-center justify-between">
                    <span>Thêm Brand</span>
                    <div
                        className="text-gray-500 text-sm hover:text-red-500 cursor-pointer"
                        onClick={closeModalNewBrand}
                    >
                        <i className="fa-solid fa-x"></i>
                    </div>
                </div>
                <div className="border-t border-gray-300 py-2"></div>
                <div className="w-[500px] grid grid-cols-2 gap-5 text-gray-500 font-normal">
                    <div className="col-span-2">
                        <label className="inline-block mb-2 text-base">Tên Brand</label>
                        <input
                            type="text"
                            className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                            value={newBrand}
                            onChange={(e) => setNewBrand(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex flex-row justify-end gap-3">
                        <button onClick={closeModalNewBrand}>
                            <span className="text-red-500 px-3 py-2 hover:bg-red-100 hover:rounded-md transition-all ease-linear duration-200">
                                Hủy
                            </span>
                        </button>
                        <button onClick={() => handleAddBrand()}>
                            <span className="text-white bg-blue-500 px-3 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-all ease-linear duration-200">
                                Lưu
                            </span>
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="ml-3 h-[100vh]">
                <div class="py-5">
                    <h5 class="text-16 font-semibold">Brand lists</h5>
                </div>
                <div className="bg-white mr-3 rounded-lg">
                    <div className="px-4 pt-5 grid grid-cols-12">
                        <div className="col-span-2 col-start-11 text-right">
                            <button
                                onClick={openModalNewBrand}
                                className="inline-block rounded-md border px-4 py-2 text-center text-sm transition-all ease-linear duration-200 text-white btn 
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
                                <span className="pl-2 align-middle">Thêm Brand</span>
                            </button>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto px-4 py-5 h-[800px]">
                        <table class="w-full text-sm text-left rtl:text-right text">
                            <thead class="text-xs text-gray-600 uppercase bg-gray-100 rounded-sm">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Tên Brand
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Categories
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Số lượng sản phẩm
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listBrands.map((brand, index) => {
                                    return (
                                        <tr className="bg-white border-b">
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap dark:text-white"
                                            >
                                                #{brand.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-row items-center gap-3 flex-wrap ">
                                                    {brand.categories.map((cate, index) => {
                                                        return (
                                                            <div className="px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-slate-100 border-slate-200 text-slate-500">
                                                                {cate}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center items-center">
                                                    {brand.count}
                                                </div>
                                            </td>
                                            <td className="pl-9 w-40 py-2 ">
                                                <div className="relative">
                                                    <button className={action_hover}>
                                                        <i className="fa-solid fa-ellipsis fa-sm"></i>
                                                    </button>
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
export default ViewBrand;
