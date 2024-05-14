import React, { useState } from "react";
import SideBar from "./sideBar";
import Topbar from "./topBar";
import CreateProduct from "./CRUDProduct/createProduct";
import Order from "./Order/order";
import ViewProduct from "./CRUDProduct/viewProduct";
import ViewBrand from "./Brand/viewBrand";
import DashBroads from "./DashBroad/dashBroads";
import { useSelector } from "react-redux";
const AdminPage = () => {
    const [content, setContent] = useState("");
    const contentPage = useSelector((state) => state.admin.contentPage);

    return (
        <div className="bg-cloud my-0 py-0 font-Publicsand">
            <div className="flex flex-row">
                <div className="basis-[13%] border-solid border-gray-300 shadow-sm border-x-[1px] border-y-0 bg-white">
                    <SideBar content={content} setContent={setContent} />
                </div>
                <div className="basis-[87%]">
                    <Topbar />
                    <div>
                        {contentPage === "add-new-product" && <CreateProduct />}
                        {contentPage === "order" && <Order />}
                        {contentPage === "view-product" && <ViewProduct />}
                        {contentPage === "view-brand" && <ViewBrand />}
                        {contentPage === "" && <DashBroads />}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminPage;
