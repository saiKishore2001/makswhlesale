import React from 'react'

function Register() {
  return (
    <>
    <div className="min-h-screen py-20  flex items-center">
      <div className="container mx-auto ">
        <div className="flex flex-col mx-auto bg-slate-50 w-10/12 lg:w-5/12 md:8/12 rounded-xl shadow-lg">
          <div className="w-full  py-12 px-8">
            <h2 className="text-3xl mb-2">Register</h2>
            {/* <p className="mb-4">Have a great day !</p> */}
            <form>
            <div className="flex flex-col gap-5 lg:flex-row md:flex-row mt-5 ">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstname"
                    // className={`border ${errors.fname ? 'border-red-500' : 'border-gray-500'} rounded-lg py-1 px-2 w-full`}
                    className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastname"
                    className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                  />
                </div>

                <div className="mt-5">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    name="pass"
                    className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmpass"
                    className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                  />
                </div>
              <div className="mt-5">
                <button
                  className="w-full bg-yellow-400 py-2 rounded-lg"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <div className="mt-5 flex justify-center">
                <p>
                  Already have a account?{" "}
                  <a href="/Login" className='text-blue-600' >
                    Login !
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register