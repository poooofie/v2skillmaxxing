import dbConnect from "@/libs/mongose";
import LearningTree from "@/models/LearningTree";
import Link from "next/link";

const skillAreaColors = {
    "Technical Skill": "#f97316",
    "Interest Skill": "#3b82f6",
    "Evergreen Skill": "#22c55e",
};

function formatDate(dateString) {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
}

function calcProgress(nodes) {
    const all = nodes.flatMap((n) => n.children);
    if (!all.length) return 0;
    return Math.round((all.filter((c) => c.progress === 100).length / all.length) * 100);
}

export default async function LearningPathsPage() {
    await dbConnect();
    const paths = await LearningTree.find({}).lean();

    return (
        <div className="min-h-screen bg-[#000000] px-6 py-10">
            <div className="max-w-5xl mx-auto">
                {/* Page header */}
                <div className="mb-10">
                    <h1 className="text-3xl text-white mb-2">Learning Paths</h1>
                    <p className="text-white/50 text-base">
                        {paths.length} {paths.length === 1 ? "tree" : "trees"} in your library
                    </p>
                </div>

                {paths.length === 0 ? (
                    <div className="text-center py-24 text-white/30">
                        <p className="text-lg mb-2">No learning trees yet</p>
                        <p className="text-sm">Create your first one from the dashboard</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {paths.map((path) => {
                            const progress = calcProgress(path.nodes);
                            const color = skillAreaColors[path.skillArea] ?? "#5EF6FF";

                            return (
                                <Link
                                    key={path.slug}
                                    href={`/dashboard/tree/${path.slug}`}
                                    className="block rounded-2xl border border-[#5EF6FF]/20 bg-[#5EF6FF]/5 p-6 hover:border-[#5EF6FF]/50 hover:bg-[#5EF6FF]/10 transition-all"
                                >
                                    {/* Top row */}
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <h2 className="text-white font-semibold text-base leading-snug flex-1">
                                            {path.title}
                                        </h2>
                                        <span
                                            className="px-2.5 py-1 rounded-lg border text-xs text-white whitespace-nowrap shrink-0"
                                            style={{
                                                borderColor: color,
                                                backgroundColor: `${color}20`,
                                            }}
                                        >
                                            {path.skillArea}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-white/50 text-sm leading-relaxed mb-5 line-clamp-2">
                                        {path.description}
                                    </p>

                                    {/* Stats row */}
                                    <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                                        <span>{path.nodes.length} topics</span>
                                        <span>{path.nodes.flatMap((n) => n.children).length} subtopics</span>
                                        <span>Due {formatDate(path.dueDate)}</span>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-white/40">Progress</span>
                                            <span className="text-[#5EF6FF]">{progress}%</span>
                                        </div>
                                        <div className="w-full bg-[#5EF6FF]/15 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-[#5EF6FF] transition-all duration-500"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}