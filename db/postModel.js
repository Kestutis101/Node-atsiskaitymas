import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 255,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 200,
  },
  address: {
    type: Object,
    required: true,
  },
});

const postModel = mongoose.model("users_db", postSchema);

export default postModel;
