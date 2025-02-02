// video ObjectId videos
// owner ObjectId users
// content string
// createdAt Date
// updatedAt Date
import mongoose, { plugin, Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const commentsSchema = new Schema(
  {
    owner: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    video: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    content: {
      type: true,
      required: true,
    },
  },
  { timestamps: true }
);
commentsSchema.plugin(mongooseAggregatePaginate);
export const Comment = mongoose.model("Comment", commentsSchema);
