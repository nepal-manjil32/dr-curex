import mongoose from "mongoose";

const submissionSchema = mongoose.Schema({
    studentName: { type: String, required: true },
    studentID: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "weeklyTask", required: true },
    weekNumber: { type: Number, required: true },
    taskName: { type: String, required: true },
    projectName: {type: String, required: true},
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project", required: true },
    description: { type: String },
    images: {type: Array, required: true},
    files: {type: Array, required: true},
    status: { type: String, default: "Pending" },
    progressPercentage: { type: Number, default: 0 }
}, { timestamps: true });

const submissionModel = mongoose.models.submission || mongoose.model("submission", submissionSchema);

export default submissionModel;
