import mongoose from "mongoose";

const childNodeSchema = new mongoose.Schema(
{
    id:       { type: String, required: true, trim: true },
    name:     { type: String, required: true, trim: true },
    dueDate:  { type: Date },
    progress: { type: Number, default: 0, min: 0, max: 100 },
},
{ _id: false }
);

const skillNodeSchema = new mongoose.Schema(
{
    id:       { type: String, required: true, trim: true },
    name:     { type: String, required: true, trim: true },
    area:     { type: String, trim: true },
    dueDate:  { type: Date },
    priority: {
    type:    String,
    enum:    ["low", "medium", "high"],
    default: "medium",
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    children: { type: [childNodeSchema], default: [] },
},
{ _id: false }
);

const learningPathSchema = new mongoose.Schema(
{
    userID: {
        type:     mongoose.Schema.Types.ObjectId,
        required: true,
    },
    slug: {
        type:     String,
        required: true,
        trim:     true,
        unique:   true,  
    },
    title: {
        type:     String,
        required: true,
        trim:     true,
    },
    description: {
        type:  String,
        trim:  true,
    },
    skillArea: {
        type: String,
        enum: ["Technical Skill", "Interest Skill", "Evergreen Skill"],
    },
    dueDate: {
        type: Date,
    },
    nodes: {
        type:    [skillNodeSchema],
        default: [],
    },
},
{ timestamps: true }
);

export default mongoose.models.LearningPath ||
mongoose.model("LearningPath", learningPathSchema);