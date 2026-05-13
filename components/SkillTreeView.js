"use client";
import { useState } from "react";

// ── Priority & area colours (mirrors your existing SkillTree) ──────────────
const priorityColors = {
    high: "#ea580c",
    medium: "#f59e0b",
    low: "#64748b",
};

const priorityBadge = {
    high: "badge-error",
    medium: "badge-warning",
    low: "badge-info",
};

const skillAreaColors = {
    "Technical Skill": "#f97316",
    "Interest Skill": "#3b82f6",
    "Evergreen Skill": "#22c55e",
};

// ── Helpers ────────────────────────────────────────────────────────────────
function formatDate(dateString) {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function calcOverallProgress(nodes) {
    const allChildren = nodes.flatMap((n) => n.children);
    if (!allChildren.length) return 0;
    const done = allChildren.filter((c) => c.progress === 100).length;
    return Math.round((done / allChildren.length) * 100);
}

// ── Child node card ────────────────────────────────────────────────────────
function ChildCard({ child, isSelected, onSelect }) {
    return (
        <div
            onClick={() => onSelect(child.id)}
            className={`bg-[#5EF6FF]/10 rounded-lg border-2 border-[#5EF6FF] p-4 w-64 cursor-pointer transition-all hover:bg-[#5EF6FF]/20 ${
                isSelected ? "shadow-[0_0_20px_rgba(94,246,255,0.5)]" : ""
            }`}
        >
            <h4 className="text-[#FFFFFF] text-sm font-medium mb-3 leading-snug">
                {child.name}
            </h4>

            {/* Due date */}
            <div className="flex items-center gap-2 mb-3 text-xs text-[#FFFFFF]/60">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(child.dueDate)}</span>
            </div>

            {/* Progress */}
            <div className="space-y-1">
                <div className="flex justify-between text-xs">
                    <span className="text-[#FFFFFF]/60">Progress</span>
                    <span className="text-[#FFFFFF]">{child.progress}%</span>
                </div>
                <div className="w-full bg-[#5EF6FF]/20 rounded-full h-2 border border-[#5EF6FF]/30 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-[#5EF6FF] transition-all duration-500"
                        style={{ width: `${child.progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

// ── Parent node card ───────────────────────────────────────────────────────
function ParentCard({ node, isSelected, onSelect }) {
    const color = priorityColors[node.priority] ?? "#64748b";
    const completedChildren = node.children.filter((c) => c.progress === 100).length;

    return (
        <div
            onClick={() => onSelect(node.id)}
            className={`rounded-xl border-2 p-5 w-80 cursor-pointer transition-all hover:opacity-90 ${
                isSelected ? "shadow-[0_0_24px_rgba(94,246,255,0.4)]" : ""
            }`}
            style={{
                borderColor: color,
                backgroundColor: `${color}18`,
            }}
        >
            {/* Top row */}
            <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-[#FFFFFF] font-semibold text-sm leading-snug flex-1">
                    {node.name}
                </h3>
                <span
                    className={`badge badge-xs shrink-0 mt-0.5 ${priorityBadge[node.priority] ?? "badge-ghost"}`}
                >
                    {node.priority}
                </span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-[#FFFFFF]/60 mb-4">
                <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(node.dueDate)}
                </span>
                <span>{node.area}</span>
            </div>

            {/* Progress */}
            <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                    <span className="text-[#FFFFFF]/60">
                        {completedChildren}/{node.children.length} subtopics
                    </span>
                    <span className="text-[#FFFFFF]">{node.progress}%</span>
                </div>
                <div
                    className="w-full rounded-full h-2 overflow-hidden"
                    style={{ backgroundColor: `${color}30` }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${node.progress}%`,
                            backgroundColor: color,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

// ── Details sidebar ────────────────────────────────────────────────────────
function DetailsSidebar({ node, nodes, onClose }) {
    if (!node) return null;

    // Resolve whether it's a parent or child
    let resolved = null;
    let parentPriority = "low";

    for (const n of nodes) {
        if (n.id === node) {
            resolved = { ...n, isParent: true };
            parentPriority = n.priority;
            break;
        }
        const child = n.children.find((c) => c.id === node);
        if (child) {
            resolved = { ...child, isParent: false };
            parentPriority = n.priority;
            break;
        }
    }

    if (!resolved) return null;

    const color = priorityColors[parentPriority] ?? "#64748b";

    return (
        <aside className="w-80 shrink-0 border-l border-[#5EF6FF]/30 bg-[#000000] p-6 overflow-y-auto h-screen sticky top-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-6">
                <h2 className="text-[#FFFFFF] text-base font-semibold leading-snug flex-1">
                    {resolved.name}
                </h2>
                <button
                    onClick={onClose}
                    className="w-7 h-7 flex items-center justify-center rounded-md border border-[#5EF6FF]/30 text-[#FFFFFF]/50 hover:text-[#FFFFFF] hover:border-[#5EF6FF]/60 hover:bg-[#5EF6FF]/10 transition-all shrink-0"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="space-y-5">
                {/* Due date */}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-[#FFFFFF]/60 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Due date
                    </span>
                    <span className="text-[#FFFFFF]">{formatDate(resolved.dueDate)}</span>
                </div>

                {/* Priority */}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-[#FFFFFF]/60 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Priority
                    </span>
                    <span className="capitalize" style={{ color }}>
                        {parentPriority}
                    </span>
                </div>

                {/* Progress */}
                <div className="space-y-2 pt-4 border-t border-[#5EF6FF]/30">
                    <div className="flex justify-between text-sm">
                        <span className="text-[#FFFFFF]/60">Progress</span>
                        <span className="text-[#FFFFFF]">{resolved.progress}%</span>
                    </div>
                    <div className="w-full bg-[#5EF6FF]/20 rounded-full h-3 border border-[#5EF6FF]/30 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-[#5EF6FF] transition-all duration-500"
                            style={{ width: `${resolved.progress}%` }}
                        />
                    </div>
                </div>

                {/* Children list (if parent node) */}
                {resolved.isParent && resolved.children?.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-[#5EF6FF]/30">
                        <p className="text-xs text-[#FFFFFF]/40 uppercase tracking-widest">
                            Subtopics
                        </p>
                        <div className="flex flex-col gap-2">
                            {resolved.children.map((child) => (
                                <div
                                    key={child.id}
                                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#5EF6FF]/5 border border-[#5EF6FF]/15"
                                >
                                    <span className="text-xs text-[#FFFFFF]/80 truncate">
                                        {child.name}
                                    </span>
                                    <span className="text-xs text-[#5EF6FF] shrink-0">
                                        {child.progress}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}

// ── Main SkillTreeView ─────────────────────────────────────────────────────
export default function SkillTreeView({ path }) {
    const [selectedNode, setSelectedNode] = useState(null);

    const { title, description, skillArea, dueDate, nodes = [] } = path;

    const overallProgress = calcOverallProgress(nodes);
    const totalChildren = nodes.flatMap((n) => n.children).length;
    const completedChildren = nodes
        .flatMap((n) => n.children)
        .filter((c) => c.progress === 100).length;

    const skillAreaColor = skillAreaColors[skillArea] ?? "#5EF6FF";

    const handleSelect = (id) => {
        setSelectedNode((prev) => (prev === id ? null : id));
    };

    return (
        <div className="min-h-screen bg-[#000000] flex">
            {/* Main content */}
            <div className="flex-1 min-w-0 flex flex-col">
                {/* Header */}
                <header className="bg-[#000000] border-b border-[#5EF6FF]/30 px-6 py-8">
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="flex-1">
                            <h1 className="text-3xl text-[#FFFFFF] mb-2">{title}</h1>
                            <p className="text-[#FFFFFF]/60 text-base max-w-2xl leading-relaxed">
                                {description}
                            </p>
                        </div>
                        <span
                            className="px-3 py-1.5 rounded-lg border-2 text-[#FFFFFF] text-sm whitespace-nowrap"
                            style={{
                                borderColor: skillAreaColor,
                                backgroundColor: `${skillAreaColor}20`,
                            }}
                        >
                            {skillArea}
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-[#5EF6FF]/10 border border-[#5EF6FF] rounded-lg p-4">
                            <p className="text-xs text-[#FFFFFF]/60 mb-1">Target completion</p>
                            <p className="text-[#FFFFFF] text-lg">{formatDate(dueDate)}</p>
                        </div>
                        <div className="bg-[#5EF6FF]/10 border border-[#5EF6FF] rounded-lg p-4">
                            <p className="text-xs text-[#FFFFFF]/60 mb-1">Main topics</p>
                            <p className="text-[#FFFFFF] text-lg">{nodes.length}</p>
                        </div>
                        <div className="bg-[#5EF6FF]/10 border border-[#5EF6FF] rounded-lg p-4">
                            <p className="text-xs text-[#FFFFFF]/60 mb-1">Total subtopics</p>
                            <p className="text-[#FFFFFF] text-lg">{totalChildren}</p>
                        </div>
                        <div className="bg-[#5EF6FF]/10 border border-[#5EF6FF] rounded-lg p-4">
                            <p className="text-xs text-[#FFFFFF]/60 mb-1">Completed</p>
                            <p className="text-[#FFFFFF] text-lg">
                                {completedChildren} / {totalChildren}
                            </p>
                        </div>
                    </div>

                    {/* Overall progress bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[#FFFFFF] text-sm">Overall progress</span>
                            <span className="text-[#5EF6FF] text-lg">{overallProgress}%</span>
                        </div>
                        <div className="w-full bg-[#5EF6FF]/20 rounded-full h-4 border border-[#5EF6FF]/30 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-[#5EF6FF] transition-all duration-500 relative overflow-hidden"
                                style={{ width: `${overallProgress}%` }}
                            >
                                <div
                                    className="absolute inset-0 opacity-30"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Skill tree canvas */}
                <main className="flex-1 overflow-y-auto px-6 py-8">
                    <div className="space-y-8">
                        {nodes.map((node, index) => (
                            <div key={node.id} className="relative">
                                <div className="flex flex-col items-center">
                                    {/* Parent node */}
                                    <ParentCard
                                        node={node}
                                        isSelected={selectedNode === node.id}
                                        onSelect={handleSelect}
                                    />

                                    {/* Connector down to children */}
                                    {node.children.length > 0 && (
                                        <div className="w-0.5 h-8 bg-[#5EF6FF] my-2" />
                                    )}

                                    {/* Children */}
                                    {node.children.length > 0 && (
                                        <div className="relative">
                                            {/* Horizontal connector */}
                                            {node.children.length > 1 && (
                                                <div
                                                    className="absolute top-0 h-0.5 bg-[#5EF6FF]"
                                                    style={{
                                                        width: `${(node.children.length - 1) * 280}px`,
                                                        left: "50%",
                                                        transform: "translateX(-50%)",
                                                    }}
                                                />
                                            )}

                                            <div
                                                className="grid gap-6"
                                                style={{
                                                    gridTemplateColumns: `repeat(${Math.min(
                                                        node.children.length,
                                                        4
                                                    )}, 1fr)`,
                                                }}
                                            >
                                                {node.children.map((child) => (
                                                    <div
                                                        key={child.id}
                                                        className="relative flex flex-col items-center"
                                                    >
                                                        {/* Vertical drop to child */}
                                                        {node.children.length > 1 && (
                                                            <div className="w-0.5 h-6 bg-[#5EF6FF] mb-2" />
                                                        )}
                                                        <ChildCard
                                                            child={child}
                                                            isSelected={selectedNode === child.id}
                                                            onSelect={handleSelect}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Dashed connector between sections */}
                                {index < nodes.length - 1 && (
                                    <div className="h-8 mt-4 border-l-2 border-dashed border-[#5EF6FF] ml-[50%]" />
                                )}
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Details sidebar */}
            {selectedNode && (
                <DetailsSidebar
                    node={selectedNode}
                    nodes={nodes}
                    onClose={() => setSelectedNode(null)}
                />
            )}
        </div>
    );
}