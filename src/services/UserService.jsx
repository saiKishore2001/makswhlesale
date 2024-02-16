import axios from "axios";

// const API_BASE_URL = 'http://localhost:5175/DBClass/GetPagedImages?page=1&pageSize=6';
const API_BASE_URL = "http://localhost:5175";

const MAK_API = "http://api.makarenagroup.com";

const token = localStorage.getItem("authToken");

const ApiService = {
  postloginData: async (formData) => {
    try {
      const response = await axios.post(`${MAK_API}/DBClass/Login`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserData: async () => {
    try {
      const response = await axios.get(
        `${MAK_API}/DBClass/Getprofilefromclient`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userDataArray = response.data;

      // Check if userDataArray is not empty
      if (userDataArray && userDataArray.length > 0) {
        // Return only the first JSON object from the array
        return userDataArray[0];
      } else {
        // Return null or handle accordingly if the array is empty
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  putUserData: async (formData, token) => {
    try {
      const response = await axios.post(
        `${MAK_API}/DBClass/UpdateProfile`,
        formData, // Pass formData as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Add Content-Type header
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  putUserPass: async (formdata, token) => {
    try {
      const response = await axios.post(
        `${MAK_API}/DBClass/UpdatePassword`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Add Content-Type header
          },
        }
      );
      return response.data;
    } catch {
      throw error;
    }
  },

  getOrdersData: async (token) => {
    try {
      const response = await axios.get(`${MAK_API}/DBClass/getorderbyemail`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Add Content-Type header
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getOrdersById: async (paymentId) => {
    try {
      const response = await axios.get(
        `${MAK_API}/DBClass/getorder/${paymentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ApiService;
