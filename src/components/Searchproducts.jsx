import React, { useState, useEffect } from "react";
import { IoCart } from "react-icons/io5";
import myImage from "../assets/images/img.jpeg";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

import ApiService from "../services/CartService";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Searchproducts({ dataArray }) {
  console.log("Search results in Home:", dataArray);
  const [cartloading, setCartLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const productsPerPage = 8;
  const rowsPerPage = 4; // Each page has 2 fixed rows
  const columnsPerPage = 4; // Each page has 5 fixed columns
  const [currentPage, setCurrentPage] = useState(0);

  const totalProducts = dataArray.length;
  const totalProductsPerPage = rowsPerPage * columnsPerPage;
  const totalPages = Math.ceil(totalProducts / totalProductsPerPage);

  const startIdx = currentPage * totalProductsPerPage;
  const endIdx = startIdx + totalProductsPerPage;
  const currentProducts = dataArray.slice(startIdx, endIdx);

  const handlePageClick = (selectedPage) => {
    const newPage = selectedPage.selected;
    setCurrentPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "auto", // Use 'smooth' for smooth scroll
    });
  };
  const resetSearchLoading = () => {
    setSearchLoading(true);
  };
  const handleAddToCart = async (product) => {
    setCartLoading(true);
    console.log("Adding to cart:", product);

    try {
      const cartItems = await ApiService.getCartData();

      const index = cartItems.findIndex(
        (cartItem) => cartItem.imageId === product.imageId
      );

      if (index !== -1) {
        // Item is already in the cart
        let currQty = Number(cartItems[index].quantity);
        currQty += 1;

        cartItems[index].quantity = currQty;
        product.quantity = currQty;
      } else {
        // Item is not in the cart, add it with a quantity of 1
        product.quantity = 1;
        cartItems.push(product);
        // Add the new item to the cartItems array
      }
      console.log("Product clicked:", product);

      // Send cart details to API
      await ApiService.sendCartDetails({
        token: localStorage.getItem("authToken"),
        cartItem: product,
      });

      // Update the quantity in localStorage
      //   localStorage.setItem(
      //     `quantity_${product.imageId}`,
      //     product.quantity.toString()
      //   );

      setCartLoading(false);

      Swal.fire({
        position: "top",
        width: 400,
        text: "Added to cart!",
        showConfirmButton: false,
        timer: 1000,
      });

      console.log("Added to cart!", product);
    } catch (error) {
      console.error("Error handling cart:", error);
    }
  };
  useEffect(() => {
    setSearchLoading(true);
    resetSearchLoading();

    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSearchLoading(false);
        // window.location.reload();
      } catch (error) {
        console.error("Error fetching data:", error);
        // setSearchLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [dataArray]);

  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    // Dynamically import images
    const importImages = async () => {
      const images = {};
      for (const product of currentProducts) {
        const imageModule = await import(
          `../assets/productimages/${product.imageName}.png`
        );
        images[product.imageName] = imageModule.default;
      }
      setProductImages(images);
    };

    importImages();
  }, [currentProducts]);

  return (
    <>
      {searchLoading ? (
        <div className="min-h-screen">
          <div className="text-center">
            <ClipLoader
              color="black"
              loading={searchLoading}
              css={override}
              size={50}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="min-h-screen lg:w-1/6 pt-8 hidden lg:block">
            <div className="flex flex-col gap-8">
              <img className="h-48 w-full object-contain" src={myImage} />
              <img className="h-48 w-full object-contain" src={myImage} />
              <img className="h-48 w-full object-contain" src={myImage} />
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex justify-start items-center gap-4 px-8 lg:pl-10 py-6">
              <div>
                <h2 className="text-lg">Filter</h2>
              </div>
              <div className="w-full md:w-48 lg:w-48">
                <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled>
                    Sort by
                  </option>
                  <option value="name">A-Z</option>
                  <option value="pricelow">Price - low to high</option>
                  <option value="pricehigh">Price - high to low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 10l5-5 5 5H5z" />
                  </svg>
                </div>
              </div>

              <div className="w-full md:w-48 lg:w-48">
                <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled>
                    Catagory
                  </option>
                  <option value="name">A-Z</option>
                  <option value="pricelow">Price - low to high</option>
                  <option value="pricehigh">Price - high to low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 10l5-5 5 5H5z" />
                  </svg>
                </div>
              </div>

              <div className="w-full md:w-48 lg:w-48">
                <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" disabled defaultValue>
                    Select a Category
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 10l5-5 5 5H5z" />
                  </svg>
                </div>
              </div>
            </div>

            {dataArray.length > 0 ? (
              <>
                <div className="container mx-auto justify-center px-6 lg:px-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 mb-2">
                  {currentProducts.map((Product, index) => (
                    <div
                      key={Product.imageId}
                      className="bg-white shadow-lg rounded-lg w-full justify-center"
                    >
                      <img
                      className="h-48 object-cover rounded-lg"
                      src={productImages[Product.imageName]}
                      alt={Product.imageName}
                    />
                      <div className="px-2">
                        <h2 className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                          {Product.imageName}
                        </h2>
                      </div>

                      <div className="flex justify-between px-2 py-2">
                        <div className="flex items-center justify-start">
                          <h2 className="text-md">
                            Rs {Product.imagePrice}/-{" "}
                          </h2>
                          <h2 className="ml-2 text-gray-400 text-sm"></h2>
                        </div>
                        {/* <IoCart className="text-xl hover:text-slate-500"  onClick={() => handleAddToCart(Product)} /> */}
                        <button
                          onClick={() => handleAddToCart(Product)}
                          className="border border-yellow-300 text-black/80 hover:bg-yellow-300 hover:text-black px-2 rounded-sm flex items-center"
                        >
                          Add to <IoCart />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-4">
                  <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination flex space-x-4 py-10"}
                    pageClassName={"cursor-pointer"}
                    pageLinkClassName={
                      "px-2 py-1 rounded-full bg-gray-200 text-gray-700"
                    }
                    activeClassName={"bg-blue-500 text-white"}
                    previousClassName={"cursor-pointer"}
                    nextClassName={"cursor-pointer"}
                    previousLinkClassName={
                      "px-2 py-1 rounded-full bg-gray-200 text-gray-700"
                    }
                    nextLinkClassName={
                      "px-2 py-1 rounded-full bg-gray-200 text-gray-700 "
                    }
                  />
                </div>
              </>
            ) : (
              <div className="text-center text-lg font-bold text-red-500">
                Sorry, no products found.
              </div>
            )}
          </div>

          <div className="min-h-screen lg:w-1/6 pt-8 hidden lg:block ">
            <div className="flex flex-col gap-8">
              <img className="h-48 w-full object-cover" src={myImage} />
              <img className="h-48 w-full object-cover" src={myImage} />
              <img className="h-48 w-full object-cover" src={myImage} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Searchproducts;
