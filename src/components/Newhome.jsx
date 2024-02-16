import React, { useEffect, useState } from "react";
import productApiService from "../services/ProductService";
import ReactPaginate from "react-paginate";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { IoCart } from "react-icons/io5";
import banner1 from "../assets/images/banner1.jpg";
import myImage from "../assets/images/img.jpeg";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import ApiService from "../services/CartService";
import FilterService from "../services/FiltersService";

function Newhome() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cartloading, setCartLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const token = localStorage.getItem("authToken");

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const fetchProducts = async (page, pageSize) => {
    try {
      const result = await productApiService.getAllData(page, pageSize);
      setProducts(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    // Dynamically import images
    const importImages = async () => {
      const images = {};
      for (const product of products) {
        const imageModule = await import(
          `../assets/productimages/${product.imageName}.png`
        );
        images[product.imageName] = imageModule.default;
      }
      setProductImages(images);
    };

    importImages();
  }, [products]);

  //   console.log("Selected Brand ID:", selectedBrand);

  //   try {
  //     setLoading(true);
  //     // Fetch products for the selected brand
  //     const products = await FilterService.fetchProductsByBrand(selectedBrand);
  //     console.log("Products for the selected brand:", products);

  //     // Update the products state with the fetched products
  //     setProducts(products);
  //   } catch (error) {
  //     console.error("Error fetching products by brand:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //   const handleBrandChange = async (selectedBrand) => {
  //     console.log("Selected Brand ID:", selectedBrand);

  //     try {
  //        setLoading(true);

  //        if (!selectedBrand) {
  //           // Fetch all products
  //           await fetchProducts(currentPage, 16);
  //        } else {
  //           // Fetch products for the selected brand
  //           const products = await FilterService.fetchProductsByBrand(selectedBrand);
  //           console.log("Products for the selected brand:", products);
  //           setProducts(products);
  //        }

  //     } catch (error) {
  //        console.error("Error fetching products by brand:", error);
  //     } finally {
  //        setLoading(false);
  //     }
  //  };
  const handleBrandChange = async (selectedBrand) => {
    console.log("Selected Brand ID:", selectedBrand);

    try {
      setLoading(true);

      if (!selectedBrand) {
        // Fetch all products
        await fetchProducts(currentPage, 16);
      } else {
        // Fetch products for the selected brand
        const products = await FilterService.fetchProductsByBrand(
          selectedBrand
        );
        console.log("Products for the selected brand:", products);
        setProducts(products);

        // Fetch categories for the selected brand
        const categories = await FilterService.getCategoriesByBrandId(
          selectedBrand
        );
        console.log("Catagories", categories);
        setCategories(categories);
      }
    } catch (error) {
      console.error("Error fetching products :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCatagoryChange = async (selectedCategory) => {
    console.log("Selected Brand ID111:", selectedBrand);
    console.log("Selected Category ID:11", selectedCategory);
    try {
      setLoading(true);

      if (!selectedBrand) {
        // Fetch all products
        await fetchProducts(currentPage, 16);
      } else {
        // Fetch products for the selected brand
        const products = await FilterService.getProductsByCategoryIdAndBrandId(
          selectedCategory,
          selectedBrand
        );
        console.log("Products for the selected brand and category:", products);
        setProducts(products);

        // Fetch categories for the selected brand
      }
    } catch (error) {
      console.error("Error fetching products :", error);
    } finally {
      setLoading(false);
    }
  };

  //   console.log("Selected Catagory ID:", );

  // try {
  //   setLoading(true);

  //   if (!selectedBrand) {
  //     // Fetch all products
  //     await fetchProducts(currentPage, 16);
  //   } else {
  //     // Fetch products for the selected brand
  //     const products = await FilterService.fetchProductsByBrand(selectedBrand);
  //     console.log("Products for the selected brand:", products);
  //     setProducts(products);

  //     // Fetch categories for the selected brand
  //     const categories = await FilterService.getCategoriesByBrandId(selectedBrand);
  //     console.log("Catagories",categories)
  //     setCategories(categories);
  //   }

  // } catch (error) {
  //   console.error("Error fetching products :", error);
  // } finally {
  //   setLoading(false);
  // }
  // };

  const fetchInitialCategories = async () => {
    try {
      // Fetch initial categories
      const categories = await FilterService.getCatagory();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching initial categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const brands = await FilterService.getBrands();
      setBrands(brands);
      console.log("brands", brands);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage + 1); // react-paginate uses 0-based indexing
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  useEffect(() => {
    fetchProducts(currentPage, 16);
    fetchBrands();
    fetchInitialCategories();
  }, [currentPage]);

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

  const navigate = useNavigate();

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
              <select
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  handleBrandChange(e.target.value);
                }}
              >
                <option value="" defaultValue>
                  Brands
                </option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
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
              <select
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  handleCatagoryChange(e.target.value);
                }}
              >
                <option value="" defaultValue>
                  Catagories
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
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
            <div className="min-h-screen">
              <div className="text-center">
                <ClipLoader
                  color="black"
                  loading={loading}
                  css={override}
                  size={50}
                />
              </div>
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
                        <h2 className="text-md">Rs {Product.imagePrice}/- </h2>
                        <h2 className="ml-2 text-gray-400 text-sm"></h2>
                      </div>

                      {token ? (
                        <button
                          onClick={() => handleAddToCart(Product)}
                          className="border border-yellow-300 text-black/80 hover:bg-yellow-300 hover:text-black px-2 rounded-sm flex items-center"
                        >
                          Add to <IoCart />
                        </button>
                      ) : (
                        <a
                          href="/Login"
                          className="border border-yellow-300 text-black/80 hover:bg-yellow-300 hover:text-black px-2 rounded-sm flex items-center"
                        >
                          Add to <IoCart />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <ReactPaginate
                pageCount={16} // Adjust the total number of pages based on your data
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                onPageChange={(selected) => handlePageChange(selected.selected)}
                subContainerClassName={"pages pagination"}
                activeClassName={"bg-blue-500 text-white"}
                pageLinkClassName={
                  "px-2 rounded-full bg-gray-200 text-gray-700 hidden lg:block"
                }
                previousLinkClassName={
                  "px-2 py-1 rounded-full bg-gray-200 text-black"
                }
                nextLinkClassName={
                  "px-2 py-1 rounded-full bg-gray-200 text-black"
                }
                containerClassName={"pagination flex space-x-4 py-10"}
                pageClassName={"cursor-pointer"}
              />
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

export default Newhome;
