import React, { useState, useEffect } from "react";
import ApiService from "../services/UserService";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    ownerName: "",
    address1: "",
    address2: "",
    address3: "",
    phoneNumber: "",
    emailID: "",
    loginPassword: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getUserData();
        setUserData(data);

        // Update the form state with fetched user data
        setFormState({
          ownerName: data.ownerName,
          address1: data.address1,
          address2: data.address2,
          address3: data.address3,
          phoneNumber: data.phoneNumber,
          emailID: data.emailID,
          loginPassword: data.loginPassword,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error, e.g., display an error message
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the putUserData method from ApiService to update user data
      const token = localStorage.getItem('authToken');
      setLoading(true);
      await ApiService.putUserData(formState, token);
      console.log('User data updated successfully!');
      // Optionally, you can fetch updated data after the update if needed
      const updatedData = await ApiService.getUserData();
      setUserData(updatedData);

      toast.success('Profile has been updated!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log('edited');
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle error, e.g., display an error message
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen py-20 flex items-center">
        <div className="container mx-auto ">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-4/12 md:w-6/12 shadow-lg  bg-slate-50 mx-auto rounded-xl">
            <div className="w-full  py-12 px-8">
              <h2 className="text-3xl mb-2">Profile Details</h2>
              {loading ? (
                <div>
                  <div className="text-center">
                    <ClipLoader color="black" loading={loading} size={50} />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mt-5">
                    <input
                      type="text"
                      placeholder="Owner Name"
                      name="ownerName"
                      value={formState.ownerName}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      placeholder="Email ID"
                      name="emailID"
                      value={formState.emailID}
                      onChange={handleInputChange}
                      required
                      disabled
                      className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      placeholder="Address 1"
                      name="address1"
                      value={formState.address1}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                    />
                  </div>

                  <div className="mt-5">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={formState.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                    />
                  </div>

                  <div className="mt-5">
                    <a href="/Changepass" className="text-blue-800">
                      Change Password
                    </a>
                  </div>
                  {/* Add more fields as needed */}
                  <div className="mt-5">
                    <button
                      className="w-full bg-yellow-400 py-2 rounded-lg"
                      type="submit"
                    >
                      Edit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Profile;
