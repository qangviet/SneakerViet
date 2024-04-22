import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeatureProduct = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    // const [code, setCode] = useContext(GlobalContext);

    useEffect(() => {
        function calculateSalePrice(price, discount) {
            const discountedPrice = price * (1 - discount / 100);
            const roundedPrice = Math.round(discountedPrice / 10000) * 10000;
            return roundedPrice;
        }

        const getProducts = async () => {
            const res = await axios.post("http://localhost:8088/api/get-products", {
                type: "for-card",
            });
            if (res.data.EC === "0") {
                let data = res.data.DT;
                for (const d of data) {
                    const imageUrl = `data:image/jpg;base64,${d.image}`;
                    d.image = imageUrl;
                    d.priceSale = calculateSalePrice(d.price, d.discount);
                }
                setProducts(res.data.DT);
            } else {
                alert(res.data.EM);
            }
        };
        getProducts();
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

    const loadDetailProduct = (index) => {
        navigate("/product", { state: { pCode: products[index].code } });
    };

    return (
        <div className="lg:w-[85%] w-[95%] mx-auto mb-24">
            <div className="grid lg:grid-cols-4 gap-5 grid-cols-2">
                {products.map((product, index) => {
                    return (
                        <div className="product-card w-[80%]">
                            <div
                                className="w-full hover:bg-slate-800 hover:bg-opacity-85 hover:transition-all
                            hover:ease-in-out hover:duration-500 hover:cursor-pointer relative group"
                                onClick={() => loadDetailProduct(index)}
                            >
                                <img
                                    src={product.image}
                                    className="hover:opacity-85 hover:transition-all hover:ease-in hover:duration-300"
                                />
                                <a>
                                    <div className="">
                                        <div className="absolute bg-red-500 py-1 px-2 top-2 right-2 text-[12px] text-center font-semibold text-white rounded-xl">
                                            -{product.discount}%
                                        </div>
                                        {/* <div
                                            className="absolute w-[80%] text-center left-1/2 -translate-x-1/2 bottom-2 bg-slate-400 uppercase text-sm
                                tracking-wider px-3 py-2 hidden group-hover:block hover:bg-opacity-90 group-hover:animate-fadeIn shadow-3xl"
                                        >
                                            Thêm vào giỏ
                                        </div> */}
                                    </div>
                                </a>
                            </div>
                            <div className="text-center mt-4">
                                <Link onClick={() => loadDetailProduct(index)}>
                                    <div>{product.name}</div>
                                </Link>
                                <div
                                    className="font-bold"
                                    style={{ fontFamily: "Quicksand, sans-serif" }}
                                >
                                    {product.discount === 0 ? (
                                        <span className="text-sm text-red-500">
                                            {addCommas(product.price)}₫
                                        </span>
                                    ) : (
                                        <>
                                            <span className="text-sm text-red-500">
                                                {addCommas(product.priceSale)}₫
                                            </span>
                                            <span className="ml-2 text-[12px] text-gray-400 line-through">
                                                {addCommas(product.price)}₫
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FeatureProduct;
