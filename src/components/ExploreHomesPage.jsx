import HomeCard from "./HomeCard.jsx"
import {Star, DollarSign , ArrowRight , House} from "lucide-react"
import {useState , useEffect} from "react"
import Shimmer from "./Shimmer.jsx"
import {HOME_LISTING_API} from "../utils/constants.js"
import {Link} from "react-router-dom"
import { SEARCH_SUGGESTIONS_API } from "../utils/constants.js"


const ExploreHomesPage =() => {
    const [listOfHomes, setListOfHomes] = useState([])

    const [filteredHomes, setFilteredHomes] = useState([])

    const [searchText , setSearchText] = useState("")

    const [activeFilter , setActiveFilter] = useState("allHomes")

    
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    
     useEffect(()=>{
        fetchData()
     },[])

     const fetchData = async () => {
        try{const response = await fetch(HOME_LISTING_API)
        
        const data = await response.json()

        setListOfHomes(data?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.homes)

        setFilteredHomes(data?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.homes)}
        catch (error) {
            console.error("Failed to fetch homes:", error)
        }
     }

    useEffect(()=>{
        const timer = setTimeout(() => {
            if(searchText.trim() !== ""){
                getSearchSuggestions()
            }
            else{
                setSuggestions([])
            }}
            ,200)

            return () => {
                clearTimeout(timer)
            }
    }, [searchText])

     const getSearchSuggestions = async () => {
        try{
        const data = await fetch(SEARCH_SUGGESTIONS_API)
        const json = await data.json()
        const query = searchText.toLowerCase()
        const matches = json[1].filter((item)=> item.toLowerCase().includes(query))
        setSuggestions(matches.slice(0,5))
        }
        catch (error) {
            console.error("Failed to Fetch Suggestion:" , error)
        }
     }

     const handleSearch = (query) => {
        const term = query.trim().toLowerCase()
        
        setActiveFilter("")

        const searchHomes = listOfHomes.filter((home) => {
          const name = (home?.info?.name || "").toLowerCase()
          const locality = (home?.info?.locality || "").toLowerCase()
          const area = (home?.info?.areaName || "").toLowerCase()
          const fullLocation = `${locality}, ${area}`
      
          return (
            name.includes(term) ||
            locality.includes(term) ||
            area.includes(term) ||
            fullLocation.includes(term) ||
            term.includes(locality) 
          )
        })
      
        setFilteredHomes(searchHomes)
      }

      return listOfHomes.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-45 px-6">
          {Array(6)
            .fill("")
            .map((_, index) => (
              <Shimmer key={index} />
            ))}
        </div>
      ) : (
        <div className="pt-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
          <h2 className="text-left text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 lg:mb-5 bg-gradient-to-l from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Find your perfect spot
          </h2>
    
          <div className="flex flex-col">
            <div className="flex gap-3 mb-3 sm:mb-4">
              {/* Relative wrapper for input and floating dropdown */}
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-1 outline-none bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-1 focus:ring-white/40 text-white placeholder:text-gray-400 text-sm sm:text-base"
                  placeholder="Search for location"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
    
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 py-2 z-50 overflow-hidden">
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setSearchText(suggestion)
                            handleSearch(suggestion)
                            setShowSuggestions(false)
                          }}
                          className="px-4 py-2 hover:bg-white/10 cursor-pointer text-gray-200 hover:text-white text-sm sm:text-base transition-colors"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
    
              <button
                className="flex justify-center items-center group px-3 sm:px-4 py-1 bg-gradient-to-b from-blue-600 to-blue-400 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-102 gap-2 text-white shrink-0"
                onClick={() => handleSearch(searchText)}
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
    
            {/* Filter Buttons */}
            <div className="flex items-center flex-wrap gap-3 mb-4">
              <button
                className={`px-3 sm:px-4 py-1 rounded-lg font-semibold text-sm sm:text-base flex justify-center items-center gap-2 transition-all duration-300 ease-in-out ${
                  activeFilter === "highRating"
                    ? "bg-gradient-to-b from-blue-600 to-blue-400 border border-blue-300 shadow-lg scale-105 hover:shadow-xl text-white"
                    : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/30 hover:scale-105 text-white"
                }`}
                onClick={() => {
                  const highRatingList = listOfHomes.filter((home) => home.info.rating > 4.5)
                  setFilteredHomes(highRatingList)
                  setActiveFilter("highRating")
                }}
              >
                <Star className="w-4 h-4 sm:h-5 sm:w-5 text-yellow-500" />
                <span>High Ratings</span>
              </button>
    
              <button
                className={`px-3 sm:px-4 py-1 rounded-lg font-semibold text-sm sm:text-base flex justify-center items-center gap-2 transition-all duration-300 ease-in-out ${
                  activeFilter === "lowestPrice"
                    ? "bg-gradient-to-b from-blue-600 to-blue-400 border border-blue-300 shadow-lg scale-105 hover:shadow-xl text-white"
                    : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/30 hover:scale-105 text-white"
                }`}
                onClick={() => {
                  const lowPriceList = listOfHomes.filter((home) => home.info.pricePerDay < 1500)
                  setFilteredHomes(lowPriceList)
                  setActiveFilter("lowestPrice")
                }}
              >
                <DollarSign className="w-4 h-4 sm:h-5 sm:w-5 text-green-500" />
                <span>Lowest price</span>
              </button>
    
              <button
                className={`px-3 sm:px-4 py-1 rounded-lg font-semibold text-sm sm:text-base flex justify-center items-center gap-2 transition-all duration-300 ease-in-out ${
                  activeFilter === "allHomes"
                    ? "bg-gradient-to-b from-blue-600 to-blue-400 border border-blue-300 shadow-lg scale-105 hover:shadow-xl text-white"
                    : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/30 hover:scale-105 text-white"
                }`}
                onClick={() => {
                  setFilteredHomes(listOfHomes)
                  setSearchText("")
                  setActiveFilter("allHomes")
                }}
              >
                <House className="w-4 h-4 sm:h-5 sm:w-5 text-blue-500" />
                <span>All Homes</span>
              </button>
            </div>
          </div>
    
          {/* Cards Display */}
          {filteredHomes.length === 0 ? (
            <div className="mt-10 text-center">
              <h2 className="text-2xl font-semibold text-white">No homes found</h2>
              <p className="text-gray-400 mt-2">Try another search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-4">
              {filteredHomes.map((card) => (
                <Link key={card.info.id} to={"/individual-home/" + card.info.id}>
                  <HomeCard cardData={card.info} />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

export default ExploreHomesPage

