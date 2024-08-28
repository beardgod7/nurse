import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { profileSchema } from "@/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { mutate, isLoading: mutationLoading } = useMutation({
    mutationFn: async (prof) => {
      setIsLoading(true);
      const res = await axios.post(import.meta.env.VITE_API_PROFILE_POINT, prof);
      console.log(res);
      return res;
    },
    onSuccess: () => {
      toast.success("User registration successful!", {
        onClose: () => navigate("/login"),
      });
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error("Error in user registration", error.message);
      setIsLoading(false);
    },
  });

  const initialValues = { name: "", phone: "", gender: "" };
  const validationSchema = profileSchema;
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
        const id = localStorage.getItem(JSON.parse(reg.id));
        const IdValues = { ...values, id }; 
        mutate(IdValues);
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
          <h3 className="text-xl font-extrabold">Complete Your Profile</h3>
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="fullName" className="font-semibold">
              Name
            </label>
            <Input
              type="text"
              name="name"
              className="bg-[#E8F0FE] border-none"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name ? (
              <p className="text-red-600 font-medium text-[0.7em] ps-2">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold">
              Phone Number
            </label>
            <Input
              type="text"
              name="phone"
              className="bg-[#E8F0FE] border-none"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            {errors.phone && touched.phone ? (
              <p className="text-red-600 text-[0.7em] ps-2 font-medium">
                {errors.phone}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="font-semibold">
              Gender
            </label>
            <Select
              name="gender"
              onValueChange={(value) => setFieldValue("gender", value)} // Update Formik state
              onBlur={handleBlur}
              value={values.gender} // Bind to Formik state
            >
              <SelectTrigger className="bg-[#E8F0FE] border-none">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="bg-[#E8F0FE] border-none mb-8">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>

            {errors.gender && touched.gender ? (
              <p className="text-red-600 font-medium text-[0.7em] ps-2">
                {errors.gender}
              </p>
            ) : null}
          </div>
          <Button
            type="submit"
            className="bg-blue-800 text-white font-bold w-full rounded-full hover:bg-blue-950"
          >
            Complete Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
