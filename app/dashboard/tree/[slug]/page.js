import dbConnect from "@/libs/mongose";
import LearningTree from "@/models/LearningTree";
import SkillTreeView from "@/components/SkillTreeView";

export default async function TreePage({ params }) {
    await dbConnect();
    const path = await LearningTree.findOne({ slug: params.slug }).lean();

    if (!path) {
        return (
            <div className="min-h-screen bg-[#000000] flex items-center justify-center">
                <p className="text-white/50">Tree not found</p>
            </div>
        );
    }

    // Convert MongoDB ObjectIds to plain strings for the client component
    const serialized = JSON.parse(JSON.stringify(path));

    return <SkillTreeView path={serialized} />;
}