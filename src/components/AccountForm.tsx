import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AccountForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const decodeToken = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };
  
  const handleSubmit = async () => {
     try {
      if (isLogin) {
       
        const res = await axios.post("https://adiyogi-travels.onrender.com/api/account/login", {
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);

       
         const payload = decodeToken(res.data.token);
        if (payload) {
          localStorage.setItem("email", payload.sub);
        }

        navigate("/user/dashboard");
      } else {
        
        const res = await axios.post("https://adiyogi-travels.onrender.com/api/account/register", {
          fullName,
          email,
          password,
        });

       
        localStorage.setItem("token", res.data.token);
localStorage.setItem("userId", res.data.userId);

const payload = decodeToken(res.data.token);
if (payload) {
  localStorage.setItem("email", payload.sub);
}

alert("Registration successful!");
navigate("/user/dashboard");
      }
    } catch (error: any) {
      alert("Error: " + (error.response?.data || "Something went wrong"));
    }
  };

  return (
   
      <div className="flex w-full max-w-4xl  bg-white rounded-xl shadow-lg overflow-hidden">
      
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white items-center justify-center p-10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Signup and start your hassle-free travel</h2>
            <p className="text-3xl font-bold mt-2"> Because every mile matters to us</p>
          </div>
        </div>

        
        <div className="w-full md:w-1/2 p-8">
         
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 font-semibold border-b-2 ${
                isLogin ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`ml-6 px-6 py-2 font-semibold border-b-2 ${
                !isLogin ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500"
              }`}
            >
              Register
            </button>
          </div>

         
          <div>
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="border w-full p-3 mb-4 rounded-md focus:ring-2 focus:ring-indigo-400"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              className="border w-full p-3 mb-4 rounded-md focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border w-full p-3 mb-6 rounded-md focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 w-full text-white py-3 rounded-md font-semibold transition"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>

         
          <p className="text-xs text-gray-500 mt-4 text-center">
            By proceeding, you agree to our{" "}
            <a href="#" className="text-indigo-600 underline">
              Privacy Policy
            </a>
            ,{" "}
            <a href="#" className="text-indigo-600 underline">
              User Agreement
            </a>{" "}
            and{" "}
            <a href="#" className="text-indigo-600 underline">
              T&Cs
            </a>
          </p>
        </div>
      </div>
   
  );
}
