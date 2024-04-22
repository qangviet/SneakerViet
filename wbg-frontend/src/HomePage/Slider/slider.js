import React from "react";
import BgSlider from "./image_sneaker.jpg";
function Slider() {
    return (
        <div
            className="slider h-[580px] bg-cover bg-no-repeat bg-bottom"
            style={{ backgroundImage: `url(${BgSlider})` }}
        >
            <div className="w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-25">
                <div className="ml-[37vw] text-center text-white">
                    <div className="text-xl uppercase mb-6 font-medium">
                        Best Place To Buy Sneakers
                    </div>
                    <div className="text-5xl mb-8 font-bold">Sneakers Viet</div>
                    <div className="text-lg mb-10 font-medium">
                        The most versatile furniture system ever created. Designed to fit your life,
                        made you move and grow
                    </div>
                    <div className="flex justify-center items-center">
                        <div
                            className="bg-white text-gray-900 w-max tracking-wider px-7 py-4 
                        uppercase text-sm font-semibold cursor-pointer hover:bg-opacity-70"
                        >
                            Explore Our Products
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider;
