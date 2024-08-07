import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserStart,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    setFileUploadError(false);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      //updating the listing
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center mt-3">
        <div className="p-6 max-w-md w-full bg-white rounded-xl shadow-md">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Your Profile
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col justify-center">
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <img
                onClick={() => {
                  fileRef.current.click();
                }}
                src={formData.avatar || currentUser.avatar}
                alt="profile"
                className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
              />
              <p className="text-sm self-center">
                {fileUploadError ? (
                  <span className="text-red-700">
                    Error Image upload (image must be less than 2 mb)
                  </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className="text-green-700">
                    Image successfully uploaded!
                  </span>
                ) : (
                  ""
                )}
              </p>
              <div className="flex flex-row justify-center mt-2">
                <p className="text-black self-center uppercase">note: </p>
              <p className="text-slate-500 self-center">
                Upload image less than 2MB in size
              </p>
              </div>
            </div>
            <input
              type="text"
              placeholder="Username"
              defaultValue={currentUser.username}
              id="username"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none "
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              id="email"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none "
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Update Password"
              id="password"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="bg-customBlue text-white rounded-lg p-3 uppercase hover:opacity-95 transition duration-300 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Update"}
            </button>
            <Link
              to={"/create-listing"}
              className="bg-green-600 text-white p-3 rounded-lg uppercase text-center hover:opacity-85"
            >
              Create Listing
            </Link>
          </form>
          <div className="flex justify-between mt-6">
            <span
              onClick={handleDeleteUser}
              className="text-red-600 cursor-pointer hover:underline"
            >
              Delete account
            </span>
            <span
              onClick={handleSignOut}
              className="text-red-600 cursor-pointer hover:underline"
            >
              Sign out
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-red-700 mt-2 self-center">
              {error ? error : ""}
            </p>
            <p className="text-green-700 mt-2 self-center">
              {updateSuccess ? "User is updated successfully!" : ""}
            </p>
            <button
              onClick={handleShowListings}
              className="text-green-700 w-full hover:opacity-85"
            >
              Show User Listings
            </button>
            <p className="text-red-700 mt-5">
              {showListingsError ? "Error showing listings" : ""}
            </p>
            {userListings && userListings.length > 0 && (
              <div className="flex flex-col gap-4 border rounded-lg p-2">
                <h1 className="text-center mt-7 text-2xl font-semibold">
                  Your Listings
                </h1>
                {userListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="border rounded-lg p-3 flex justify-between items-center gap-4"
                  >
                    <Link to={`/listing/${listing._id}`}>
                      <img
                        src={listing.imageUrls[0]}
                        alt="listing cover"
                        className="h-16 w-16 object-contain"
                      />
                    </Link>
                    <Link
                      className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                      to={`/listing/${listing._id}`}
                    >
                      <p>{listing.name}</p>
                    </Link>

                    <div className="flex flex-col item-center">
                      <button
                        onClick={() => handleListingDelete(listing._id)}
                        className="text-red-700"
                      >
                        Delete
                      </button>
                      <Link to={`/update-listing/${listing._id}`}>
                        <button className="text-green-700">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
