import React, { useEffect } from "react";
import Header from "../HomePage/Header/header";
import { useState } from "react";
import { setPath3D } from "../Redux/productSlice";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LoaddingSpiner from "../Loadding/loadding";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart, openCart, setLoadding } from "../Redux/cartSlice";
import Display3D from "../Model3D/display3D";
import { toast } from "react-toastify";
const size_g_hover =
    "border-x-[0.5px] border-y-[0.5px] font-medium px-4 py-1 hover:bg-slate-800 hover:bg-opacity-90 hover:text-white hover:cursor-pointer hover:transition-all hover:ease-in-out hover:duration-100";
const size_g_active =
    "border-x-[0.5px] border-y-[0.5px] font-medium px-4 py-1 bg-slate-800 text-white cursor-pointer";

const ProductPage = () => {
    const navigate = useNavigate();
    const pCode = useSelector((state) => state.product.pCodeDisplay);

    const [activeImage, setActiveImage] = useState(0);
    const [activeSize, setActiveSize] = useState(-1);
    const [quantity, setQuantity] = useState(0);

    const [productInfo, setProductInfo] = useState({});

    const [images, setImages] = useState([]);

    const [colors, setColors] = useState({});

    const [colorChoose, setColorChoose] = useState("");

    const [loadding, setLoading] = useState(false);

    useEffect(() => {
        function calculateSalePrice(price, discount) {
            const discountedPrice = price * (1 - discount / 100);
            const roundedPrice = Math.round(discountedPrice / 10000) * 10000;
            return roundedPrice;
        }
        const LoadProductDetail = async () => {
            setLoading(true);

            const res = await axios.post("http://localhost:8088/api/get-products", {
                type: "detail",
                code: pCode,
            });
            if (res.data.EC === "0") {
                let data = res.data.DT;
                setColors(JSON.parse(data.color));
                delete data.color;
                let imgs = [];
                for (let i = 0; i < data.images.length; i++) {
                    const imageUrl = `data:image/jpg;base64,${data.images[i]}`;
                    imgs.push(imageUrl);
                }
                setImages(imgs);
                delete data.images;
                data.priceSale = calculateSalePrice(data.price, data.discount);
                setProductInfo(data);
            } else {
                alert(res.data.EM);
            }
            setLoading(false);
        };
        LoadProductDetail();
    }, []);

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

    const handleCart = () => {
        if (!colorChoose || activeSize < 0 || quantity < 1) {
            alert("Vui lòng chọn màu sắc, size và số lượng sản phẩm!");
            return;
        }
        dispatch(setLoadding(true));
        dispatch(openCart());
        let product = {
            name: productInfo.name,
            image: images[0],
            size: colors.size_quan[activeSize].size,
            color: colorChoose,
            quantity: quantity,
            price: productInfo.priceSale,
            maxquan: colors.size_quan[activeSize].quantity,
        };
        dispatch(addtoCart(product));
        dispatch(setLoadding(false));
    };
    const handleBuy = () => {
        if (!colorChoose || activeSize < 0 || quantity < 1) {
            alert("Vui lòng chọn màu sắc, size và số lượng sản phẩm!");
            return;
        }
        dispatch(setLoadding(true));
        let product = {
            name: productInfo.name,
            image: images[0],
            size: colors.size_quan[activeSize].size,
            color: colorChoose,
            quantity: quantity,
            price: productInfo.priceSale,
            maxquan: colors.size_quan[activeSize].quantity,
        };
        dispatch(addtoCart(product));
        dispatch(setLoadding(false));
        navigate("/checkout");
    };

    const [isDisplay3D, setIsDisplay3D] = useState(false);

    const handleLoad3D = () => {
        // dispatch(setPath3D(`http://localhost:8088/api/download-model3d/${pCode}`));
        // navigate("/3d");
        setIsDisplay3D(true);
        setActiveImage(-1);
    };
    return (
        <>
            {loadding ? (
                <div className="flex justify-center items-center w-full h-[100vh]">
                    <LoaddingSpiner />
                </div>
            ) : (
                <div className="">
                    <div className="max-w-screen-2xl text-base mx-auto">
                        <Header />
                    </div>
                    <div className="py-[0.5px] bg-slate-400 bg-opacity-35 shadow-slate-500"></div>
                    <div className="py-4 ml-32"> </div>
                    <div className="flex justify-center">
                        <div className="main-contents 2xl:[1300px] xl:w-[1200px] lg:w-[1000px] flex flex-row">
                            <div className="product-gallery basis-[60%] flex flex-row">
                                <div className="thumbs-container basis-[9%] mr-6">
                                    {images.map((image, index) => {
                                        return (
                                            <div
                                                className={
                                                    activeImage === index
                                                        ? "tqv-thumb tqv-thumb-active"
                                                        : "tqv-thumb tqv-thumb-hover"
                                                }
                                                onClick={() => {
                                                    setActiveImage(index);
                                                    setIsDisplay3D(false);
                                                }}
                                            >
                                                <img src={image} />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="image-view basis-[91%]">
                                    {isDisplay3D ? (
                                        <div className="w-full h-[93%] flex justify-center items-center bg-gray-700 bg-opacity-70">
                                            <Display3D
                                                type="path"
                                                pathFile={`http://localhost:8088/api/download-model3d/${pCode}`}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <img src={images[activeImage]} />
                                        </div>
                                    )}

                                    <div className="flex justify-center text-xl py-2">
                                        <button
                                            className="text-sky-500 underline"
                                            onClick={handleLoad3D}
                                        >
                                            Xem giày dạng 3D
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="product-choice basis-[40%] ml-8 font-Quicksand">
                                <div>
                                    <span className="font-bold">{productInfo.name}</span>
                                </div>
                                <div className="py-[0.5px] bg-gray-400 bg-opacity-50 shadow-slate-500 my-4"></div>
                                <div className="flex flex-row items-center gap-4 ">
                                    <div className="px-4 py-1 bg-gray-400 bg-opacity-20 font-bold text-red-500 text-center text-sm">
                                        {productInfo.discount}%
                                    </div>
                                    <div className="text-xl font-bold ">
                                        {addCommas(productInfo.priceSale)}₫
                                    </div>
                                    {productInfo.discount > 0 && (
                                        <div className="text-[14px] line-through text-gray-400">
                                            {addCommas(productInfo.price)}₫
                                        </div>
                                    )}
                                </div>
                                <div className="py-[0.5px] bg-gray-400 bg-opacity-50 shadow-slate-500 my-4"></div>
                                <div>
                                    <div className="mb-3">Màu sắc</div>
                                    <div className="flex flex-row flex-wrap gap-3 text-sm">
                                        <div
                                            className={
                                                colorChoose === colors.name
                                                    ? size_g_active
                                                    : size_g_hover
                                            }
                                            onClick={() => setColorChoose(colors.name)}
                                        >
                                            {colors.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="py-[0.5px] bg-gray-400 bg-opacity-50 shadow-slate-500 my-4"></div>
                                <div>
                                    <div className="mb-3">Size</div>
                                    <div className="flex flex-row flex-wrap gap-3 text-sm">
                                        {colors.size_quan &&
                                            colors.size_quan.map((sq, index) => {
                                                return (
                                                    <div
                                                        className={
                                                            activeSize === index
                                                                ? size_g_active
                                                                : size_g_hover
                                                        }
                                                        onClick={() => {
                                                            setActiveSize(index);
                                                            setQuantity(1);
                                                        }}
                                                    >
                                                        {sq.size}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    <div className="py-[0.5px] bg-gray-400 bg-opacity-50 shadow-slate-500 my-4"></div>
                                    <div>
                                        <div className="flex flex-row items-center">
                                            <div
                                                onClick={() => {
                                                    if (quantity > 1)
                                                        setQuantity((prev) => prev - 1);
                                                }}
                                                className="bg-gray-700 bg-opacity-5 hover:bg-gray-300 hover:bg-opacity-25 hover:rounded-3xl cursor-pointer w-8 h-8 flex justify-center items-center"
                                            >
                                                <div className=" cursor-pointer">
                                                    <i className="fa-solid fa-minus fa-xs px-1"></i>
                                                </div>
                                            </div>
                                            <div className="border-x border-y w-20 h-8 text-center font-semibold flex justify-center items-center">
                                                <span>{quantity > 0 ? quantity : ""}</span>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    if (!colorChoose || activeSize < 0) return;
                                                    setQuantity((prev) => {
                                                        if (
                                                            prev >=
                                                            colors.size_quan[activeSize].quantity
                                                        )
                                                            return prev;
                                                        else return prev + 1;
                                                    });
                                                }}
                                                className="bg-gray-700 bg-opacity-5 hover:bg-gray-300 hover:bg-opacity-25 hover:rounded-3xl cursor-pointer w-8 h-8 flex justify-center items-center"
                                            >
                                                <div className=" cursor-pointer">
                                                    <i className="fa-solid fa-plus fa-xs px-1"></i>
                                                </div>
                                            </div>
                                            <div className="px-3">
                                                <span className="px-1 font-semibold">
                                                    {activeSize >= 0
                                                        ? colors.size_quan[activeSize].quantity
                                                        : "..."}
                                                </span>
                                                <span>Sản phẩm sẵn có</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex flex-row justify-start gap-3">
                                        <button
                                            className="basis-1/2 bg-black mr-5 text-white font-semibold text-sm py-3 px-5"
                                            onClick={handleCart}
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                        <button
                                            className="basis-1/2 bg-red-600 ml-5 text-white font-semibold text-sm py-3 px-5"
                                            onClick={handleBuy}
                                        >
                                            Mua ngay
                                        </button>
                                    </div>
                                    <div class="mt-5">
                                        <h2 className="underline font-bold">Mô tả</h2>
                                        <p>
                                            <strong>✅&nbsp;Hàng chính hãng có sẵn</strong>
                                        </p>
                                        <p>
                                            <strong>
                                                ✅&nbsp;Bảo hành&nbsp;sản phẩm chính hãng trọn đời.
                                            </strong>
                                        </p>
                                        <p>
                                            <strong>
                                                ✅&nbsp;Giao hàng Toàn Quốc. Double Box&nbsp; khi
                                                giao hàng các tỉnh.
                                            </strong>
                                        </p>
                                        <p>
                                            <strong>✅&nbsp;Thanh Toán khi nhận hàng.</strong>
                                        </p>
                                        <p>
                                            <strong>
                                                ✅&nbsp;Bảo hành keo&nbsp; trọn đời sản phẩm
                                            </strong>
                                        </p>
                                        <p>
                                            <strong>
                                                ✅&nbsp;Giao hàng Nhanh 60p tại Hà Nội, Sài Gòn
                                            </strong>
                                        </p>
                                        <p>
                                            <strong>
                                                ✅ Gói Qùa + Thiệp miễn phí và nhiều quà TẶNG.
                                            </strong>
                                        </p>
                                        <p>
                                            <strong>
                                                ⭐ ⭐ ⭐ &nbsp;Mong muốn đem đến những dịch vụ tốt
                                                nhất cho KHÁCH HÀNG.
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="description flex justify-center">
                        <div>
                            <h1 className="text-2xl font-bold">Thông tin chi tiết</h1>
                        </div>
                    </div> */}
                </div>
            )}
        </>
    );
};

export default ProductPage;
