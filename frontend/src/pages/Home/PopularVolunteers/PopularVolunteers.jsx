import React, {useState, useEffect} from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import img from "../../../assets/home/girl.png";

const PopularVolunteers = () => {
    const [Volunteers, setVolunteers] = useState([]);
    const axiosFetch = useAxiosFetch();
    useEffect(()=> {
        axiosFetch.get('/popular-volunteers').then((data) =>{
           setVolunteers(data.data) 
        }).catch((err) => {console.log(err)})
    }, []);
    //console.log(Volunteers)
  return (
    <div className='md:w-[80%] mx-auto my-36'>
        <div>
            <h1 className='text-5xl font-bold text-center'>Our <span className='text-secondary'>Best</span> Volunteers</h1>
            
        <div className='w-[40%] text-center mx-auto my-4'>
            <p className = 'text-gray-500'>Volunteers are vital for Kind Heart Charity Service, extending reach, offering diverse skills,
             minimizing costs,fostering community connections, and bringing passion and dedication.</p>
        </div>
        </div>
        {
            Volunteers ? <>
    <div className='gird mb-28 md:grid-flow-cols-2 lg:grid-cols-4 w-[90%] gap-4 mx-auto'>
    {
        Volunteers?.slice(0,4).map((Volunteers, i) =>(
            <div key={i} className='flex dark:text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md px-8 rounded-md'>
                <div className='flex-col flex gap-6 md:gap-8'>
                    <img className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"src={Volunteers?.Volunteers?.photoUrl || `${img}`} alt=""/>
                    <div className='flex flex-col text-center'>
                        <p className='font-medium text-lg dark:text-white text-gray-800'>{Volunteers?.Volunteers?.name}</p>
                        <p className='text-gray-500 whitespace-nowrap'>Volunteers</p>
                        <p className='text-gray-500 whitespace-nowrap'>Total Donner:
                        {Volunteers?.totalEnrolled}</p>
                    </div>
                    </div>
                    </div>
        ))
    }
    </div>
    </> :<><p>No Volunteers Availble</p></>   
        }
        
        </div>
    
  
  )
}

export default PopularVolunteers;