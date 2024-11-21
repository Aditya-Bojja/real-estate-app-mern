import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateListing() {
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [listingUploadError, setListingUploadError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      setFormData(data);
    };
    fetchListing();
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + formData.imageUrls.length > 6) {
      setImageUploadError("You can only upload up to 6 images");
      return;
    }
    setImageUploadError(null);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    setUploadingImages(true);
    setImageUploadError(null);

    if (files.length === 0) {
      setImageUploadError("No files selected");
      setUploadingImages(false);
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch("/api/listing/upload-images", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success === false) {
        setImageUploadError("Error uploading images");
        setUploadingImages(false);
        return;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrls: prevFormData.imageUrls.concat(data.urls),
      }));
      setFiles([]);
      setUploadingImages(false);
    } catch (error) {
      setImageUploadError("Error uploading images");
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((currentData) => {
      return {
        ...currentData,
        imageUrls: currentData.imageUrls.filter((_, i) => i !== index),
      };
    });
  };

  const handleFormChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData((currentData) => {
        return { ...currentData, type: e.target.id };
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData((currentData) => {
        return { ...currentData, [e.target.id]: e.target.checked };
      });
    }

    if (e.target.id === "offer" && e.target.checked === false) {
      setFormData((currentData) => {
        return { ...currentData, discountPrice: 0 };
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData((currentData) => {
        return { ...currentData, [e.target.id]: e.target.value };
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setListingUploadError("You must upload at least one image");
      if (formData.offer && +formData.regularPrice <= +formData.discountPrice)
        return setListingUploadError(
          "Discount price should be lower than regular price"
        );
      setLoading(true);
      setListingUploadError(null);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      if (data.success === false) {
        setListingUploadError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setListingUploadError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update a Listing
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="p-3 border rounded-lg"
            id="name"
            minLength={5}
            maxLength={62}
            required
            value={formData.name}
            onChange={handleFormChange}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="p-3 border rounded-lg"
            id="description"
            required
            value={formData.description}
            onChange={handleFormChange}
          />
          <input
            type="text"
            placeholder="Address"
            className="p-3 border rounded-lg"
            id="address"
            required
            value={formData.address}
            onChange={handleFormChange}
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={formData.type === "sale"}
                onChange={handleFormChange}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={formData.type === "rent"}
                onChange={handleFormChange}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                checked={formData.parking}
                onChange={handleFormChange}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={formData.furnished}
                onChange={handleFormChange}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={formData.offer}
                onChange={handleFormChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className="p-3 border border-gray-300 rounded-lg"
                value={formData.bedrooms}
                onChange={handleFormChange}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min={1}
                max={10}
                required
                className="p-3 border border-gray-300 rounded-lg"
                value={formData.bathrooms}
                onChange={handleFormChange}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min={50}
                max={10000000}
                required
                className="p-3 border border-gray-300 rounded-lg"
                value={formData.regularPrice}
                onChange={handleFormChange}
              />
              <div className="flex flex-col items-start">
                <p>Regular price</p>
                {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min={0}
                  max={10000000}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  value={formData.discountPrice}
                  onChange={handleFormChange}
                />
                <div className="flex flex-col items-start">
                  <p>Discounted price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="ml-2 font-normal text-gray-600">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="w-full p-3 border border-gray-300 rounded"
              onChange={handleFileChange}
            />
            <button
              type="button"
              disabled={uploadingImages}
              onClick={handleUpload}
              className="p-3 text-green-700 uppercase border border-green-700 rounded hover:shadow-lg disabled:cursor-progress"
            >
              {uploadingImages ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-sm text-red-600">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex items-center justify-between p-3 border"
              >
                <img
                  src={url}
                  alt={`listing-image-${index}`}
                  className="object-contain w-20 h-20 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 uppercase rounded-lg hover:opcacity-80"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploadingImages}
            className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-90 disabled:opacity-80"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>
          <p className="text-sm text-red-700">{listingUploadError}</p>
        </div>
      </form>
    </main>
  );
}

export default UpdateListing;
