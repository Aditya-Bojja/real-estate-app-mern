import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

function ListingItem({ listing }) {
  return (
    <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg w-full sm:w-[300px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[200px] w-full object-cover hover:scale-105 transition-all duration-300"
        />
        <div className="flex flex-col w-full gap-2 p-3">
          <p className="text-lg font-semibold truncate text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="w-4 h-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="mt-2 font-semibold text-slate-500">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " /month"}
          </p>
          <div className="flex gap-2 text-slate-700">
            <div className="text-xs font-bold ">
              {listing.bedrooms}
              {listing.bedrooms > 1 ? " beds" : " bed"}
            </div>
            <div className="text-xs font-bold ">
              {listing.bathrooms}
              {listing.bathrooms > 1 ? " baths" : " bath"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
