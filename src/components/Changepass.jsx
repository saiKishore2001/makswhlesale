import React, { useState } from "react";
import ApiService from "../services/UserService";

function Changepass() {
  // Step 2: Create state variables
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState(""); // Fix: Change from 'loginPassword' to 'newPassword'
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formReset, setFormReset] = useState(false);

  const token = localStorage.getItem('authToken');

  // Step 5: onClick handler to log the data
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // Step 7: Make an API call to retrieve user information
      const userData = await ApiService.getUserData();

      // Step 8: Compare old password with the password from the API response
      const userApiPassword = userData.loginPassword;
      if (oldPassword !== userApiPassword) {
        console.log("Old password does not match the user's current password.");
        return;
      }

      // Step 10: Compare new password and confirm password
      if (newPassword !== confirmPassword) {
        console.log("New password and confirm password do not match.");
        return;
      }

      // Step 11: Call the API to update the password
      const updatePasswordFormData = {
        loginPassword: newPassword,
      };
      

      const updatePasswordResponse = await ApiService.putUserPass(
        updatePasswordFormData,
        token
        /* Pass your token here */
      );

      // Step 12: Log the response or handle it accordingly
      console.log("Password update successful:", updatePasswordResponse);

      // Step 13: Reset the form by updating state variables
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setFormReset(true);

      // Step 14: Set a timeout to reset the formReset state after a short delay
      setTimeout(() => {
        setFormReset(false);
      }, 100);

      // Add any additional logic or UI updates after a successful password change
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle the error appropriately
    }
  };

  return (
    <>
      <div className="min-h-screen py-20  flex items-center">
        <div className="container mx-auto ">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-4/12 md:w-6/12 shadow-lg  bg-slate-50 mx-auto rounded-xl">
            <div className="w-full  py-12 px-8">
              <h2 className="text-3xl mb-2">Change Password</h2>
              <form>
                <div className="mt-5">
                  {/* Step 3: Update input fields to use state variables */}
                  <input
                    type="password" // Use password type for password fields
                    placeholder="Old Password"
                    required
                    name="oldpass"
                    value={oldPassword} // Use state variable
                    onChange={(e) => setOldPassword(e.target.value)} // Step 4: onChange handler
                    className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password" // Use password type for password fields
                    placeholder="New Password"
                    required
                    name="newpass"
                    value={newPassword} // Use state variable
                    onChange={(e) => setNewPassword(e.target.value)} // Step 4: onChange handler
                    className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password" // Use password type for password fields
                    placeholder="Confirm Password"
                    required
                    name="confirmpass"
                    value={confirmPassword} // Use state variable
                    onChange={(e) => setConfirmPassword(e.target.value)} // Step 4: onChange handler
                    className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                  />
                </div>
                <div className="mt-5">
                  {/* Step 5: Attach onClick handler to the Save button */}
                  <button
                    className="w-full bg-yellow-400 py-2 rounded-lg"
                    type="submit"
                    onClick={handleSave} // Step 5: Attach onClick handler
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Changepass;
