import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const userRegistration = asyncHandler(async (req, res, next) => {
  const { username, email, fullName, password } = req.body;
  console.log(username, email, fullName, password);
  //validation
  if (
    [username, email, fullName, password].some((field) => field.trim() == "")
  ) {
    return ApiError(200, "invalid details");
  }

  //check for user in db
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (user) {
    throw new ApiError(400, "user already exists");
  }
  // console.log(req.files);
  const avatarPath = req.files?.avatar?.[0].path;
  // console.log(avatarPath);
  const coverImagePath = req.files?.coverImage?.[0].path;
  // console.log(coverImagePath);
  if (!avatarPath) {
    throw new ApiError(400, "avatar is required");
  }
  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarPath);
    console.log("avatar uploaded to cloudinary ", avatar);
  } catch (error) {
    console.log("error at uploading avatar in cloudinary", error);
    throw new ApiError(500, "error at uploading avatar in cloundinary");
  }
  let coverImage;
  try {
    coverImage = await uploadOnCloudinary(coverImagePath);
    console.log("cover image uploaded successfully ", coverImage);
  } catch (error) {
    console.log("error at uploading cover image", error);
    throw new ApiError(500, "error uploading cover image to cloudinary");
  }

  try {
    const creatingUser = await User.create({
      username,
      password,
      fullName,
      avatar: avatar?.url,
      coverImage: coverImage?.url || "",
      email,
    });
    const createdUser = await User.findById(creatingUser._id).select(
      "-password -refreshToken "
    );
    if (createdUser) {
      return res
        .status(200)
        .json(new ApiResponse(200, createdUser, "user created successfully"));
    } else {
      throw new ApiError(500, "something went wrong");
    }
  } catch (error) {
    console.log("user creation in db failed");
    if (avatar) {
      await deleteFromCloudinary(avatar.public_id);
      console.log("avatar deleted");
    }

    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id);
      console.log("coverimage deleted");
    }

    throw new ApiError(500, "something went wrong in user creation db");
  }

  next();
});

export { userRegistration };
