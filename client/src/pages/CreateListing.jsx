import React, { useState } from "react";

function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);

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

  return (
    <main className="max-w-4xl p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-3 border rounded-lg"
            id="name"
            minLength={5}
            maxLength={62}
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="p-3 border rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="p-3 border rounded-lg"
            id="address"
            required
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
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
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min={1}
                max={10}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-start">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min={1}
                max={10}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-start">
                <p>Discounted price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
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
          <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-90 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
