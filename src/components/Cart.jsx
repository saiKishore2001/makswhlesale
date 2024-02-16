import React, { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Redlabel from "../assets/images/Redlabel.jpg";
import chocolate from "../assets/images/chocolate.jpg";

import ApiService from "../services/CartService";

function Cart() {
  const [quantity1, setQuantity1] = useState(1);
  const [quantity2, setQuantity2] = useState(1);

  const [cartData, setCartData] = useState([]);

  const calculateTotalPrice = (quantity, price) => {
    return quantity * price;
  };

  const handleDelete = (product) => {
    if (product === "Red Label") {
      setQuantity1(1);
    } else if (product === "Chocolate") {
      setQuantity2(1);
    }
  };

  const totalAmount =
    calculateTotalPrice(quantity1, 100) + calculateTotalPrice(quantity2, 200);

  const clearCart = () => {
    setQuantity1(1);
    setQuantity2(1);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await ApiService.getCartData();
        setCartData(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError(
          error.message || "An error occurred while fetching cart data."
        );
      }
    };

    fetchCartData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <div className="container w-full md:w-4/5 lg:w-3/4 rounded-lg border-solid border-black mb-5 p-5 md:p-10">
          <div className="row flex flex-col">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl md:text-xl lg:text-2xl font-serif text-left">
                Shipping Cart:
              </h3>
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-3 py-2 rounded mx-2"
              >
                Clear Cart
              </button>
            </div>

            <div className="overflow-x-auto mb-8">
              <table className="table-auto w-full border border-collapse">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-4 md:py-6 px-2 md:px-4 text-center"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="py-2 md:py-4 px-2 md:px-4 text-center"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="py-2 md:py-4 px-2 md:px-4 text-center"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-2 md:py-4 px-2 md:px-4 text-center"
                    ></th>
                  </tr>
                </thead>

                {/* <tbody>
                  <tr>
                    <td className="w-50">
                      <div className="flex">
                        <img
                          src={Redlabel}
                          className="ml-7 mb-5 w-18 h-16 object-cover"
                          alt="Red Label"
                        />
                        <div className="display: block;">
                          <p className="ml-4 mb-2">Red Label</p>
                          <p className="ml-4">Price: ₹100 </p>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle text-center">
                      <div className="flex justify-center">
                        <input
                          className="w-24 border border-gray-400 p-2"
                          id="quantity1"
                          type="number"
                          min="1"
                          value={quantity1}
                          onChange={(e) =>
                            setQuantity1(parseInt(e.target.value, 10))
                          }
                        />
                      </div>
                    </td>
                    <td className="text-center w-5">
                      ₹{calculateTotalPrice(quantity1, 100)}
                    </td>
                    <td className="w-10">
                      <button
                        className="p-2 rounded-lg mx-2"
                        onClick={() => handleDelete("Red Label")}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-500"
                        />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-48">
                      <div className="flex">
                        <img
                          src={chocolate}
                          className="ml-7 mb-5 w-18 h-16 object-cover"
                          alt="Chocolate"
                        />
                        <div className="display: block;">
                          <p className="ml-4 mb-2">Chocolate</p>
                          <p className="ml-4">Price: ₹200</p>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle text-center">
                      <div className="flex justify-center">
                        <input
                          className="w-24 border border-gray-400 p-2"
                          id="quantity2"
                          type="number"
                          min="1"
                          value={quantity2}
                          onChange={(e) =>
                            setQuantity2(parseInt(e.target.value, 10))
                          }
                        />
                      </div>
                    </td>

                    <td className="text-center w-40  ml-4 ">
                      ₹{calculateTotalPrice(quantity2, 200)}
                    </td>
                    <td className="w-36">
                      <button
                        className="p-2 rounded-lg mx-2"
                        onClick={() => handleDelete("Chocolate")}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-500"
                        />
                      </button>
                    </td>
                  </tr>
                </tbody> */}
                <tbody>
                  {cartData.map((item, index) => (
                    <tr key={item.imageId}>
                      <td className="w-50">
                        <div className="flex">
                          <img
                            src={`data:image/jpeg;base64,${item.imageData}`}
                            className="ml-7 mb-5 w-18 h-16 object-cover"
                            alt={item.imageName}
                          />

                          <div className="display: block;">
                            <p className="ml-4 mb-2">{item.imageName}</p>
                            <p className="ml-4">
                              Price: ₹{item.imagePrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle text-center">
                        <div className="flex justify-center">
                          <input
                            className="w-24 border border-gray-400 p-2"
                            id={`quantity${item.productId}`}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.productId,
                                parseInt(e.target.value, 10)
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className="text-center w-5">
                        ₹{calculateTotalPrice(item.quantity, item.imagePrice)}
                      </td>
                      <td className="w-10">
                        <button
                          className="p-2 rounded-lg mx-2"
                          onClick={() => handleDelete(item.productId)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-500"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan="4" className="border-t border-gray-300 "></td>
                  </tr>

                  <tr>
                    <td
                      colSpan="2"
                      className="text-right pr-4 font-bold mb-6 py-4"
                    >
                      Total Amount:
                    </td>
                    <td className="text-center font-bold text-lg text-green-600">
                      ₹{totalAmount}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="2"
                      className="text-right pr-4 font-bold mb-6 py-4"
                    ></td>
                    <td className="text-center font-bold text-lg text-green-600 py-4">
                      <button className="bg-green-500 text-white px-3 py-2 rounded mx-2 w-full">
                        Check out
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* {cartData.map((item) => (
          <li key={item.productId}>
            Product: {item.productName}, Quantity: {item.quantity}
          </li>
        ))} */}
    </>
  );
}

export default Cart;
