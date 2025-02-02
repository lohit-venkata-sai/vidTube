//   owner ObjectId users
//   videoFile string
//   thumbnail string
//   title string
//   description string
//   duration number
//   views number
//   isPublished boolean
//   createdAt Date
//   updatedAt Date

import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const commonTypes = {
  type: String,
  required: true,
};

const videoSchema = new Schema(
  {
    owner: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    videoFile: commonTypes,
    thumbnail: commonTypes,
    title: commonTypes,
    discription: commonTypes,
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoSchema);
