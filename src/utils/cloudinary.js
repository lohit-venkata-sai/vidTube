import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.uploader.upload();

const uploadOnCloudinary = async (localPath) => {
  try {
    if (!localPath) return null;
    const res = cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });
    console.log("file uploded to cloudinary file src : ", res.url);
    //del from local storage
    fs.unlinkSync(localPath);
    return res;
  } catch (error) {
    fs.unlinkSync(localPath);
  }
};

export { uploadOnCloudinary };
