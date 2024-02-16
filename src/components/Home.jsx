import React, { useState, useEffect } from "react";
import "./style.css";
import myImage from "../assets/images/img.jpeg";
import { IoCart } from "react-icons/io5";
import banner1 from "../assets/images/banner1.jpg";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiService from "../services/CartService";
import productApiService from "../services/ProductService";
// import ApiService from "../services/UserService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

  const productsPerPage = 10;
  const rowsPerPage = 4; // Each page has 2 fixed rows
  const columnsPerPage = 4; // Each page has 5 fixed columns
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const token = localStorage.getItem("authToken");

  const handleAddToCart = async (product) => {
    Swal.fire({
      position: "top",
      width: 400,
      text: "Added to cart!",
      showConfirmButton: false,
      timer: 1000,
    });

    console.log("Added to cart!", product);

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
      localStorage.setItem(
        `quantity_${product.imageId}`,
        product.quantity.toString()
      );

      // Swal.fire({
      //   position: "top-end",
      //   width: 400,
      //   text: "Added to cart!",
      //   showConfirmButton: false,
      //   timer: 1000,
      // });
  
    } catch (error) {
      console.error("Error handling cart:", error);
    }
  };

  // useEffect(() => {
  //   fetch(
  //     "http://api.makarenagroup.com/DBClass/GetPagedImages?page=1&pageSize=600"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Fetched products:", data);
  //       const sortedData = applySort(data, selectedSort);
  //       setProducts(sortedData);
  //     })
  //     .catch((error) => console.error("Error fetching products:", error));

  //   const handleAddToCart = async (product) => {
  //     try {
  //       const response = await addToCart(product);
  //       setCartItems(response.cartItems);

  //       setNotification(`${product.imageName} added to cart`);
  //       toast.success(`${product.imageName} added to cart`);
  //     } catch (error) {
  //       console.error("Error adding to cart:", error);
  //       toast.error("Error adding to cart");
  //     }
  //   };
  // }, [selectedSort]);

  // useEffect(() => {
  //   setLoading(true);

  //   productApiService
  //     .getimageData(currentPage, productsPerPage)
  //     .then((data) => {
  //       if (data && data.products) {
  //         const sortedData = applySort(data.products, selectedSort);
  //         setProducts(sortedData);
  //       } else {
  //         console.error("Invalid data format received from the server");
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching products:", error))
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [selectedSort]);

  const applySort = (data, sortOption) => {
    // Sorting logic
    if (sortOption === "name") {
      return [...data].sort((a, b) => a.imageName.localeCompare(b.imageName));
    } else if (sortOption === "pricelow") {
      return [...data].sort((a, b) => a.imagePrice - b.imagePrice);
    } else if (sortOption === "pricehigh") {
      return [...data].sort((a, b) => b.imagePrice - a.imagePrice);
    } else {
      return data; // No sorting
    }
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const totalProducts = products.length;
  const totalProductsPerPage = rowsPerPage * columnsPerPage;
  const totalPages = Math.ceil(totalProducts / totalProductsPerPage);

  const startIdx = currentPage * totalProductsPerPage;
  const endIdx = startIdx + totalProductsPerPage;
  const currentProducts = products.slice(startIdx, endIdx);

  const fetchProducts = async (page, sortOption) => {
    setLoading(true);

    try {
      const data = await productApiService.getimageData(page, productsPerPage);
      console.log("API Response:", data); // Log the response

      if (Array.isArray(data) && data.length > 0) {
        const sortedData = applySort(data, sortOption);
        setProducts(sortedData);
      } else {
        console.error("Invalid data format received from the server");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, selectedSort);
  }, [currentPage, selectedSort]);

  const handlePageClick = (selected) => {
    const newPage = selected.selected + 1;
    setCurrentPage(newPage);

    console.log("Clicked page:", newPage);

    // Call your API with the adjusted page number
    fetchProducts(newPage, selectedSort);

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/Login");
  };

  return (
    <>
      <div>
        <img className="w-full object-contain" src={banner1} />
      </div>

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
              <select
                value={selectedSort}
                onChange={handleSortChange}
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
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

          {loading ? (
            <div className="text-center">
              <ClipLoader
                color="black"
                loading={loading}
                css={override}
                size={50}
              />
            </div>
          ) : (
            <>
              <div className="container mx-auto justify-center px-6 lg:px-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 mb-2">
                {products.map((Product, index) => (
                  <div
                    key={Product.imageId}
                    className="bg-white shadow-lg rounded-lg w-full justify-center"
                  >
                    <img
                      className="h-48  object-cover rounded-lg"
                      src={`data:image/png;base64,${Product.imageData}`} // Assuming ImageData is a base64 string
                      alt={Product.imageName}
                    />
                    <div className="px-2">
                      <h2 className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {Product.imageName}
                      </h2>
                    </div>

                    <div className="flex justify-between px-2 py-2">
                      <div className="flex items-center justify-start">
                        <h2 className="text-md">Rs {Product.imagePrice}/- </h2>
                        <h2 className="ml-2 text-gray-400 text-sm"></h2>
                      </div>
                      <IoCart
                        className="text-xl hover:text-slate-500"
                        onClick={() => handleAddToCart(Product)}
                      />

                      {token ? (
                        <IoCart
                          className="text-xl hover:text-slate-500"
                          onClick={() => handleAddToCart(Product)}
                        />
                      ) : (
                        <IoCart
                          className="text-xl hover:text-slate-500"
                          onClick={handleLogin}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-4">
                <ReactPaginate
                  pageCount={totalPages}
                  pageRangeDisplayed={3}
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
                  previousClassName={
                    currentPage === 1 ? "disabled" : "cursor-pointer"
                  }
                  nextClassName={
                    currentPage === totalPages ? "disabled" : "cursor-pointer"
                  }
                  previousLinkClassName={
                    currentPage === 1
                      ? "px-2 py-1 rounded-full bg-gray-200 text-gray-400"
                      : "px-2 py-1 rounded-full bg-gray-200 text-gray-700"
                  }
                  nextLinkClassName={
                    currentPage === totalPages
                      ? "px-2 py-1 rounded-full bg-gray-200 text-gray-400"
                      : "px-2 py-1 rounded-full bg-gray-200 text-gray-700 "
                  }
                />
              </div>
            </>
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
    </>
  );
}

export default Home;
