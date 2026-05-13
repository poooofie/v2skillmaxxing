import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    name: {
        type:  String,
        trim:  true,
    },
    email: {
        type:      String,
        trim:      true,
        lowercase: true,
        unique:    true,
    },
    image: {
        type: String,
    },
    learningPaths: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "LearningPath",
    },
    ],
},
{ timestamps: true }
);

export default mongoose.models.User ||
mongoose.model("User", userSchema);