import { Schema, model } from "mongoose";
let PostSchema = new Schema(
  {
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    post_image: {
      type: String,
    },
    description: {
      type: String,
    },
    title: {
      type: String,
    },
    likes: {
      type: Array,
    },
    post_emotion: {
      // this will be filled by AI/ML later
      type: String,
      default: null,
    },
    created_at: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
PostSchema.pre("save", async function (next) {
  let date_info = new Date();
  let date_into =
    date_info.getDate() +
    "/" +
    (date_info.getMonth() + 1) +
    "/" +
    date_info.getFullYear();
  this.created_at = date_into;
});

PostSchema.virtual("posted_by", {
  ref: "user",
  localField: "UserId",
  foreignField: "_id",
  justOne: true,
});

PostSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "PostId",
  justOne: false,
});


export default model("post", PostSchema);
