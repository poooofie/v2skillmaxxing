import Link from "next/link";

const ButtonLearningTrees = () => {
    return (
        <Link
            href="/learningpaths"
            className="btn border-[#5EF6FF] bg-[#5EF6FF] text-black hover:border-[#5EF6FF] hover:bg-[#5EF6FF]/80"
        >
            Learning Paths
        </Link>
    );
};

export default ButtonLearningTrees;
