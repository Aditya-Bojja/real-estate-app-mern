import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed } from "react-icons/fa";

function ListingItem({ listing }) {
  const calculateOfferPercentage = (actualPrice, discountPrice) => {
    return Math.round(((+actualPrice - +discountPrice) / +actualPrice) * 100);
  };

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg w-full sm:w-[300px] md:w-[350px] lg:w-[300px] transition-all duration-300 hover:-translate-y-2 mb-4">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[200px] w-full object-cover hover:scale-105 transition-all duration-300"
        />
        <div className="h-[200px] flex flex-col w-full gap-2 px-4 py-3">
          <p className="text-lg font-semibold truncate text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center justify-start gap-1">
            <MdLocationOn className="w-4 h-4 text-custom-primary" />
            <p className="text-sm font-medium text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="flex items-center mt-2 font-semibold text-slate-800">
            <span>
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
            </span>
            <span className="pl-1 text-xs font-medium text-slate-500">
              {listing.type === "rent" && "/month"}
            </span>
            {listing.offer && (
              <span className="pl-2 text-sm font-medium text-green-600">
                {calculateOfferPercentage(
                  listing.regularPrice,
                  listing.discountPrice
                )}
                % off
              </span>
            )}
          </p>
          <div className="flex items-center gap-4 pt-1 text-slate-600">
            <div className="flex items-center gap-1 text-sm font-medium">
              <FaBed className="text-xl text-slate-500" />
              <span>{listing.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <FaBath className="text-slate-500" />
              <span>{listing.bathrooms}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
