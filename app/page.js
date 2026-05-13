import ButtonLogin from "@/components/ButtonLogin"
import FAQListItem from "@/components/FAQListItem";
import Image from "next/image";
import productDemo from "@/public/assets/productDemo.jpeg"
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  

  return (
    <main className="bg-[#000000] text-white">
      {/* header */}
      <section className="border-b border-[#5EF6FF]/20 bg-[#000000]">
        <div className="flex justify-between items-center px-8 py-2 max-w-5xl mx-auto">
          <div className="font-bold text-white">skillmaxxing.io</div>
          <div className="space-x-4 max-md:hidden">
            <a className="text-white/60 hover:text-[#5EF6FF] transition-colors" href="#feature">Feature</a>
            <a className="text-white/60 hover:text-[#5EF6FF] transition-colors" href="#pricing">Pricing</a>
            <a className="text-white/60 hover:text-[#5EF6FF] transition-colors" href="#faq">FAQ</a>
          </div>
          <div>
            <ButtonLogin session={session}/>
          </div>
        </div>
      </section>

    {/* hero */}
      <section className="lg:text-left px-8 text-center py-24 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14 items-center lg:items-start">
        <Image src={productDemo} alt="Product Demo" className="w-96 rounded-2xl border border-[#5EF6FF]/25 shadow-[0_0_30px_rgba(94,246,255,0.15)]"/>
        <div>
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-6 text-white">
            Maximize your skill stats in real life
          </h1>
          <div className="text-white/60 mb-10">
            Create your own learning path by pursuing your curiosity
          </div>
          <ButtonLogin session={session}/>
        </div>

      </section>

    {/* feature */}
      <section className="border-t border-[#5EF6FF]/10 bg-[#5EF6FF]/5" id="feature">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-[#5EF6FF] mb-4">
            Features</p>

          <h2 className="text-3xl lg:text-4xl font-extrabold mb-2 text-center text-white">
            Turn learning into an RPG.
          </h2>
          <h3 className="mb-12 text-center text-white/60">Optional add-on services make it easy to track your 
            learning and showcase your portfolio.</h3>
          </div>
      </section>

    {/* pricing */}
      <section className="bg-[#000000]" id="pricing">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-[#5EF6FF] mb-4">
            Level up without limits</p>

          <h2 className="text-3xl lg:text-4xl font-extrabold mb-2 text-center text-white">
            No card required. No strings attached.
          </h2>
          <h3 className="mb-12 text-center text-white/60">Optional add-on services make it easy to track your 
            learning and showcase your portfolio.</h3>


          {/* pricing cards */}
          <div className="p-8 bg-[#5EF6FF]/5 border border-[#5EF6FF]/20 w-full max-w-sm rounded-2xl mx-auto space-y-6">
            <div className="flex gap-2 items-baseline">
              <div className="text-4xl font-black text-white">$0</div>
              <div className="uppercase text-sm font-medium text-white/50">
                Free Forever
              </div>
            </div>

            {/* what is included */}
            <ul className="space-y-2">
              {["Create 5x personalised learning paths",
                "Educational resource curation",
                "Habit tracker",
                "Time tracker"
                ].map((priceItem) => {
                return (
                  <li className="flex gap-2 items-center" key={priceItem}>
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 16 16" 
                    fill="currentColor" 
                    className="text-green-600 w-4 h-4"
                    >
                        <path 
                        fillRule="evenodd" 
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" 
                        clipRule="evenodd" 
                        />
                    </svg>

                    <span className="text-white/70">{priceItem}</span>
                  </li>
                  );
                })}
            </ul>

            <ButtonLogin 
            session={session}
            extraStyle="w-full" />
          </div>
          
        </div>
      </section>

    {/* FAQ */}
    <section className="border-t border-[#5EF6FF]/10 bg-[#5EF6FF]/5" id="faq">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-[#5EF6FF] mb-4">
            FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-2 text-center text-white">
            Frequently Asked Questions
          </h2>

          <ul className="max-w-lg mx-auto">
            {
              [
                { question: "What is skillmaxxing.io", 
                  answer: "A" },
                { question: "How are skill trees made?", 
                  answer: "A" },
                { question: "What are the plans for skillmaxxing.io?", 
                  answer: "A" },
                { question: "How is skillmaxxing.io built?", 
                  answer: "A" },
                { question: "Can I redistribute the content?", 
                  answer: "A" },
                { question: "What is the best way to contact you?", 
                  answer: "A" },

              ].map((qa) => (
                <FAQListItem key={qa.question} qa={qa}/>
              ))}

          </ul>
        </div>
      </section>
    </main>

  );
}
