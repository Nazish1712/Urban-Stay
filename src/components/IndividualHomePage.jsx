import { useState} from "react"
import {MapPin, Star, Users, BedDouble, Bath, Waves, ArrowRight, Check} from "lucide-react"
import HomeInfoShimmer from "./HomeInfoShimmer"
import {useParams} from "react-router-dom"
import useHomeInfo from "../utils/useHomeInfo"
import { useDispatch, useSelector } from "react-redux"
import { addItem } from "../utils/cartSlice" 
import {motion, AnimatePresence} from "framer-motion"

const IndividualHomePage = () => {


     const [currentImageIndex, setCurrentImageIndex] = useState(0)

     const {homeId} = useParams()
     
     const homeInfo = useHomeInfo(homeId)

     const dispatch = useDispatch()

     const bookedItems = useSelector((state) => state.cart.items)

     const isAlreadyBooked = bookedItems.some((item) => item.id === homeId)
    
    if(homeInfo === null) return <HomeInfoShimmer/>;

    const {name, locality, areaName, description, pricePerDay, rating, reviews, guests, bedrooms, bathrooms, pool, images} = homeInfo?.info

    

    const handleAddBookingItem = () => {
        //dispatch an action
       if (isAlreadyBooked) return;

        const bookingDetails = {
            id: homeId,
            name:name,
            pricePerDay:pricePerDay,
            locality: locality,
            areaName: areaName,
            image: images[0],
            rating: rating,
        }
        dispatch(addItem(bookingDetails))
    }
   

    return(
    <div className="pt-18 sm:pt-20 px-5 sm:px-6 lg:px-10 max-w-3xl mx-auto flex flex-col gap-4 min-h-screen">
        <div className="relative overflow-hidden rounded-3xl border border-blue-300/30 h-[250px] md:h-[350px] bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`${name} - preview ${currentImageIndex + 1}`}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full h-full object-cover block"
          />
        </AnimatePresence>
      </div>
        <div className="flex justify-center items-center gap-2">
                            <div onClick={()=> setCurrentImageIndex(0)} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer  ${currentImageIndex === 0? "bg-gradient-to-b from-blue-600 to-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.9)] scale-110": "bg-white/90"} `}/>
                            <div onClick={()=> setCurrentImageIndex(1)}className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${currentImageIndex === 1? "bg-gradient-to-b from-blue-600 to-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.9)] scale-110": "bg-white/90"}`}/>
                           </div>
        <div className="flex flex-col gap-3">
            <h3 className="flex gap-1.5 items-center justify-center">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white/60"/>
                <span className="text-sm sm:text-base text-white/60">{locality}, {areaName}</span>
            </h3>
            <h2 className="text-white text-center font-semibold text-lg sm:text-xl">{name}</h2>
            <div className="max-w-2xs sm:max-w-3xs  mx-auto border flex justify-center items-center gap-1.5 px-2 py-1 rounded-2xl bg-white/10 backdrop-blur-sm  border-white/10 hover:bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <div className="flex items-center gap-1 ">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"/>
                <span className="text-sm sm:text-base text-white">{rating}</span>
              </div>
              <div className="h-0.5 w-0.5 sm:h-1 sm:w-1 bg-white rounded-full"></div>
              <div className="text-sm sm:text-base text-white/60">{reviews} reviews</div>
            </div>
            </div>
        <p className="text-sm sm:text-base text-white/60 text-center">
         {description}
        </p>
        <div className="h-px w-full bg-gradient-to-r from-blue-200/10 via-blue-400/20 to-blue-200/10 shadow-2xl">
        </div>
        <div className="flex flex-col gap-3 items-center">
            <h3 className="text-sm sm:text-base font-semibold ">HIGHLIGHTS</h3>
            <div className="grid grid-cols-2 gap-x-30 gap-y-10 md:grid-cols-4">
                <div className="flex flex-col justify-center items-center">
                    <div className=" w-10 h-10  flex items-center justify-center border rounded-full bg-white/10 backdrop-blur-sm  border-white/10 hover:bg-white/5 
                    transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5"/>
                    </div>
                    <span>{guests} Guest</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className=" w-10 h-10  flex items-center justify-center border rounded-full bg-white/10 backdrop-blur-sm  border-white/10 hover:bg-white/5 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <BedDouble className="w-4 h-4 sm:w-5 sm:h-5"/>
                    </div>
                    <span>{bedrooms} Bedroom</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className=" w-10 h-10  flex items-center justify-center border rounded-full bg-white/10 backdrop-blur-sm  border-white/10 hover:bg-white/5 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <Bath className="w-4 h-4 sm:w-5 sm:h-5"/>
                    </div>
                    <span>{bathrooms} Shower</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className=" w-10 h-10  flex items-center justify-center border rounded-full bg-white/10 backdrop-blur-sm  border-white/10 hover:bg-white/5 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <Waves className="w-4 h-4 sm:w-5 sm:h-5"/>
                    </div>
                    <span>{pool} pool</span>
                </div>

            </div>
        </div>
        <div className="mt-auto">
        <div className="h-px w-full bg-gradient-to-r from-blue-200/10 via-blue-400/20 to-blue-200/10 shadow-2xl"></div>
        <div className="flex justify-between items-center py-3 ">
            <div className="font-semibold text-base sm:text-lg">
                {pricePerDay}/day
            </div>
            <button 
            onClick={handleAddBookingItem}
            disabled={isAlreadyBooked}
            className={`flex justify-center items-center group px-4 sm:px-5 py-2 rounded-lg font-semibold text-base sm:text-lg transition-all duration-500 gap-2 cursor-pointer
                ${isAlreadyBooked 
                    ? "bg-green-500/20 text-green-400 border border-green-500/50 cursor-not-allowed" 
                    : "bg-gradient-to-b from-blue-600 to-blue-400 hover:scale-105" 
                }`} >
            {isAlreadyBooked ? (
                            <>
                                <span>Booked</span>
                                <Check className="w-4 h-4 sm:h-5 sm:w-5" />
                            </>
                        ) : (
                            <>
                                <span>Book</span>
                                <ArrowRight className="w-4 h-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </>
                        )}
          </button>
        </div>
        </div>
        
    </div>
        )
}

export default IndividualHomePage