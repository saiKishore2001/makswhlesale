import axios from "axios";

const API_BASE_URL = "http://localhost:5175";

const MAK_API = "http://api.makarenagroup.com";

const token = localStorage.getItem("authToken");

const ApiService = {
  PostCartData: async (formData) => {
    try {
      const response = await axios.post(
        `${MAK_API}/DBClass/SendCartDetails`,
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  putCartData: async () => {
    try {
      const response = await axios.put(
        `${MAK_API}/DBClass/UpdateCartDetails`,
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

//   getCartData: async () => {
//     try {
//       const response = await axios.get(`${MAK_API}/DBClass/GetCartDetails`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },

  ClearCartData: async (data) => {
    try {
      // Assuming 'token' is a string, adjust the data accordingly
      // const dataToSend = token;
      // const tokenWithQuotes = `"${token}"`;

      const response = await axios.post(`${MAK_API}/DBClass/ClearCart`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Specify the correct content type
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCartItem: async (data) => {
    try {
      const response = await axios.post(
        `${MAK_API}/DBClass/DeleteCartItem`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCartItem: async (data, token) => {
    try {
      const response = await axios.post(
        `${MAK_API}/DBClass/UpdateCartDetails`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  sendCartDetails: async (cartItemPayload) => {
    try {
      const { token, cartItem } = cartItemPayload;

      const payload = {
        EmailID: token,
        ImageId: cartItem.imageId,
        ImageName: cartItem.imageName,
        ImagePrice: cartItem.imagePrice,
        TotalPrice: cartItem.imagePrice,
        Quantity: cartItem.quantity,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const userToken = token; // Change this line

      headers["Authorization"] = `Bearer${userToken}`;
      const response = await axios.post(
        `${MAK_API}/DBClass/SendCartDetails`,
        payload,
        { headers }
      );
      console.log("Updated CartItems:", response.data);
      return response.data;
    } catch (error) {
      // Handle the error here, you can log it or perform any other necessary action
      console.error("Error in sendCartDetails:", error);
      throw error;
    }
  },



  getCartData: async () => {
    try {
        const response = await axios.get(`${MAK_API}/DBClass/GetCartDetails`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data
    } catch (error) {
        throw error;
    }
},
};

export default ApiService;
