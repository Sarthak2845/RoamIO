import mongoose from "mongoose";

const userPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  foodPreference: {
    type: String,
    enum: ["veg", "non_veg", "vegan"]
  },

  placeTypes: {
    type: [String],
    enum: ["beach", "mountain", "jungle"]
  },

  explorationInterests: {
    type: [String],
    enum: ["food", "heritage", "culture", "religious", "adventure", "nightlife"]
  },

  transportPreference: {
    type: String,
    enum: ["self_drive", "flight", "train", "bus"]
  },
},{timestamps:true});

export default mongoose.model("UserPreference", userPreferenceSchema);