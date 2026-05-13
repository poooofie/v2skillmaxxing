import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
{
    userID: {
        type:     mongoose.Schema.Types.ObjectId,
        required: true,
    },
    nodeId: {
        type:     String,
        required: true,
        trim:     true,   
    },
    label: {
        type:     String,
        required: true,
        trim:     true,
    },
    url: {
        type:     String,
        required: true,
        trim:     true,
    },
    domain: {
        type:  String,
        trim:  true,
    },
    type: {
        type:     String,
        enum:     ["free", "paid"],
    required: true,
    },
    tags: {
        type:    [String],
        default: [],  
    },
},
{ timestamps: true }
);

export default mongoose.models.Resource ||
mongoose.model("Resource", resourceSchema);