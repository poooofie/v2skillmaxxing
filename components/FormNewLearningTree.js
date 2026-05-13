"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SKILL_AREAS = ["Technical Skill", "Interest Skill", "Evergreen Skill"];

const LEARNINGTREE_FIELDS = [
    {
        key: "specific",
        label: "What do you want to learn?",
        placeholder: "e.g. Build full-stack web apps with React and Node.js",
        type: "text",
    },
    {
        key: "measurable",
        label: "How will you know you've succeeded?",
        placeholder: "e.g. Complete 3 deployed projects with user auth",
        type: "text",
    },
    {
        key: "achievable",
        label: "What's your current skill level?",
        placeholder: "e.g. I know basic HTML/CSS, no JavaScript yet",
        type: "text",
    },
    {
        key: "relevant",
        label: "Why does this matter to you?",
        placeholder: "e.g. Switch careers into software development",
        type: "text",
    },
    {
        key: "timeBound",
        label: "What's your deadline or time budget?",
        placeholder: "e.g. 3 months, studying 10 hours per week",
        type: "text",
    },
];

const FormNewLearningTree = () => {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [skillArea, setSkillArea] = useState("");
    const [smart, setSmart] = useState({
        specific: "",
        measurable: "",
        achievable: "",
        relevant: "",
        timeBound: "",
    });
    const [generated, setGenerated] = useState(null);
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const allFilled =
        skillArea && Object.values(smart).every((v) => v.trim().length > 0);

    const handleSmartChange = (key, value) => {
        setSmart((prev) => ({ ...prev, [key]: value }));
    };

    const buildPrompt = () => `
You are a learning curriculum designer. Based on the SMART goal below, generate a structured learning path as JSON.

SMART Goal:
- Specific: ${smart.specific}
- Measurable: ${smart.measurable}
- Achievable (current level): ${smart.achievable}
- Relevant (motivation): ${smart.relevant}
- Time-bound: ${smart.timeBound}
- Skill Area: ${skillArea}

Return ONLY valid JSON with this exact shape (no markdown, no explanation):
{
    "slug": "kebab-case-slug",
    "title": "Short goal title (max 60 chars)",
    "description": "2–3 sentence description of the learning path",
    "skillArea": "${skillArea}",
    "dueDate": "ISO date string based on the time-bound",
    "nodes": [
        {
            "id": "node-slug",
            "name": "Node name",
            "area": "Topic area",
            "dueDate": "ISO date string",
            "priority": "high | medium | low",
            "progress": 0,
            "children": [
                {
                    "id": "child-slug",
                    "name": "Subtopic name",
                    "dueDate": "ISO date string",
                    "progress": 0
                }
            ]
        }
    ]
}

Rules:
- Generate 4–8 top-level nodes ordered by dependency
- Each node has 2–5 children
- Prioritise earlier nodes as high, later as medium/low
- All dates must be realistic based on the time-bound
- Today's date is ${new Date().toISOString().split("T")[0]}
`;

    const handleGenerate = async () => {
        setError("");
        setStep(1);

        try {
            const response = await fetch("/api/generate-tree", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: buildPrompt() }),
            });

            const parsed = await response.json();
            setGenerated(parsed);
            setStep(2);
        } catch (err) {
            setError("Something went wrong generating your tree. Please try again.");
            setStep(0);
        }
    };

    const handleSave = async () => {
        setError("");
        setIsSaving(true);

        try {
            const res = await fetch("/api/learning-tree", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(generated),
            });

            if (!res.ok) {
                const { error } = await res.json();
                setError(error || "Failed to save. Please try again.");
                setIsSaving(false);
                return;
            }

            const saved = await res.json();
            router.push(`/dashboard/tree/${saved.slug}`);
        } catch (err) {
            setError("Failed to save. Please try again.");
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        setStep(0);
        setGenerated(null);
        setError("");
    };

    // Step 1: Generating
    if (step === 1) {
        return (
            <div className="bg-[#5EF6FF]/5 border border-[#5EF6FF]/20 p-8 rounded-2xl flex flex-col items-center justify-center gap-6 min-h-64">
                <span className="loading loading-spinner loading-lg text-[#5EF6FF]" />
                <div className="text-center">
                    <p className="font-bold text-lg text-white">Building your learning tree...</p>
                    <p className="text-white/50 text-sm mt-1">
                        Turning your goal into a skill tree
                    </p>
                </div>
            </div>
        );
    }

    // Step 2: Preview
    if (step === 2 && generated) {
        return (
            <div className="bg-[#5EF6FF]/5 border border-[#5EF6FF]/20 p-8 rounded-2xl flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="font-bold text-lg text-white">{generated.title}</p>
                        <p className="text-white/60 text-sm mt-1 max-w-lg">
                            {generated.description}
                        </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg border border-[#5EF6FF]/40 bg-[#5EF6FF]/10 text-[#5EF6FF] text-xs shrink-0 mt-1">
                        {generated.skillArea}
                    </span>
                </div>

                <div className="border-t border-[#5EF6FF]/20" />

                {error && (
                    <div role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                        {generated.nodes.length} topics generated
                    </p>
                    <div className="flex flex-col gap-2">
                        {generated.nodes.map((node, i) => (
                            <div
                                key={node.id}
                                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#000000] border border-[#5EF6FF]/15"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="text-xs text-white/30 w-5 shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium truncate text-white">{node.name}</p>
                                        <p className="text-xs text-white/40 mt-0.5">
                                            {node.children.length} subtopics · {node.area}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`badge badge-xs shrink-0 ${
                                        node.priority === "high"
                                            ? "badge-error"
                                            : node.priority === "medium"
                                            ? "badge-warning"
                                            : "badge-info"
                                    }`}
                                >
                                    {node.priority}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        className="btn flex-1 border-[#5EF6FF] bg-[#5EF6FF] text-black hover:border-[#5EF6FF] hover:bg-[#5EF6FF]/80"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            "Save learning tree"
                        )}
                    </button>
                    <button
                        className="btn border-[#5EF6FF]/30 bg-transparent text-white/70 hover:border-[#5EF6FF]/60 hover:bg-[#5EF6FF]/10 hover:text-white"
                        onClick={handleReset}
                        disabled={isSaving}
                    >
                        Start over
                    </button>
                </div>
            </div>
        );
    }

    // Step 0: Form
    return (
        <div className="bg-[#5EF6FF]/5 border border-[#5EF6FF]/20 p-8 rounded-2xl flex flex-col gap-6">
            <div>
                <p className="font-bold text-lg text-white">Create a new learning tree</p>
                <p className="text-white/50 text-sm mt-1">
                    Build your learning path in 5 secs
                </p>
            </div>

            {error && (
                <div role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            {/* Skill area pills */}
            <fieldset className="fieldset gap-2">
                <legend className="fieldset-legend text-white/70">Skill area</legend>
                <div className="flex gap-2 flex-wrap">
                    {SKILL_AREAS.map((area) => (
                        <label key={area} className="cursor-pointer">
                            <input
                                type="radio"
                                name="skillArea"
                                className="hidden"
                                value={area}
                                checked={skillArea === area}
                                onChange={() => setSkillArea(area)}
                            />
                            <span
                                className={`inline-flex min-h-8 items-center rounded-lg border px-3 text-sm transition-all ${
                                    skillArea === area
                                        ? "border-[#5EF6FF] bg-[#5EF6FF] text-black"
                                        : "border-[#5EF6FF]/25 bg-[#5EF6FF]/5 text-white/60 hover:border-[#5EF6FF]/50 hover:text-white"
                                }`}
                            >
                                {area}
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>

            {/* SMART fields */}
            {LEARNINGTREE_FIELDS.map((field) => (
                <fieldset key={field.key} className="fieldset gap-1">
                    <legend className="fieldset-legend text-white/70">{field.label}</legend>
                    <input
                        type="text"
                        className="input w-full border-[#5EF6FF]/25 bg-[#000000] text-white placeholder:text-white/30 focus:border-[#5EF6FF] focus:outline-none"
                        placeholder={field.placeholder}
                        value={smart[field.key]}
                        onChange={(e) => handleSmartChange(field.key, e.target.value)}
                    />
                </fieldset>
            ))}

            {/* Submit */}
            <button
                className="btn w-full mt-2 border-[#5EF6FF] bg-[#5EF6FF] text-black hover:border-[#5EF6FF] hover:bg-[#5EF6FF]/80 disabled:border-[#5EF6FF]/20 disabled:bg-[#5EF6FF]/10 disabled:text-white/30"
                disabled={!allFilled}
                onClick={handleGenerate}
            >
                Generate my learning tree
            </button>
        </div>
    );
};

export default FormNewLearningTree;
