import ButtonLogout from "@/components/ButtonLogout";
import FormNewLearningTree from "@/components/FormNewLearningTree";


export default function Home() {
    return (
        <main className="bg-base-200 min-h-screen">
            {/* header */}

            <section className="bg-base-100">
                <div className="max-w-5xl mx-auto px-5 py-3 flex justify-end">
                    <ButtonLearningTrees />
                    <ButtonLogout />
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-5 py-12">
                <FormNewLearningTree />
            </section>
        </main>
    );
}
