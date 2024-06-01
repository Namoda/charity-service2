import React, { useEffect, useState } from 'react';
import { useUser } from '../../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import moment from 'moment';
import { MdDeleteSweep } from 'react-icons/md';
import { FiDollarSign } from 'react-icons/fi';
import Swal from 'sweetalert2';

const SelectedDonation = () => {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [page, setPage] = useState(1);
  const itemPerPage = 5;
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentUser?.email}`)
      .then((res) => {
        setDonations(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [currentUser, axiosSecure]);

  const totalPrice = donations.reduce((acc, item) => acc + parseInt(item.price, 10), 0);

  const handlePay = (id) => {
    const item = donations.find((item) => item._id === id);
    const price = item.price;
    navigate('/dashboard/user/payment', {
      state: { price: price, itemId: id },
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-cart-item/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            const newDonations = donations.filter((item) => item._id !== id);
            setDonations(newDonations);
          }
        }).catch((error) => console.log(error));
      }
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const paginatedDonations = donations.slice((page - 1) * itemPerPage, page * itemPerPage);
  const totalPages = Math.ceil(donations.length / itemPerPage);

  return (
    <div>
      <div className="my-6 text-center">
        <h1 className="text-4xl text-center font-bold">My <span className='text-secondary'>Selected</span> Donation</h1>
      </div>

      <div className="h-screen py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Select Donation:</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">#</th>
                      <th className="text-left font-semibold">Donation</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Date</th>
                      <th className="text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.length === 0 ? (
                      <tr>
                        <td colSpan="5" className='text-center text-2xl font-bold'>
                          No Donations Found
                        </td>
                      </tr>
                    ) : (
                      paginatedDonations.map((item, idx) => {
                        const letIdx = (page - 1) * itemPerPage + idx + 1;
                        return (
                          <tr key={item._id}>
                            <td className='py-4'>{letIdx}</td>
                            <td className='py-4'>
                              <div className='flex items-center'>
                                <img src={item.image} alt="" className='h-16 w-20 mr-4' />
                                <span>{item.name}</span>
                              </div>
                            </td>
                            <td className='py-4'>${item.price}</td>
                            <td className='py-4'>
                              <p className='text-green-700 text-sm'>
                                {moment(item.submitted).format("MMMM Do YYYY")}
                              </p>
                            </td>
                            <td className='py-4 flex gap-2'>
                              <button onClick={() => handleDelete(item._id)} className='px-3 py-1 cursor-pointer bg-red-500 rounded-3xl text-white font-bold'><MdDeleteSweep /></button>
                              <button onClick={() => handlePay(item._id)} className='px-3 py-1 cursor-pointer bg-green-500 rounded-3xl text-white font-bold flex'><FiDollarSign className="mr-2" /></button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
                {donations.length > itemPerPage && (
                  <div className="flex justify-center mt-4">
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-4 py-2 bg-gray-300 rounded-l-lg">Previous</button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 ${page === i + 1 ? 'bg-secondary text-white' : 'bg-gray-300'}`}>{i + 1}</button>
                    ))}
                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="px-4 py-2 bg-gray-300 rounded-r-lg">Next</button>
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-1/5 md:ml-auto">
              <div className='bg-white rounded-lg shadow-md p-6'>
                <h2 className='text-lg font-semibold mb-4'>Summary</h2>
                <div className='flex justify-between mb-2'>
                  <span>Total Donation</span>
                  <span>${totalPrice}</span>
                </div>
                <hr className='my-2' />
                <div className='flex justify-between mb-2'>
                  <span className='font-semibold'>Total</span>
                  <span className='font-semibold'>${totalPrice.toFixed(2)}</span>
                </div>
                <button disabled={totalPrice <= 0} onClick={() => navigate('/dashboard/user/payment', { state: { price: totalPrice, itemId: null } })} className='bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full'>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedDonation;
