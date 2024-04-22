import React from "react";
import SideBar from "./sideBar";
import Topbar from "./topBar";
import CreateProduct from "./CRUDProduct/createProduct";
import Order from "./Order/order";
import { useSelector } from "react-redux";
const AdminPage = () => {
    const contentPage = useSelector((state) => state.admin.pageContent);
    return (
        <div className="bg-cloud my-0 py-0 font-Publicsand">
            <div className="flex flex-row">
                <div className="basis-[13%] border-solid border-gray-300 shadow-sm border-x-[1px] border-y-0 bg-white">
                    <SideBar />
                </div>
                <div className="basis-[87%]">
                    <Topbar />
                    <div>
                        {contentPage === "add-new-product" && <CreateProduct />}
                        {contentPage === "order" && <Order />}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminPage;
