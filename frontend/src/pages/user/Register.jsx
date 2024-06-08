import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/Social/GoogleLogin';
import axios from 'axios';
import { AuthContext } from '../../ultilities/providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const { signUp, updateUser, setError } = useContext(AuthContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setError("");
    signUp(data.email, data.password).then((result) => {
      const user = result.user;
      if (user) {
        return updateUser(data.name, data.photoUrl).then(() => {
          const userImp = {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            role: 'user',
            gender: data.gender,
            address: data.address,
            phone: data.phone,
            nic: data.nic,
            province: data.province,
          };

          if (user.email && user.displayName) {
            return axios.post('http://localhost:3000/new-user', userImp).then(() => {
              setError("");
              toast.success('Registration successful!');
              navigate('/');
            }).catch((err) => {
              toast.error('Registration failed!');
              throw new Error(err);
            });
          }
        }).catch((err) => {
          setError(err.code);
          toast.error('User update failed!');
          throw new Error(err);
        });
      }
    });
  };

  const password = watch('password', "");

  return (
    <div className="flex justify-center items-center pt-14 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Please Register</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-5">
            <div className="mb-4 w-full">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                Name
              </label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                {...register("name", { required: "Name is required" })} 
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                <AiOutlineMail className="inline-block mr-2 mb-1 text-lg" />
                Email
              </label>
              <input 
                type="email" 
                placeholder="Enter your Email Address" 
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address"
                  }
                })} 
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="mb-4 w-full">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                Password
              </label>
              <input 
                type="password" 
                placeholder="Enter Password" 
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  }
                })} 
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                Confirm Password
              </label>
              <input 
                type="password" 
                placeholder="Confirm Password" 
                {...register('confirmPassword', {
                  required: "Confirm Password is required",
                  validate: (value) => value === password || "Passwords do not match"
                })} 
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="mb-4 w-full">
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                <AiOutlinePhone className="inline-block mr-2 mb-1 text-lg" />
                Phone Number
              </label>
              <input 
                type="tel" 
                placeholder="Phone Number" 
                {...register('phone', { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: "Enter a valid phone number"
                  }
                })} 
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="photoUrl" className="block text-gray-700 font-bold mb-2">
                <AiOutlinePicture className="inline-block mr-2 mb-1 text-lg" />
                Photo URL
              </label>
              <input 
                type="text" 
                placeholder="Photo URL" 
                {...register('photoUrl')} 
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
              <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
              Gender
            </label>
            <select 
              {...register('gender', { required: "Gender is required" })} 
              className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
              <HiOutlineLocationMarker className="inline-block mr-2 mb-1 text-lg" />
              Address
            </label>
            <textarea 
              {...register('address', { required: "Address is required" })} 
              className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" 
              rows="3" 
              placeholder="Enter your address"
            ></textarea>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>
          <div className="mb-4 w-full">
              <label htmlFor="nic" className="block text-gray-700 font-bold mb-2">
                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                NIC
              </label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                {...register("nic", { required: "NIC is required" })} 
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.nic.message}</p>}
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                Province
              </label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                {...register("province", { required: "Name is required" })} 
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
        
          <div className="text-center">
            <button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white py-2 px-4 rounded-md transition duration-300">
              Register
            </button>
          </div>
        </form>

        <p className="text-center mt-4">
          Already have an account?
          <Link to="/login" className="underline text-purple-700 hover:text-purple-900">
            {" "}
            Login
          </Link>
        </p>
        <GoogleLogin />
      </div>
    </div>
  );
}

export default Register;
