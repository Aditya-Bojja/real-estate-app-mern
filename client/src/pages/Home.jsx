import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import { motion } from "motion/react";
import ListingItem from "../components/ListingItem";
import ScrollReveal from "../components/ScrollReveal";

function Home() {
  SwiperCore.use([Navigation]);

  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=3");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=3");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=3");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      <div className="flex flex-col max-w-6xl gap-6 px-3 mx-auto p-28">
        <h1 className="flex flex-col gap-4 text-3xl font-bold text-slate-700 md:text-5xl lg:text-6xl">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Find Your{" "}
            <span className="text-transparent bg-gradient-to-r from-custom-secondary to-custom-primary bg-clip-text">
              Perfect Home
            </span>
            ,
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Tailored to Your Needs
          </motion.div>
        </h1>
        <motion.div
          className="text-xs text-slate-500 sm:text-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Discover the best properties for rent or sale with ease. Explore homes
          that match your preferences, <br /> from cozy apartments to spacious
          villas, complete with the amenities you desire. <br /> Start your
          journey to the perfect living space today!
        </motion.div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link
            to={`/search`}
            className="text-xs font-bold text-custom-secondary sm:text-sm hover:underline"
          >
            Explore properties
          </Link>
        </motion.p>
      </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[500px]"
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="flex flex-col max-w-6xl gap-12 p-3 mx-auto my-28">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-4">
              <h2 className="text-3xl font-semibold text-blue-700">
                Recent offers
              </h2>
              <Link
                to={`/search?offer=true`}
                className="text-sm text-slate-700 hover:underline"
              >
                Show more
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-around lg:justify-between">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-4">
              <h2 className="text-3xl font-semibold text-blue-700">
                Recent places for rent
              </h2>
              <Link
                to={`/search?type=rent`}
                className="text-sm text-slate-700 hover:underline"
              >
                Show more
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-around lg:justify-between">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-4">
              <h2 className="text-3xl font-semibold text-blue-700">
                Recent places for sale
              </h2>
              <Link
                to={`/search?type=sale`}
                className="text-sm text-slate-700 hover:underline"
              >
                Show more
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-around lg:justify-between">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
