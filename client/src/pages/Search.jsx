import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

function Search() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const offerFromUrl = urlParams.get("offer");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    //is this check required?
    // if(searchTermFromUrl || typeFromUrl || offerFromUrl || parkingFromUrl || furnishedFromUrl || sortFromUrl || orderFromUrl)
    setFilters({
      searchTerm: searchTermFromUrl || "",
      type: typeFromUrl || "all",
      offer: offerFromUrl === "true" ? true : false,
      parking: parkingFromUrl === "true" ? true : false,
      furnished: furnishedFromUrl === "true" ? true : false,
      sort: sortFromUrl || "createdAt",
      order: orderFromUrl || "desc",
    });

    const fetchListings = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setFilters((currentFilters) => ({
        ...currentFilters,
        searchTerm: e.target.value,
      }));
    }

    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setFilters((currentFilters) => ({
        ...currentFilters,
        type: e.target.id,
      }));
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFilters((currentFilters) => ({
        ...currentFilters,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      }));
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setFilters((currentFilters) => ({
        ...currentFilters,
        sort,
        order,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", filters.searchTerm);
    urlParams.set("type", filters.type);
    urlParams.set("offer", filters.offer);
    urlParams.set("parking", filters.parking);
    urlParams.set("furnished", filters.furnished);
    urlParams.set("sort", filters.sort);
    urlParams.set("order", filters.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="border-b-2 p-7 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">
              Search term:{" "}
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="w-full p-3 border rounded-lg"
              value={filters.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                checked={filters.type === "all"}
                onChange={handleChange}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={filters.type === "rent"}
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={filters.type === "sale"}
                onChange={handleChange}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={filters.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                checked={filters.parking}
                onChange={handleChange}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={filters.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort: </label>
            <select
              id="sort_order"
              className="p-3 border rounded-lg"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-90">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="p-3 mt-5 text-3xl font-semibold border-b text-slate-700">
          Listing results:
        </h1>
        <div className="flex flex-wrap gap-4 p-7">
          {loading && (
            <p className="w-full text-xl text-center text-slate-700">
              Loading...
            </p>
          )}
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listings found!</p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
