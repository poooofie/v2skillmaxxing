// scripts/seed.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

// ── Inline the schemas (no @/ alias) ──────────────────────────────────────
const childNodeSchema = new mongoose.Schema(
    { id: String, name: String, dueDate: Date, progress: Number },
    { _id: false }
);

const skillNodeSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        area: String,
        dueDate: Date,
        priority: String,
        progress: Number,
        children: [childNodeSchema],
    },
    { _id: false }
);

const learningPathSchema = new mongoose.Schema(
    {
        slug: String,
        title: String,
        description: String,
        skillArea: String,
        dueDate: Date,
        nodes: [skillNodeSchema],
    },
    { timestamps: true }
);

const LearningPath =
    mongoose.models.LearningPath ||
    mongoose.model("LearningPath", learningPathSchema);

// ── Seed data ──────────────────────────────────────────────────────────────
const seedData = {
    slug: "web-dev-fundamentals",
    title: "Build 3 Web Apps in 3 Months",
    description: "Master HTML, CSS, JavaScript, and React by building three real projects from scratch.",
    skillArea: "Technical Skill",
    dueDate: "2026-08-03",
    nodes: [
        {
            id: "html-css",
            name: "HTML & CSS Fundamentals",
            area: "Frontend",
            dueDate: "2026-06-01",
            priority: "high",
            progress: 85,
            children: [
                { id: "html-basics", name: "HTML Basics & Semantic Markup", dueDate: "2026-05-15", progress: 100 },
                { id: "css-basics", name: "CSS Styling & Selectors", dueDate: "2026-05-20", progress: 90 },
                { id: "flexbox", name: "Flexbox Layout", dueDate: "2026-05-25", progress: 75 },
                { id: "grid", name: "CSS Grid", dueDate: "2026-06-01", progress: 60 },
            ],
        },
        {
            id: "javascript",
            name: "JavaScript Programming",
            area: "Frontend",
            dueDate: "2026-07-15",
            priority: "high",
            progress: 45,
            children: [
                { id: "js-basics", name: "Variables, Data Types & Operators", dueDate: "2026-06-10", progress: 80 },
                { id: "js-functions", name: "Functions & Scope", dueDate: "2026-06-20", progress: 60 },
                { id: "js-dom", name: "DOM Manipulation", dueDate: "2026-07-01", progress: 30 },
                { id: "js-async", name: "Async JavaScript & Promises", dueDate: "2026-07-15", progress: 10 },
            ],
        },
        {
            id: "react",
            name: "React Framework",
            area: "Frontend",
            dueDate: "2026-08-30",
            priority: "medium",
            progress: 20,
            children: [
                { id: "react-basics", name: "Components & JSX", dueDate: "2026-08-01", progress: 40 },
                { id: "react-state", name: "State & Props", dueDate: "2026-08-10", progress: 25 },
                { id: "react-hooks", name: "Hooks (useState, useEffect)", dueDate: "2026-08-20", progress: 10 },
                { id: "react-routing", name: "React Router", dueDate: "2026-08-30", progress: 0 },
            ],
        },
    ],
};

// ── Run ────────────────────────────────────────────────────────────────────
async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await LearningPath.deleteMany({ slug: "web-dev-fundamentals" });
    await LearningPath.create(seedData);

    console.log("Seeded successfully");
    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});