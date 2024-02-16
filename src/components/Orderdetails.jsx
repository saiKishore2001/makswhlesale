import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../services/UserService";

function Orderdetails() {
  const { id } = useParams();
  const [ordersData, setOrdersData] = useState({
    paymentDetailsList: [],
    paymentList: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ApiService.getOrdersById(id);
        console.log(result);
        setOrdersData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  // Calculate total price of all products
  const totalAllProductsPrice = ordersData.paymentDetailsList.reduce(
    (total, paymentDetail) =>
      total +
      parseFloat(paymentDetail.quantity) * parseFloat(paymentDetail.imagePrice),
    0
  );

  return (
    <>
      <div className="min-h-screen py-20 flex items-center">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-11/12 lg:w-8/12 md:w-9/12 mx-auto rounded-xl">
            <div className="w-full">
              <div className="bg-white p-4 lg:px-10 rounded-lg shadow-md">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                  {ordersData.paymentDetailsList.map((paymentDetail, index) => (
                    <>
                      <div className="flex justify-between mb-4">
                        {/* <p>Image ID: {paymentDetail.imageID}</p> */}
                        <div className="w-60">
                          <p>Image Name: {paymentDetail.imageName}</p>
                        </div>
                        <p>Quantity: {paymentDetail.quantity}</p>
                        <p>Rs {paymentDetail.imagePrice}</p>
                        <p>
                          Rs{" "}
                          {parseFloat(paymentDetail.quantity) *
                            parseFloat(paymentDetail.imagePrice)}
                        </p>
                      </div>
                    </>
                  ))}
                  <div className="flex justify-end">
                    <p>Total: {totalAllProductsPrice}</p>
                  </div>
                </div>
                <hr className="my-4"></hr>
                <div className="flex justify-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Payment Details
                    </h2>
                    {ordersData.paymentList.map((payment, index) => (
                      <div key={index}>
                        {/* <p>Order ID: {payment.orderId}</p> */}
                        {/* <p>Total Price: {payment.totalPrice}</p> */}
                        <p>Payment Id: {id}</p>
                        <p>Order Placed Date: {payment.orderPlacedDate}</p>
                        <p>Delivery Address: {payment.deliveryAddress}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orderdetails;
