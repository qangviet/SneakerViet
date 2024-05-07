import React, { useState } from "react";
import SideBar from "./sideBar";
import Topbar from "./topBar";
import CreateProduct from "./CRUDProduct/createProduct";
import Order from "./Order/order";
import ViewProduct from "./CRUDProduct/viewProduct";
const AdminPage = () => {
    const [content, setContent] = useState("");
    console.log(content);
    return (
        <div className="bg-cloud my-0 py-0 font-Publicsand">
            <div className="flex flex-row">
                <div className="basis-[13%] border-solid border-gray-300 shadow-sm border-x-[1px] border-y-0 bg-white">
                    <SideBar content={content} setContent={setContent} />
                </div>
                <div className="basis-[87%]">
                    <Topbar />
                    <div>
                        {content === "add-new-product" && <CreateProduct />}
                        {content === "order" && <Order />}
                        {content === "view-product" && <ViewProduct />}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminPage;
