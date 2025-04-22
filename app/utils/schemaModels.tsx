import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  title: String,
  release_date: Date,
  genre: String,
  image: String,
  overview: String,
  star: Number,
  thoughts: String,
  email: String,
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const ReviewModel =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
