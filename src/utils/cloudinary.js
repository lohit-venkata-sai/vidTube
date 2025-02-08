import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localPath) => {
  try {
    console.log(localPath);
    if (!localPath) return null;
    const res = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });
    console.log("file uploded to cloudinary file src : ", res.url);
    //del from local storage
    fs.unlinkSync(localPath);
    return res;
  } catch (error) {
    fs.unlinkSync(localPath);
    console.error(error);
  }
};

const deleteFromCloudinary = async (public_id) => {
  try {
    if (!public_id) return null;
    const result = await cloudinary.uploader.destroy(public_id);
    console.log("item deleted from cloudinary", public_id);
  } catch (error) {
    console.log("error in deleting ", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
