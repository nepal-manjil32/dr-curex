import mongoose from "mongoose";
import crypto from "crypto";

const projectSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    slotsAvailable: { type: Number },
    slotsFilled: { type: Number, default: 0 },

    leader: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    joinCode: { 
        type: String, 
        default: () => crypto.randomBytes(5).toString("hex"),
        unique: true
    }, 
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const projectModel = mongoose.models.project || mongoose.model("project", projectSchema);

export default projectModel;
