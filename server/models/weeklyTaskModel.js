import mongoose from "mongoose";

const weeklyTaskSchema = new mongoose.Schema({
    weekNumber: { type: Number, required: true, unique: true },
    taskName: { type: String, required: true },
    submissions: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        studentName: { type: String, required: true },
        submissionStatus: { type: String, default: "Pending" }, 
        submissionFiles: [{ type: String }],
        description: { type: String },
        projectName: { type: String, required: true },
    }]
}, { timestamps: true });

const WeeklyTask = mongoose.model("WeeklyTask", weeklyTaskSchema);

export default WeeklyTask;
