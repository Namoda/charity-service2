import React, { useContext } from 'react'
import {useForm} from "react-hook-form"
import {AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/Social/GoogleLogin';
import axios from 'axios';
import { AuthContext } from '../../ultilities/providers/AuthProvider';

const Register = () => {
  const navigate = useNavigate();
  const {signUp , updateUser, setError} = useContext(AuthContext);
  const { register, 
         handleSubmit,
            watch,
         formState: {errors},} = useForm();
  const onSubmit = (data) => {
    setError("");
    signUp(data.email, data.password).then((result) => {
      const user = result.user;
      if(user){
return updateUser(data.name,data.photoUrl).
then(() => {
  const userImp = {
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
    role: 'user',
    gender : data.gender,
    address : data.address,
    phone : data.phone,

  };

  if(user.email && user.displayName){
    return axios.post('http://localhost:3000/new-user',userImp).then(() => {
      setError("");
      navigate('/');
    
      return 'Registration successful!';
    }).catch((err) => {
      throw new Error(err);
    })
  }
}).catch((err) => {
  setError(err.code);
  throw new Error(err)
});
      }
    });
   // console.log(data.password)
   // console.log(data.confirmPassword)
  };
  const password = watch('password', "")
  return (
    <div className="flex justify-center items-center pt-14 bg-gray-100">
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-3x1 font-bold text-center mb-6'>Please Register</h2>

        {/* form data*/}

        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center gap-5'>
          <div className='mb-4'>
            <lable htmlFor="name" className = "block text-gray-700 font-bold mb-2">
            <AiOutlineUser className='inline-block mr-2 mb-1 text-lg'/>
              name
            </lable>
            <input type="text" placeholder='Enter your name' {...register("name" , { required:true})} 
             className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"/>
          </div>

          <div className='mb-4'>
            <lable htmlFor="email" className = "block text-gray-700 font-bold mb-2">
            <AiOutlineMail className='inline-block mr-2 mb-1 text-lg'/>
              Email
            </lable>
            <input type="text" placeholder='Enter your Email Address' {...register("email" , { required:true})} 
             className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"/>
          </div>

        </div>

        <div className='flex items-center gap-5'>
          <div className='mb-4'>
            <lable htmlFor="password" className = "block text-gray-700 font-bold mb-2">
            <AiOutlineLock className='inline-block mr-2 mb-1 text-lg'/>
              Password
            </lable>
            <input type="password" placeholder='Enter Password' {...register("password" , { required:true})} 
             className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"/>
          </div>

          <div className='mb-4'>
            <lable htmlFor="confirmpassword" className = "block text-gray-700 font-bold mb-2">
            <AiOutlineLock className='inline-block mr-2 mb-1 text-lg'/>
              Confirm Password
            </lable>
            <input type="password" placeholder='Confirm Password'  {...register('confirmPassword', {
                                    required: true,
                                    validate: (value) => value === password || "password not matched!" ,
                                })} 
             className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"/>
          </div>
          
        </div>

        <div className="flex items-center gap-5">
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
                                <AiOutlinePhone className="inline-block mr-2 mb-1 text-lg" />
                                Phone Number
                            </label>
                            <input
                                placeholder="Phone Number"
                                type="tel"
                                {...register('phone', { required: true })}
                                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="photoUrl" className="block text-gray-700 font-bold mb-2">
                                <AiOutlinePicture className="inline-block mr-2 mb-1 text-lg" />
                                Photo URL
                            </label>
                            <input
                                placeholder="Photo URL"
                                type="text"
                                {...register('photoUrl')}
                                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                    </div>
                        <div className="">
                            <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
                                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                                Gender
                            </label>
                            <select
                                {...register('gender', { required: true })}
                                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                                <HiOutlineLocationMarker className="inline-block mr-2 mb-1 text-lg" />
                                Address
                            </label>
                            <textarea
                                {...register('address', { required: true })}
                                className="w-full border resize-none border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                rows="3"
                                placeholder="Enter your address"
                            ></textarea>
                        </div>
                    <div className="text-center">
                        <button type="submit" className="bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md">
                            Register
                        </button>
                        {
                        errors.password && (
                            <div className="text-red-500 text-sm w-full mt-1">
                                <p>Password doesn't match</p>
                            </div>
                        )}
                    </div>

        </form>

        <p className='text-center mt-4'>
          Already have an account?
          <Link to="/login" className='underline text-secondary'>
            {" "}
            Login
          
          </Link>
            
        </p>
        <GoogleLogin/>
      </div>
    </div>
  )
}

export default Register