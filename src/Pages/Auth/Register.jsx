import Auth0 from "@/components/Component/0auth";
import AuthForm from "@/components/Component/AuthForm";
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
    
  return (
    <div className="min-h-screen  grid place-content-center">
      <div className="text-center p-3 space-y-2">
        <h3 className="text-2xl font-extrabold">Create An Account</h3>
        <p className="mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          quidem quasi
        </p>
      </div>
      <AuthForm showField={true}  />
      <Auth0 />
      <div className="text-center mt-3 font-medium">
        <h6>
          Already Have An Account? <Link to='/login' className="text-blue-800">Log In</Link>
        </h6>
      </div>
    </div>
  );
};

export default Register;
