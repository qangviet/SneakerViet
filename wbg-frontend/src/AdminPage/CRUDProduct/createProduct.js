import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import LoaddingSpiner from "../../Loadding/loadding";
import Display3D from "../../Model3D/display3D";
import { useDispatch } from "react-redux";
import { setLoadding } from "../../Redux/appSlice";
const CreateProduct = () => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const getBrands = async () => {
            dispatch(setLoadding(true));
            await fetch("http://localhost:8088/api/get-brands", {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.EC === "0") {
                        setCategories(data.DT.categories);
                        setBrands(data.DT.brands);
                        dispatch(setLoadding(false));
                    } else alert(data.EM);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getBrands();
    }, []);

    const [countColor, setCountColor] = useState([
        {
            name: "",
            size_quan: [
                {
                    size: 0,
                    quantity: 0,
                },
            ],
        },
    ]);

    const addSize = (index) => {
        setCountColor((prev) => {
            prev[index].size_quan.push({
                size: 0,
                quantity: 0,
            });
            return [...prev];
        });
    };

    const deleteSize = (index, index2) => {
        setCountColor((prev) => {
            prev[index].size_quan.splice(index2, 1);
            return [...prev];
        });
    };

    const addColor = () => {
        setCountColor((prev) => {
            prev.push({
                name: "",
                size_quan: [
                    {
                        size: 1,
                        quantity: 1,
                    },
                ],
            });
            return [...prev];
        });
    };

    const deleteColor = (index) => {
        setCountColor((prev) => {
            prev.splice(index, 1);
            return [...prev];
        });
    };

    const [images, setImages] = useState([]);

    const fileInputRef = useRef(null);

    const handleDropImage = (e) => {
        dispatch(setLoadding(true));
        e.preventDefault();
        const imageFile = e.dataTransfer.files[0];

        if (imageFile.type.startsWith("image/")) {
            const name = e.dataTransfer.files[0].name;
            const imageURL = URL.createObjectURL(imageFile);
            const dt = { name: name, url: imageURL, file: imageFile };
            setImages((prev) => [...prev, dt]);
        }
        dispatch(setLoadding(false));
    };

    const handleChooseImage = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile.type.startsWith("image/")) {
            const name = e.target.files[0].name;
            const imageURL = URL.createObjectURL(imageFile);
            const dt = { name: name, url: imageURL, file: imageFile };
            setImages((prev) => [...prev, dt]);
        }
    };

    const deleteImage = (index) => {
        URL.revokeObjectURL(images[index].url);
        const newImages = images.filter((image, i) => i !== index);
        setImages(newImages);
    };

    useEffect(() => {
        return () => {
            for (const image of images) {
                URL.revokeObjectURL(image.url);
            }
        };
    }, []);

    const [productTag, setProductTag] = useState([]);
    const [currentTag, setCurrentTag] = useState("");
    const handleAddTag = (e) => {
        if (currentTag === "") {
            if (e.keyCode === 8) {
                setProductTag((prev) => {
                    prev.pop();
                    return [...prev];
                });
            }
        } else {
            if (e.keyCode === 13) {
                setCurrentTag("");
                setProductTag((prev) => {
                    prev.push(currentTag);
                    return [...prev];
                });
            }
        }
    };

    const [countCode, setCountCode] = useState({});

    const genProductCode = () => {
        let currentDate = new Date();
        let day = String(currentDate.getDate()).padStart(2, "0");
        let month = String(currentDate.getMonth() + 1).padStart(2, "0");
        let year = String(currentDate.getFullYear()).slice(-2);
        let formattedDate = day + month + year;
        let count = localStorage.getItem("qv-product-count");
        if (!count) {
            count = {
                c: 1,
                date: new Date().toDateString(),
            };
        } else {
            count = JSON.parse(count);
            if (currentDate.toDateString() !== count.date) {
                count = {
                    c: 1,
                    date: currentDate.toDateString(),
                };
            }
        }
        setCountCode(count);
        let id = "SSV" + String(count.c).padStart(3, "0") + formattedDate;
        return id;
    };

    useEffect(() => {
        setPcode(genProductCode());
    }, []);

    function convertByteToMegabyte(byte) {
        const megabyte = byte / (1024 * 1024);
        const roundedMegabyte = Math.round(megabyte * 100) / 100;
        return roundedMegabyte;
    }

    const input3DRef = useRef(null);
    const [file3DName, setFile3DName] = useState([]);
    const [file3DData, setFile3DData] = useState("");
    const handleChoose3DModel = () => {
        const file3D = input3DRef.current.files[0];
        setModel3D(file3D);
        if (!file3D) {
            alert("Vui lòng chọn file 3D model");
            return;
        }
        let cap = convertByteToMegabyte(file3D.size);
        setFile3DName([file3D.name, cap]);
        if (file3D) {
            const reader = new FileReader();
            reader.onload = () => {
                setFile3DData(reader.result);
            };
            reader.readAsDataURL(file3D);
        }
    };

    const [pname, setPname] = useState("");
    const [pcode, setPcode] = useState("");
    const [pbrand, setPbrand] = useState("");
    const [pcategory, setPcategory] = useState("");
    const [pgender, setPgender] = useState("");
    const [pprice, setPprice] = useState();
    const [pdiscount, setPdiscount] = useState();
    const [pvisibility, setPvisibility] = useState("");
    const [model3D, setModel3D] = useState({});

    const resetValue = () => {
        setPname("");
        setPbrand("");
        setPcategory("");
        setPgender("");
        setPprice("");
        setPdiscount("");
        setPvisibility("");
        setCountColor([
            {
                name: "",
                size_quan: [
                    {
                        size: 0,
                        quantity: 0,
                    },
                ],
            },
        ]);
        setImages([]);
        setProductTag([]);
        for (const image of images) {
            URL.revokeObjectURL(image.url);
        }
        setPcode(genProductCode());
        setModel3D({});
        setFile3DData("");
        setFile3DName([]);
    };

    const handleCreateProduct = async () => {
        if (!pname) {
            alert("Vui lòng nhập tên!");
            return;
        }
        if (!pbrand) {
            alert("Vui lòng chọn brand!");
            return;
        }
        if (!pcategory) {
            alert("Vui lòng chọn category!");
            return;
        }
        if (!pgender) {
            alert("Vui lòng chọn gender!");
            return;
        }
        if (!pprice) {
            alert("Vui lòng nhập giá!");
            return;
        }
        if (images.length === 0) {
            alert("Vui lòng thêm ảnh!");
            return;
        }
        if (!model3D) {
            alert("Vui lòng thêm model 3D!");
            return;
        }
        dispatch(setLoadding(true));
        for (const color of countColor) {
            if (color.name === "") {
                countColor.splice(countColor.indexOf(color), 1);
            }
            for (const size of color.size_quan) {
                if (size.size === 0) {
                    color.size_quan.splice(color.size_quan.indexOf(size), 1);
                }
            }
        }
        const formData = new FormData();

        formData.append("pname", pname);
        formData.append("pcode", pcode);
        formData.append("pbrand", pbrand);
        formData.append("pcategory", pcategory);
        formData.append("pgender", pgender);
        formData.append("pprice", pprice.toString());
        formData.append("pdiscount", pdiscount.toString());
        formData.append("pvisibility", pvisibility);
        formData.append("ptag", JSON.stringify(productTag));

        for (const color of countColor) {
            formData.append("colors", JSON.stringify(color));
        }

        for (const image of images) {
            formData.append("images", image.file);
        }
        formData.append("model3D", model3D);

        console.log(formData);

        setLoadding(true);

        await fetch("http://localhost:8088/api/add-product", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.EC === "0") {
                    alert("Thêm sản phẩm thành công");
                    countCode.c++;
                    localStorage.setItem("qv-product-count", JSON.stringify(countCode));
                    resetValue();
                    dispatch(setLoadding(false));
                } else {
                    alert(data.EM);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="ml-3">
            <div class="grow py-5">
                <h5 class="text-16 font-semibold">Add New</h5>
            </div>
            <div className="bg-white mr-5 rounded-md border-x-0 border-y-0 border-transparent">
                <div className="p-5">
                    <h6 class="mb-4 text-lg">Create product</h6>
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12">
                        <div className="xl:col-span-6">
                            <label className="inline-block mb-2 text-base font-medium">
                                Product Name
                            </label>
                            <input
                                type="text"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                placeholder="Product Name"
                                value={pname}
                                onChange={(e) => setPname(e.target.value)}
                                required
                            ></input>
                            <p class="mt-1 text-sm text-slate-400 ">
                                Do not exceed 20 characters when entering the product name.
                            </p>
                        </div>
                        <div className="xl:col-span-6">
                            <label className="inline-block mb-2 text-base font-medium">Code</label>
                            <input
                                type="text"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                placeholder="Product Code"
                                required
                                value={pcode}
                                disabled
                            ></input>
                            <p class="mt-1 text-sm text-slate-400 ">
                                Code will be generated automatically.
                            </p>
                        </div>
                        <div className="xl:col-span-4">
                            <label className="inline-block mb-2 text-base font-medium">Brand</label>
                            <select
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                placeholder="Brand"
                                required
                                value={pbrand}
                                onChange={(e) => setPbrand(e.target.value)}
                            >
                                <option value="">Chọn Brand</option>
                                {brands.map((brand, index) => {
                                    return (
                                        <option value={brand.name} key={brand.name}>
                                            {brand.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="xl:col-span-4">
                            <label className="inline-block mb-2 text-base font-medium">
                                Category
                            </label>
                            <select
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                placeholder="Category"
                                required
                                value={pcategory}
                                onChange={(e) => setPcategory(e.target.value)}
                            >
                                <option value="">Chọn Category</option>

                                {pbrand !== ""
                                    ? brands[
                                          brands.findIndex((item) => item.name === pbrand)
                                      ].cates.map((cate, index) => {
                                          return (
                                              <option value={cate} key={index + cate}>
                                                  {cate}
                                              </option>
                                          );
                                      })
                                    : categories.map((cate, index) => {
                                          return (
                                              <option value={cate} key={cate}>
                                                  {cate}
                                              </option>
                                          );
                                      })}
                            </select>
                        </div>
                        <div className="xl:col-span-4">
                            <label className="inline-block mb-2 text-base font-medium">
                                Gender
                            </label>
                            <select
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                              disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                placeholder="Product Code"
                                value={pgender}
                                onChange={(e) => setPgender(e.target.value)}
                                required
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </div>
                        {countColor &&
                            countColor.map((color, index) => {
                                return (
                                    <div className="xl:col-span-12">
                                        <div className="flex flex-row justify-between items-center">
                                            <label className="inline-block mb-2 text-base font-medium">
                                                Color
                                            </label>
                                            {index > 0 && (
                                                <div
                                                    className="px-2"
                                                    onClick={() => deleteColor(index)}
                                                >
                                                    <div className="flex justify-center flex-col text-red-400 cursor-pointer items-center h-full">
                                                        <i class="fa-solid fa-trash"></i>
                                                        <div className="border mt-1 border-gray-500 w-[16px]"></div>
                                                    </div>
                                                </div>
                                            )}
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
                                                        value={color.name}
                                                        onChange={(e) =>
                                                            setCountColor((prev) => {
                                                                prev[index].name = e.target.value;
                                                                return [...prev];
                                                            })
                                                        }
                                                    ></input>
                                                </div>
                                                <div className="basis-[80%] grid grid-cols-3">
                                                    {color.size_quan.map((size_quan, index2) => {
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
                                                                        onChange={(e) =>
                                                                            setCountColor(
                                                                                (prev) => {
                                                                                    prev[
                                                                                        index
                                                                                    ].size_quan[
                                                                                        index2
                                                                                    ].size =
                                                                                        e.target.value;
                                                                                    return [
                                                                                        ...prev,
                                                                                    ];
                                                                                }
                                                                            )
                                                                        }
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
                                                                        onChange={(e) =>
                                                                            setCountColor(
                                                                                (prev) => {
                                                                                    prev[
                                                                                        index
                                                                                    ].size_quan[
                                                                                        index2
                                                                                    ].quantity =
                                                                                        e.target.value;
                                                                                    return [
                                                                                        ...prev,
                                                                                    ];
                                                                                }
                                                                            )
                                                                        }
                                                                        value={size_quan.quantity}
                                                                    ></input>
                                                                </div>
                                                                {index2 > 0 ? (
                                                                    <div
                                                                        className="pl-3 pr-7 mt-8"
                                                                        onClick={() =>
                                                                            deleteSize(
                                                                                index,
                                                                                index2
                                                                            )
                                                                        }
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
                                                    onClick={() => addSize(index)}
                                                >
                                                    <div className="px-3 flex justify-center items-center">
                                                        <i class="fa-solid fa-plus"></i>
                                                    </div>
                                                    <button className="text-sm font-medium">
                                                        Add Size
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        <div className="flex flex-row col-span-12 justify-center items-center">
                            <div
                                className="border-slate-200 rounded-md border-[1px] px-2 py-2 flex flex-row hover:border-blue-500 cursor-pointer"
                                onClick={addColor}
                            >
                                <div className="px-3 flex justify-center items-center">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                                <button className="text-[15px] font-medium">Add Color</button>
                            </div>
                        </div>
                        <div className="xl:col-span-12 lg:col-span-2">
                            <label className="inline-block mb-2 text-base font-medium">
                                Product Images
                            </label>
                            <div
                                className="flex items-center justify-center bg-white border border-dashed
                                rounded-md cursor-pointer dropzone border-slate-300 min-h-[200px]"
                                onDrop={(e) => {
                                    handleDropImage(e);
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                }}
                                onClick={() => {
                                    fileInputRef.current.click();
                                }}
                            >
                                <input
                                    ref={fileInputRef}
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleChooseImage(e)}
                                />
                                <div class="w-full py-5 text-lg text-center">
                                    <div class="mb-3">
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
                                            data-lucide="upload-cloud"
                                            class="lucide lucide-upload-cloud block mx-auto size-12 text-slate-500 fill-slate-200 dark:text-zink-200 dark:fill-zink-500"
                                        >
                                            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                                            <path d="M12 12v9"></path>
                                            <path d="m16 16-4-4-4 4"></path>
                                        </svg>
                                    </div>
                                    <h5 class="mb-0 font-normal text-slate-500 text-[15px]">
                                        Drag and drop your product images or browse your product
                                        images
                                    </h5>
                                </div>
                            </div>
                            <ul className="flex flex-wrap mb-0 gap-x-5">
                                {images &&
                                    images.map((image, index) => {
                                        return (
                                            <li className="mt-5">
                                                <div className="border rounded border-slate-200">
                                                    <div className="p-2 text-center">
                                                        <div>
                                                            <div className="p-2 mx-auto rounded-md size-14 bg-slate-100">
                                                                <img
                                                                    className="block w-full h-full rounded-md"
                                                                    src={image.url}
                                                                    alt={image.name}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="pt-3">
                                                            <h5 className="mb-1 text-[15px]">
                                                                {image.name}
                                                            </h5>
                                                            <p class="mb-0 text-slate-500 text-sm">
                                                                <strong>
                                                                    {Math.round(
                                                                        image.file.size / 100
                                                                    ) / 10}
                                                                </strong>{" "}
                                                                KB
                                                            </p>
                                                            <strong className="error text-danger"></strong>
                                                        </div>
                                                        <div class="mt-2">
                                                            <button
                                                                className="px-2 py-1.5 text-xs rounded-md text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white
                                                            focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100"
                                                                onClick={() => deleteImage(index)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                        <div className="col-span-12">
                            <label className="inline-block mb-2 text-base font-medium">
                                Product Model 3D
                            </label>
                            <div className="w-full h-[700px] border border-slate-300 bg-white border-dashed rounded-md relative">
                                {file3DName.length > 0 && (
                                    <div className="absolute top-0 py-4 left-1/2 -translate-x-[50%] text-[15px] text-gray-200">
                                        <span className="px-2">{file3DName[0]}</span>
                                        <span className="font-bold">{file3DName[1]} </span>
                                        <span>MB</span>
                                    </div>
                                )}
                                {file3DName.length > 0 ? (
                                    <div className="bg-gray-700 bg-opacity-65 h-full">
                                        <Display3D fileData={file3DData} type={"data"}></Display3D>
                                    </div>
                                ) : (
                                    <div className="flex justify-center gap-3 items-center h-full flex-col py-5 text-lg text-center">
                                        <div className="text-slate-500">
                                            <i class="fa-solid fa-cubes fa-4x"></i>
                                        </div>
                                        <h5 class="mb-0 font-normal text-slate-500 text-[15px]">
                                            Display 3D model of your product
                                        </h5>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center items-center px-3 py-4">
                                <input
                                    type="file"
                                    accept=".glb, .gltf"
                                    hidden
                                    ref={input3DRef}
                                    onChange={() => handleChoose3DModel()}
                                />
                                <button
                                    className="bg-blue-400 px-3 py-3 rounded-md cursor-pointer text-white hover:bg-blue-600"
                                    onClick={() => input3DRef.current.click()}
                                >
                                    <span>
                                        Upload 3D Model <i class="fa-solid fa-upload"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="xl:col-span-4 ">
                            <label className="inline-block mb-2 text-base font-medium">Price</label>
                            <input
                                type="number"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                                    disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                required
                                value={pprice}
                                onChange={(e) => setPprice(e.target.value)}
                                placeholder="1,000,000đ"
                            />
                        </div>
                        <div className="xl:col-span-4 ">
                            <label className="inline-block mb-2 text-base font-medium">
                                Discount
                            </label>
                            <input
                                type="number"
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                                    disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                required
                                value={pdiscount}
                                onChange={(e) => setPdiscount(e.target.value)}
                                placeholder="0%"
                            />
                        </div>
                        <div className="xl:col-span-4 ">
                            <label className="inline-block mb-2 text-base font-medium">
                                Visibility
                            </label>
                            <select
                                className="form-input border-slate-200 focus:outline-none focus:border-blue-500 focus:border-custom-500
                                disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                placeholder="Category"
                                required=""
                                value={pvisibility}
                                onChange={(e) => setPvisibility(e.target.value)}
                            >
                                <option value="hidden">Hidden</option>
                                <option value="public">Public</option>
                            </select>
                        </div>
                        {/* <div className="xl:col-span-12">
                            <label className="inline-block mb-2 text-base font-medium">
                                Product Tag
                            </label>
                            <div class="relative overflow-hidden text-sm">
                                <div className="">
                                    <input
                                        className="form-input border-slate-200 focus:outline-none focus:border-blue-500 disabled:bg-slate-100
                                        disabled:border-slate-300 disabled:text-slate-500 placeholder:text-slate-400"
                                        type="text"
                                        // value="Fashion,Clothes,Headphones"
                                        tabindex="-1"
                                    />
                                    <div className="flex flex-row gap-1 absolute top-[5px] left-2">
                                        {productTag.map((tag) => {
                                            return (
                                                <div className="px-1 py-1 text-[12px] rounded-lg bg-blue-500 text-white">
                                                    {tag}
                                                </div>
                                            );
                                        })}
                                        <input
                                            type="text"
                                            className="border-none outline-0 border-0 pl-1"
                                            onChange={(e) => setCurrentTag(e.target.value)}
                                            onKeyDown={(e) => handleAddTag(e)}
                                            value={currentTag}
                                        />
                                    </div>
                                </div>
                                {currentTag && (
                                    <div className="">
                                        Press Enter to add "<strong>{currentTag}</strong>"
                                    </div>
                                )}
                            </div>
                        </div> */}
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500
                        focus:bg-red-100 active:text-red-500 active:bg-red-100 text-sm rounded-md px-4 py-2"
                            onClick={resetValue}
                        >
                            Reset
                        </button>
                        <button
                            class="text-white text-sm rounded-md px-4 py-2 bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600
                        hover:border-blue-600 focus:text-white focus:bg-blue-600 focus:border-blue-600 focus:ring
                        focus:ring-blue-100 active:text-white active:bg-blue-600 active:border-blue-600 active:ring
                        active:ring-blue-100"
                            onClick={handleCreateProduct}
                        >
                            Create Product
                        </button>
                    </div>
                </div>
            </div>
            <div className="py-5 mr-5">
                <div className="my-3 border-[1px] border-r-gray-400 "></div>
                <div className="footer text-sm text-gray-500 mt-2">
                    <div>2024 © Quang Việt.</div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
