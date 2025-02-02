// owner ObjectId users
// content string
// createdAt Date
// updatedAt Date

import mongoose, { Schema } from "mongoose";

const tweetsSchema = new Schema(
  {
    owner: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetsSchema);
