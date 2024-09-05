import Auth0 from "@/components/Component/0auth";
import AuthForm from "@/components/Component/AuthForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { mutate, isLoading: mutationLoading } = useMutation({
    mutationFn: async (reg) => {
      setIsLoading(true);
      try {
        const res = await axios.post(import.meta.env.VITE_API_REG_POINT, reg);
        console.log(res); 
        return res.data;
      } catch (error) {
        throw error.response ? error.response.data : { message: 'Something went wrong' };
      }
    },
    onSuccess: () => {
        toast.success("Registration Is Successful ", {
          onClose: () => navigate("/profile"),
        });
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Error occurred');
      setIsLoading(false);
    },
  });
  
  
  return (
    <div className="min-h-screen grid place-content-center pt-8 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      )}
      <div
        className={`p-8 bg-white rounded-lg  ${
          isLoading ? "filter blur-sm" : ""
        }`}
      >
        <div className="text-center p-3 space-y-2">
          <h3 className="text-2xl font-extrabold">Create An Account</h3>
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quidem quasi
          </p>
        </div>
        <AuthForm showField={true} mutate={mutate} />
        <Auth0 />
        <div className="text-center mt-3 font-medium">
          <h6>
            Already Have An Account?{" "}
            <Link to="/login" className="text-blue-800">
              Log In
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Register;
