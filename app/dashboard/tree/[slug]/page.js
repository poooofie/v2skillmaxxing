import dbConnect from "@/lib/dbConnect";
import LearningPath from "@/models/LearningPath";
import SkillTreeView from "@/components/SkillTreeView";

export default async function TreePage({ params }) {
    await dbConnect();
    const path = await LearningPath.findOne({ slug: params.slug }).lean();

    if (!path) return <div>Tree not found</div>;

    return <SkillTreeView path={path} />; // existing skill tree component
}