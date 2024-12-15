// export default CreateListing;
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios for making HTTP requests

const ListCreate = () => {
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

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log(formData);

  // Handle image upload
  const handleImageSubmit = async (e) => {
    // Validate file size (2 MB max) and types (jpg/png)
    const maxFileSize = 2 * 1024 * 1024; // 2MB
    const validFileTypes = ["image/jpeg", "image/png"];

    const invalidFiles = [];
    const validFiles = [];

    // Validate each file
    for (let i = 0; i < files.length; i++) {
      if (!validFileTypes.includes(files[i].type)) {
        invalidFiles.push(files[i].name);
      } else if (files[i].size > maxFileSize) {
        invalidFiles.push(files[i].name);
      } else {
        validFiles.push(files[i]);
      }
    }

    if (invalidFiles.length > 0) {
      setImageUploadError(`Invalid files: ${invalidFiles.join(", ")}`);
      return;
    }

    if (
      validFiles.length > 0 &&
      validFiles.length + formData.imageUrls.length <= 6
    ) {
      setUploading(true);
      setImageUploadError(false);
      const promises = validFiles.map((file) => storeImage(file));

      try {
        const urls = await Promise.all(promises);
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setUploading(false);
      } catch (err) {
        setImageUploadError("Image upload failed. (2 MB max per image)");
        setUploading(false);
      }
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  // Function to store the image on Cloudinary through the backend
  const storeImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Send the file to the back-end image upload route
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      // Return the image URL from the back-end response
      return response.data.secure_url;
    } catch (error) {
      throw new Error("Error uploading image: " + error.message);
    }
  };

  // Handle removing an uploaded image
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  // Handle form field changes
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");

      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price cannot be higher than regular price");

      setLoading(true);
      setError(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <p>Price</p>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="50"
                  max="10000000"
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <p>Discount Price</p>

                <span className="text-xs">($ /month)</span>
              </div>
            )}
          </div>

          {imageUploadError && (
            <p className="text-red-600 font-semibold">{imageUploadError}</p>
          )}
          <div className="flex gap-6">
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              accept="image/png, image/jpeg"
              className="file-input"
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Upload Images
            </button>
          </div>

          {formData.imageUrls.length > 0 && (
            <div className="flex gap-4 mt-6 flex-wrap">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt="uploaded"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-green-500 text-white py-2 px-4 rounded-lg mt-6"
          >
            {loading ? "Submitting..." : "Create Listing"}
          </button>
        </div>
      </form>
    </main>
  );
};
export default ListCreate;
