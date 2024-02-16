import React from "react";
import myImage from "../assets/images/img.jpeg";
import ProductCard from "./ProductCard";

const products = [
    // Add your product data here
    {
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 19.99,
      image: myImage, // Replace with your actual image URL
    },
    {
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 24.99,
      image: myImage, // Replace with your actual image URL
    },
    // Add more products as needed
  ];

function Ecomlanding() {
  return (
    <>
    {/* <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div> */}

    {/* <div className="relative mb-4">
        <img className="h-[40vh] w-full object-fit object-cover " src={myImage} alt="MAK Wholesale" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center">
            <h2 className="text-yellow-300 text-5xl font-bold">
            MAK Wholesale
            </h2>
            <button className="bg-yellow-200 p-2 mt-4">
            Shop Now
            </button>
        </div>
    </div> */}


    <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center mb-2">
        <div className="bg-white shadow-lg rounded-lg px-6 py-4">
            <div className="flex flex-col items-center"> 
                <img className="h-48 w-52 object-cover" src={myImage} />
            </div>
            <div className="my-2">
                <h2>3 Minute Kesari Halwa Pouch hhh hhhhh hhhhh hhhhh</h2>
                <h2>MRP: ₹ 25 /-</h2>
            </div>
            <div className="flex flex-col items-end mt-2">
                <button className="bg-yellow-400 p-2 rounded-md text-white">ADD TO CART</button>
            </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg px-6 py-4">
            <div className="flex flex-col items-center"> 
                <img className="h-48 w-52 object-cover" src={myImage} />
            </div>
            <div className="my-2">
                <h2>3 Minute Kesari Halwa Pouch </h2>
                <h2>MRP: ₹ 25 /-</h2>
            </div>
            <div className="flex flex-col items-end mt-2">
                <button className="bg-yellow-400 p-2 rounded-md text-white">ADD TO CART</button>
            </div>
        </div>

        
    </div>
    </>
  );
}

export default Ecomlanding;
