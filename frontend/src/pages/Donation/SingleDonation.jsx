
import { DialogActions } from "@mui/material";
import { BiTime } from "react-icons/bi";
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from "react-icons/fa";
import { GiClassicalKnowledge } from "react-icons/gi";
import { MdBookOnline } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const SingleDonation = () => {
    const donation = useLoaderData();
    const { currentUser } = useUser();
    const role = currentUser?.role;
    const [enrolledDonations, setEnrolledDonations] = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    // console.log(donation)
    const handelSelect = (id) => {
        axiosSecure.get(`/enrolled-donations/${currentUser?.email}`)
            .then(res => setEnrolledDonations(res.data))
            .catch(err => console.log(err))
        if (!currentUser) {
            return error('Please Login First');
        }
        axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
            .then(res => {
                if (res.data.donationId === id) {
                    return toast.error('Already Selected');
                }
                else if (enrolledDonations.find(item => item.donations._id === id)) {
                    return toast.error('Already Enrolled');
                }
                else {
                    const data = {
                        donationId: id,
                        userMail: currentUser.email,
                        date: new Date()
                    }

                    toast.promise(axiosSecure.post('/add-to-cart', data)
                        .then(res => {
                            console.log(res.data);
                        })

                        , {
                            pending: 'Selecting...',
                            success: {
                                render({ data }) {
                                    return `Selected Successfully`;
                                }
                            },
                            error: {
                                render({ data }) {
                                    return `Error: ${data.message}`;
                                }
                            }
                        });
                }
            })

    }
  return (
    <>
      <div
        className=" font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto"
        data-new-gr-c-s-check-loaded="14.1157.0"
        data-gr-ext-installed=""
      >
        {/* breadcrumb or header */}
        <div className='md:w-[80%] mx-auto my-36'>
    <div>
        <h1 className='text-5xl font-bold text-center'>Donation  <span className='text-secondary'>Details</span></h1>
        
    <div className='w-[40%] text-center mx-auto my-4'>
        <p className = 'text-gray-500'>"Find our top endowments, highly supported by donors. 
        These popular picks attract more supporters. Come join us too! !"</p>
    </div>
    </div>
    </div>
        
        <div className="nav-tab-wrapper tabs  section-padding mt-8">
          <div className="container">
            <div className="grid grid-cols-12 md:gap-[30px]">
            <div className="lg:col-span-8 col-span-12">
                <div className="single-donsation-details">
                  <div className="xl:h-[470px] h-[350px] mb-10 donation-main-thumb">
                    <img
                      src={donation?.image}
                      alt=""
                      className=" rounded-md object-fut w-full h-full block"
                    />
                  </div>
                  <h2 className="text-2xl mb-2">{donation?.name}</h2>

                  <div className="author-meta mt-6 sm:flex  lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                    <div className="flex space-x-4 items-center group">
                      <div className="flex-none">
                        <div className="h-12 w-12 rounded">
                          <img
                            src="/src/assets/home/girl.jpg"
                            alt=""
                            className=" object-cover w-full h-full rounded"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className=" text-secondary  ">
                          voleenter
                          <a href="#" className=" text-black">
                            : {donation?.donnerName}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className=" text-secondary  ">
                        Last Update: 
                        <a href="#" className=" text-black ml-1">
                         {new Date(donation?.submitted).toLocaleDateString()}
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="nav-tab-wrapper mt-12">
                   
                    <div id="tabs-content ">
                      <div id="tab1" className="tab-content">
                        <div>
                          <h3 className=" text-2xl mt-8">Donation Description</h3>
                          <p className="mt-4">
                          "Kind Heart Donation & Charity Service is committed to spreading 
                          kindness and making a positive impact through acts of generosity
                          and support. We provide essential supplies, financial aid, and a
                          listening ear to those in need. Our mission is to build a compassionate
                          world where everyone has the opportunity to thrive. By offering diverse 
                          services and fostering community connections, we aim to uplift and empower 
                          individuals facing hardships. Join us in our journey to create a supportive 
                          environment where kindness prevails and everyone feels valued and cared for. 
                          Together, we can make a significant difference in many lives."
                          </p>
                          <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                            <h4 className=" text-2xl">What You will Donation?</h4>
                            <ul className=" grid sm:grid-cols-2 grid-cols-1 gap-6">
                              <li className=" flex space-x-3">
                                <div className="flex-none  relative top-1 ">
                                  <img src="/correct-mark.png" alt="" />
                                </div>
                                <div className="flex-1">
                                Essential supplies: Food, clothing, hygiene products.
                                </div>
                              </li>

                              <li className=" flex space-x-3">
                                <div className="flex-none  relative top-1 ">
                                  <img src="/correct-mark.png" alt="" />
                                </div>
                                <div className="flex-1">
                                Financial aid: Help with bills, medical expenses.
                                </div>
                              </li>

                              <li className=" flex space-x-3">
                                <div className="flex-none  relative top-1 ">
                                  <img src="/correct-mark.png" alt="" />
                                </div>
                                <div className="flex-1">
                                Education support: Scholarships, school materials.
                                </div>
                              </li>

                              <li className=" flex space-x-3">
                                <div className="flex-none  relative top-1 ">
                                  <img src="/correct-mark.png" alt="" />
                                </div>
                                <div className="flex-1">
                                Compassionate world: Building connections, fostering resilience.
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className=" text-2xl">What do you donate?</h4>
                            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
                              <div className=" bg-white  rounded px-5 py-[18px] flex   shadow-box2 space-x-[10px] items-center">
                               
                                <span className="flex-1 text-black">
                                Cash payment
                                </span>
                              </div>
                              <div className=" bg-white  rounded px-5 py-[18px] flex  shadow-box2 space-x-[10px] items-center">
                                <div className="flex-none">
                                  
                                </div>
                                <span className="flex-1 text-black">
                                  Paper &amp; Pencil
                                </span>
                              </div>
                              <div className=" bg-white  rounded px-5 py-[18px] flex  shadow-box2 space-x-[10px] items-center">
                                <div className="flex-none">
                                  
                                </div>
                                <span className="flex-1 text-black">
                                  Internet Connect
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="tab2" className="tab-content">
                        <div>
                          <h3 className=" text-2xl mt-8">Donation Plan</h3>
                          <p className="mt-4">
                          "Supporting Kind Heart Donation & Charity Service through
                          our donation plan enables us to extend a helping hand to 
                          those in need. With options ranging from one-time contributions 
                          to monthly pledges, your generosity fuels our mission of spreading 
                          kindness and making a tangible difference in communities. Whether 
                          you choose our Bronze, Silver, or Gold Tier, each donation plays 
                          a vital role in providing essential supplies, financial aid, 
                          educational support, and emotional assistance. 
                          <br /> <br />Your contributions 
                          not only support individuals facing hardships but also contribute 
                          to the creation of a compassionate world where everyone feels 
                          valued and supported. Join us in our journey to build a brighter 
                          future for all."                           
                          </p>
                        </div>
                      </div>
                    
                    </div>

                  </div>
                  
                </div>
              </div>

              {/* right side */}
              <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0">
                <div className="sidebarWrapper space-y-[30px]">
                  <div className="wdiget custom-text space-y-5 ">
                    <a className="h-[220px]  rounded relative block" href="#">
                      <img
                        src="/src/assets/home/banner-2.jpg"
                        alt=""
                        className=" block w-full h-full object-cover rounded "
                      />
                      <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img src="/donate.jpeg" alt="" />
                      </div>
                    </a>
                    <h3>${donation?.price}</h3>
                   
                    <ul className="list  ">
                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaUser className="inline-flex"/>
                          <div className=" text-black font-semibold">
                          Volunteer
                          </div>
                        </div>
                        <div className="flex-none">{donation?.volunteerName}</div>
                      </li>

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <MdBookOnline/>
                          <div className=" text-black font-semibold">
                            Donation
                          </div>
                        </div>
                        <div className="flex-none">23</div>
                      </li>

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <BiTime />
                          <div className=" text-black font-semibold">
                            Amount required
                          </div>
                        </div>
                        <div className="flex-none">50$</div>
                      </li>

                     

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaLevelUpAlt />
                          <div className=" text-black font-semibold">
                          Payment method
                          </div>
                        </div>
                        <div className="flex-none">Cash</div>
                      </li>

                    </ul>
                  
                  </div>

                  
                     
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleDonation;