import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* {top} */}
      <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24 cursor-default">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base font-semibold tracking-wider text-customBlue uppercase">
                INNOVATION THAT MAKES THE DIFFERENCE
              </p>
              <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                Find, <span className="text-gray-600 inline">Buy</span> and Sell
              </h1>
              <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                Estate<span className="text-yellow-600 inline">Ease</span> will
                help you find your perfect place fast, easily, and comfortably.
              </p>
              <Link
                to={"/search"}
                className="inline-flex items-center px-6 py-4 mt-8 font-semibold transition-all duration-200 bg-yellow-600 rounded-full lg:mt-16 hover:opacity-85 focus:bg-yellow-400 text-black"
                role="button"
              >
                Let&apos;s Start Now..
                <svg
                  className="w-6 h-6 ml-4 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </div>
            <div className="hidden lg:block">
              <img className="w-full" src="home.png" alt="programming" />
            </div>
          </div>
        </div>
      </section>

      {/* {swiper} */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* {footer} */}
      <footer className="bg-customBlue text-white py-10 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Company</h2>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:underline">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">Careers</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:underline">Help Center</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">Privacy Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">Terms of Service</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">FAQs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Connect with Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-75" aria-label="Facebook">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-75" aria-label="Twitter">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-75" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-75" aria-label="LinkedIn">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-2">123 Real Estate St.</p>
            <p className="mb-2">City, Country 12345</p>
            <p className="mb-2">Email: contact@estateease.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} EstateEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    </div>
  );
};

export default Home;
