import axios from "axios";

const API_BASE_URL = "http://localhost:5175";

const MAK_API = "http://api.makarenagroup.com";

const token = localStorage.getItem("authToken");

const FilterService = {
  //    getBrands : async () => {
  //         try {
  //           const response = await get(`${MAK_API}/GetBrand`);
  //           console.log(response);
  //           if (!response.ok) {
  //             throw new Error(`Failed to fetch brands. Status: ${response.status}`);

  //           }

  //           const brandList = await response.json();
  //           return brandList;
  //         } catch (error) {
  //           console.error('Error fetching brands:', error.message);
  //           throw error;
  //         }
  //       },

  getBrands: async () => {
  
  
    try {
      // Make sure that MAK_API is correctly defined
      const response = await axios.get(`${MAK_API}/DBClass/GetBrand`);
  
  
      // Check the response status and handle accordingly
      if (response.status === 200) {
        // Assuming the response data is an array of brands
        const brandList = response.data;
        // console.log("BrandProducts",brandList)
        return brandList;
      } else {
        console.error("Unexpected response status:", response.status);
       
        return null;
      }
    } catch (error) {
     
      throw error;
    }
  },


  fetchProductsByBrand: async (brandId) => {
    try {
        const response = await axios.get(`${MAK_API}/DBClass/byBrandId/${brandId}`);
        // console.log("Brands",response)
   
    return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProductsByCategoryIdAndBrandId:async(categoryId,brandId)=>{
    try {
        const response = await axios.get(`${MAK_API}/DBClass/byCategoryIdAndBrandId/${categoryId},${brandId}`);
         console.log("Brand and Category",response)
   
    return response.data;
    } catch (error) {
      throw error;
    }

  },


  getCatagory: async () => {
  
  
    try {
      // Make sure that MAK_API is correctly defined
      const response = await axios.get(`${MAK_API}/DBClass/GetCategories`);
  
  
      // Check the response status and handle accordingly
      if (response.status === 200) {
        // Assuming the response data is an array of brands
        const CatagoryList = response.data;
        // console.log("BrandProducts",brandList)
        return CatagoryList;
      } else {
        console.error("Unexpected response status:", response.status);
       
        return null;
      }
    } catch (error) {
     
      throw error;
    }
  },





  getCategoriesByBrandId:async(brandId) =>{
    try {
        const response = await axios.get(`${MAK_API}/DBClass/categoriesByBrandId/${brandId}`);
         console.log("brandId",response)
   
    return response.data;
    } catch (error) {
      throw error;
    }

  }




};
export default FilterService;
