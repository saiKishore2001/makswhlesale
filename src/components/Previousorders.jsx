import React, { useEffect, useState } from "react";
import myImage from "../assets/images/img.jpeg";
import ApiService from "../services/UserService";
import { Link } from "react-router-dom";

function Previousorders() {
  const [ordersData, setOrdersData] = useState([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ApiService.getOrdersData(token);
        setOrdersData(result.data); // Assuming result is an object with a 'data' property
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen py-20 flex items-center">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-11/12 lg:w-8/12 md:w-9/12 mx-auto rounded-xl">
            <div className="w-full ">
              <div className="bg-white p-4 lg:px-10 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Previous Orders</h2>

                {ordersData.map((order) => (
                  <div className="flex items-center justify-between mb-4">
                    <p>{order.orderId}</p>
                    {/* <p>{order.paymentId}</p> */}
                    <p>{order.orderPlacedDate}</p>
                    <p>Rs {order.totalPrice}</p>
                    <Link
                      to={`/Orderdetails/${order.paymentId}`}
                      className="border border-yellow-300 px-2 rounded-sm hover:bg-yellow-300"
                    >
                      view
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Previousorders;
