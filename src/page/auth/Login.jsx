import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuth, auth }) => {
  // State hooks for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate(); // Initialize useNavigate hook

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission (page reload)

    // Implement your login logic here.
    // For example, send email and password to the server via an API call.
    console.log('Attempting login:', { email, password });
    setAuth(true); // Simulate successful authentication
  };

  // Effect hook to navigate after successful authentication
  useEffect(() => {
    if (auth) {
      nav('/hc_h_m/'); // Navigate to home page if authenticated
    }
    console.log('Login component mounted/auth changed, auth status:', auth);
    // Cleanup function (optional, runs when component unmounts or dependencies change)
    return () => {
      console.log('Login component unmounted or auth dependency changed cleanup.');
    };
  }, [auth, nav]); // Dependencies array: runs when 'auth' or 'nav' changes

  return (
      <div
          className="flex items-center justify-center min-h-screen" // flexbox for centering, full height, light gray background
      >
        <div
            className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md box-border" // white background, generous padding, rounded corners, shadow, max width
        >
          <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">Login</h2> {/* Centered, large bold text, dark gray */}
          <form className="flex flex-col" onSubmit={handleSubmit}> {/* flex column layout for form */}
            <div className="mb-4"> {/* Margin bottom for spacing */}
              <p className="mb-1 text-gray-700 text-sm">Email address</p> {/* Small text, gray color */}
              <input
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" // full width, padding, border, rounded, focus styles, base font size
              />
            </div>
            <div className="mb-6"> {/* Larger margin bottom for password field */}
              <p className="mb-1 text-gray-700 text-sm">Password</p>
              <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" // full width, padding, border, rounded, focus styles, base font size
              />
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 text-lg cursor-pointer" // blue button, white text, bold, rounded, hover effect, larger font size
            >
              Login
            </button>
          </form>

          <div className="flex justify-between items-center mt-6 text-sm"> {/* Flexbox for links, margin top, small font size */}
            <div className="flex space-x-4"> {/* space-x-4 for horizontal spacing between links */}
              <a href="#" className="text-blue-600 hover:underline">Forgot ID?</a> {/* Blue links, underline on hover */}
              <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
            </div>
            <button
                onClick={() => nav('/hc_h_m/register')}
                className="text-blue-600 hover:underline px-0 py-0 text-sm" // Blue text, underline on hover, no padding, small font size
            >
              Register
            </button>
          </div>
        </div>
      </div>
  );
};

export default Login;