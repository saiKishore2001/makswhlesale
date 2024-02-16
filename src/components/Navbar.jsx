import React, { useState, useEffect } from "react";
import NavLogo from "../assets/images/logopng.png";
import { FiMenu } from "react-icons/fi";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import ApiService from "../services/ProductService";
import { useNavigate } from "react-router-dom";

function Navbar({ onDataChange }) {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState(null);
  const [isSticky, setSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      console.log("Searching for:", searchTerm);
      const result = await ApiService.getDatabyName(searchTerm);
      // setSearchResults(result.items);
      // onSearchResultsChange(result.items);
      onDataChange(result.items);
      console.log("Search results:", result.items);
      navigate("/Searchproducts");
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navlinks = [
    {
      label: "collections",
      link: "#",
    },
    {
      label: "men",
      link: "#",
      submenu: [
        {
          label: "clothing",
          link: "#",
        },
        {
          label: "accessories",
          link: "#",
        },
        {
          label: "shoes",
          link: "#",
        },
        {
          label: "stores",
          link: "#",
        },
      ],
    },
    {
      label: "women",
      link: "#",
      submenu: [
        {
          label: "clothing",
          link: "#",
        },
        {
          label: "accessories",
          link: "#",
        },
        {
          label: "shoes",
          link: "#",
        },
        {
          label: "stores",
          link: "#",
        },
      ],
    },
    {
      label: "other",
      link: "#",
      submenu: [
        {
          label: "submenu1",
          link: "#",
        },
        {
          label: "submenu2",
          link: "#",
        },
      ],
    },
  ];

  const handleMenuClick = (index) => {
    setActiveSubMenuIndex(index === activeSubMenuIndex ? null : index);
  };

  return (
    <>
      <nav
        className={`flex items-center h-14 justify-between px-4 lg:px-8 bg-black/90 ${
          isSticky ? "sticky top-0" : ""
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            <FiMenu
              className="text-3xl lg:hidden text-yellow-500"
              onClick={() => setMenu(!isSideMenuOpen)}
            />
            <a href="/">
              <img src={NavLogo} className="w-12 cursor-pointer" />
            </a>
          </section>
          <section className="hidden lg:flex gap-8 lg:items-center lg:justify-center">
            {navlinks.map((d, i) => (
              <div
                key={i}
                className="relative group"
                onMouseEnter={() => setActiveSubMenuIndex(i)}
                onMouseLeave={() => setActiveSubMenuIndex(null)}
              >
                <a
                  className="text-yellow-400 hover:text-yellow-500 cursor-pointer"
                  href={d.link}
                >
                  {d.label}
                </a>
                {d.submenu && activeSubMenuIndex === i && (
                  <div className="absolute top-full left-0 bg-black/90 px-8 py-2 rounded-md">
                    {d.submenu.map((subitem, subindex) => (
                      <a
                        key={subindex}
                        className="block text-sm text-yellow-400 hover:text-yellow-500 py-2"
                        href={subitem.link}
                      >
                        {subitem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        </div>
        {isSideMenuOpen && (
          <div className="fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0">
            <section className="text-yellow-500 bg-black/90 flex-col absolute left-0 top-1/2 transform -translate-y-1/2 h-screen p-8 gap-8 z-50 flex w-1/2 ">
              <IoClose
                className="mt-0 mb-8 text-3xl cursor-pointer"
                onClick={() => setMenu(false)}
              />
              <div className="flex flex-col items-center gap-8">
                {navlinks.map((d, i) => (
                  <div
                    key={i}
                    className="relative group"
                    onClick={() => handleMenuClick(i)}
                  >
                    <a
                      className="font-bold text-yellow-400 hover:text-yellow-500 cursor-pointer py-2"
                      href={d.link}
                    >
                      {d.label}
                    </a>
                    {d.submenu && i === activeSubMenuIndex && (
                      <div className="block text-sm text-yellow-400">
                        {d.submenu.map((subitem, subindex) => (
                          <a
                            key={subindex}
                            className="block text-sm text-yellow-400 hover:text-yellow-500 py-2"
                            href={subitem.link}
                          >
                            {subitem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <a href="/Login">Login</a>
              </div>
            </section>
          </div>
        )}

        <div className="flex items-center bg-gray-300 text-black px-4 py-1 rounded-xl h-8">
          {/* <FiSearch className="text-black text-2xl mr-2" /> */}
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-black outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <button onClick={handleSearch}>Search</button> */}
          <button
            onClick={handleSearch}
            className="flex items-center bg-gray-300 text-black py-1 rounded-md"
          >
            <FiSearch className="text-black text-2xl " />
          </button>
        </div>

        <section className="flex items-center gap-4">
          {/* <a className="text-yellow-400 px-2" href="/Cart">Cart</a> */}

          <a href="/Cart" className="px-2">
            <IoCart className="text-yellow-400 text-3xl" />
          </a>

          <a
            href="/Login"
            className="bg-yellow-400 px-2 py-1 rounded-xl hidden lg:block"
          >
            Login In
          </a>
        </section>
      </nav>
    </>
  );
}

export default Navbar;
