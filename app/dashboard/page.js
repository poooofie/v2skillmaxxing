import ButtonLogout from "@/components/ButtonLogout";
import ButtonLearningTrees from "@/components/ButtonLearningTrees";
import FormNewLearningTree from "@/components/FormNewLearningTree";


export default function Home() {
    return (
        <main className="bg-[#000000] min-h-screen text-white">
            {/* header */}

            <section className="border-b border-[#5EF6FF]/20 bg-[#000000]">
                <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
                    <div className="font-semibold text-white">skillmaxxing.io</div>
                    <div className="flex justify-end gap-2">
                    <ButtonLearningTrees />
                    <ButtonLogout />
                    </div>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-5 py-12">
                <FormNewLearningTree />
            </section>
        </main>
    );
}
