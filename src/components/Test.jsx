import React, { useState, useEffect } from "react";
import myImage from "../assets/images/img.jpeg";
import ApiService from "../services/CartService";
import { MdDelete } from "react-icons/md";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

function Test() {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  }`;

  const [items, setItems] = useState([]);
  const token = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(false);
  const [quantityloading, setQuantityLoading] = useState(false);

  useEffect(() => {
    // Fetch items when the component mounts
    fetchItems();
  }, []);

  // const fetchItems = async () => {
  //   try {
  //     const itemsData = await ApiService.getCartData();
  //     setItems(itemsData);
  //   } catch (error) {
  //     console.error("Error fetching items:", error);
  //   }
  // };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const itemsData = await ApiService.getCartData();
      setItems(itemsData);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  //   const handleQuantityChange = (index, newQuantity) => {
  //     if (newQuantity > 0) {
  //       const updatedItems = [...items]; // Use items state instead of products
  //       updatedItems[index].quantity = newQuantity;
  //       setItems(updatedItems);
  //     }
  //   };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.imagePrice * item.quantity,
      0
    );
  };

  const handleClearCart = async () => {
    try {
      const tokenWithQuotes = `"${token}"`;
      // Call the ClearCartData API service
      const clearCartResponse = await ApiService.ClearCartData(tokenWithQuotes);

      // Log or handle the response as needed
      console.log("Cart cleared successfully:", clearCartResponse);
      await fetchItems();

      // Optionally, update the local state or perform any other necessary actions
    } catch (error) {
      console.error("Error clearing cart:", error);
      // Handle the error appropriately
    }
  };

  const handleDeleteCartItem = async (id) => {
    console.log("deleted", id);
    try {
      const deleteCartResponse = await ApiService.deleteCartItem({
        imageId: id,
      });
      await fetchItems();
    } catch (error) {
      console.error("Error Delete cart item:", error);
    }
  };

  const handleQuantityChange = async (index, newQuantityString) => {
    try {
      // Convert newQuantityString to an integer
      setQuantityLoading(true);
      const newQuantity = parseInt(newQuantityString, 10);

      if (isNaN(newQuantity) || newQuantity < 0) {
        // Optionally handle invalid input (not a number or negative)
        return;
      }

      const updatedItems = [...items];
      updatedItems[index].quantity = newQuantity;
      setItems(updatedItems); // Assuming you have a state for your items

      const data = {
        emailID: `${token}`, // replace with actual value
        imageId: updatedItems[index].imageId,
        imageName: updatedItems[index].imageName,
        imagePrice: updatedItems[index].imagePrice,
        totalPrice: updatedItems[index].imagePrice * newQuantity,
        quantity: newQuantity,
      };

      console.log(data);

      // Make the API call
      await ApiService.updateCartItem(data);
      setQuantityLoading(false);
      //   await fetchItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };


  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    // Dynamically import images
    const importImages = async () => {
      const images = {};
      for (const product of items) {
        const imageModule = await import(
          `../assets/productimages/${product.imageName}.png`
        );
        images[product.imageName] = imageModule.default;
      }
      setProductImages(images);
    };

    importImages();
  }, [items]);


  return (
    <>
      <div className="min-h-screen py-20 flex items-center">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-11/12 lg:w-8/12 md:w-9/12 mx-auto rounded-xl">
            <div className="w-full py-12">
              <div className="mt-8">
                <div className="flex justify-between px-6">
                  <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
                  <button onClick={handleClearCart}>Clear Cart</button>
                </div>

                <div className="bg-white p-4 lg:px-10 rounded-lg shadow-md">
                  {loading || quantityloading ? (
                    // Show loading spinner if loading is true
                    <div className="text-center">
                      <ClipLoader
                        color="black"
                        loading={loading}
                        css={override}
                        size={50}
                      />
                    </div>
                  ) : items.length === 0 ? (
                    // Show SweetAlert if the cart is empty
                    <div className="text-center">
                      <p className="text-lg text-gray-600 font-semibold">
                        Your cart is empty. 😟 Add some items to make it happy!
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-y-auto h-80 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                      {items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between mb-4"
                      >
                        <div className="flex items-center w-40 md:w-60 lg:w-72">
                          <img
                            src={productImages[item.imageName]}
                            alt={item.imageName}
                            className="mr-4 rounded-md w-10 lg:w-16"
                          />
                          <div>
                            <h3 className="text-sm lg:text-lg font-semibold overflow-hidden">
                              {item.imageName}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              Price: &#8377;{item.imagePrice}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col justify-center lg:flex-row md:flex-row items-center gap-2">
                          <label className="text-gray-600 text-sm">Qty:</label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(index, e.target.value)
                            }
                            className="border rounded-md p-1 w-12 h-6 lg:h-8 md:w-16 lg:w-20"
                          />
                        </div>

                        <p className="text-blue-500 font-semibold">
                          &#8377;{item.imagePrice * item.quantity}
                        </p>
                        <div>
                          <button
                            onClick={() => handleDeleteCartItem(item.imageId)}
                          >
                            <MdDelete className="text-lg text-red-500 cursor-pointer hover:text-red-300" />
                          </button>
                        </div>
                      </div>
                    ))}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-4 mt-4 border-t pt-4">
                    <h3 className="text-lg font-semibold">Total</h3>
                    <p className="text-blue-500 font-semibold">
                      &#x20B9;{calculateTotal().toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-end mt-4">
                    {items.length === 0 ? (
                      <button
                        className="bg-yellow-400 px-6 font-bold py-1"
                        // onClick={handlehome}
                      >
                        Continuie Shopping
                      </button>
                    ) : (
                      <button
                        className="bg-yellow-400 px-6 font-bold py-1"
                        // onClick={handleCheckout}
                      >
                        Check Out
                      </button>
                    )}
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

export default Test;
