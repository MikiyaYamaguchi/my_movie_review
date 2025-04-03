import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  title: String,
  date: Date,
  genre: String,
  image: String,
  star: Number,
  thoughts: String,
});

export const ReviewModel =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
