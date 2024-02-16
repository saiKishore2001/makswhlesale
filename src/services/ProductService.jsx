import axios from "axios";

// const API_BASE_URL = 'http://localhost:5175/DBClass/GetPagedImages?page=1&pageSize=6';
const API_BASE_URL = "http://localhost:5175";
const MAK_API = "http://api.makarenagroup.com";

const productApiService = {
  // getAllData: async (page, pageSize) => {
  //     try {
  //         const response = await axios.get(`${API_BASE_URL}/DBClass/GetPagedImages?page=${page}&pageSize=${pageSize}`);
  //         return response.data
  //     } catch (error) {
  //         throw error;
  //     }
  // }

  getAllData: async (page, pageSize) => {
    try {
      const response = await axios.get(
        `${MAK_API}/DBClass/GetPagedImages?page=${page}&pageSize=${pageSize}`
      );
    //   return {
    //     items: response.data, // Assuming the array of products is directly in response.data
    //     totalItems: response.headers["x-total-count"], // Adjust the header key based on your API
    //   };
    return response.data;
    } catch (error) {
      throw error;
    }
  },

  getimageData: async (currentPage,productsPerPage) => {
    try {
      const response = await axios.get(
        `${MAK_API}/DBClass/GetPagedImages?page=${currentPage}&pageSize=${productsPerPage}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  },

  getDatabyName: async (imageName) => {
    try {
      const trimmedImageName = imageName.trim();
      const response = await axios.get(
        `${MAK_API}/DBClass/GetImages?imageName=${trimmedImageName}`
      );
      return {
        items: response.data, // Assuming the array of products is directly in response.data
        totalItems: response.headers["x-total-count"], // Adjust the header key based on your API
      };
    } catch (error) {
      console.error("Error in API call:", error);
      // if (error.response && error.response.status === 404) {
      //     return { error };
      // }
      throw new Error("Error fetching data from the server");
    }
  },
};

export default productApiService;
