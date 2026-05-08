import ButtonLogin from "@/components/ButtonLogin"
import FAQListItem from "@/components/FAQListItem";
import Image from "next/image";
import productDemo from "@/public/assets/productDemo.jpeg"

export default function Home() {
  const isLoggedIn = false;
  const name = "Bob"

  return (
    <main>
      {/* header */}
      <section className="bg-base-200">
        <div className="flex justify-between items-center px-8 py-2 max-w-5xl mx-auto">
          <div className="font-bold">skillmaxxing.io</div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover" href="#feature">Feature</a>
            <a className="link link-hover" href="#pricing">Pricing</a>
            <a className="link link-hover" href="#faq">FAQ</a>
          </div>
          <div>
            <ButtonLogin isLoggedIn={isLoggedIn} name={name}/>
          </div>
        </div>
      </section>

    {/* hero */}
      <section className="bg-base-100 lg:text-left px-8 text-center py-32 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14 items-center lg=items-start">
        <Image src={productDemo} alt="Product Demo" className="w-96 rounded-xl"/>
        <div>
          <h1 className="text-3xl lg:text-5l font-extrabold mb-6">
            Maximize your skill stats in real life
          </h1>
          <div className="opacity-90 mb-10">
            Create your own learning path by pursuing your curiosity
          </div>
          <ButtonLogin isLoggedIn={isLoggedIn} name={name}/>
        </div>

      </section>

    {/* feature */}
      <section className="bg-base-200" id="feature">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            Features</p>

          <h2 className="text-3xl lg:text-4xl font-extrabold mb-2 text-center">
            Turn learning into an RPG.
          </h2>
          <h3 className="mb-12">Optional add-on services make it easy to track your 
            learning and showcase your portfolio.</h3>
          </div>
      </section>

    {/* pricing */}
      <section className="bg-base-200" id="pricing">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            Level up without limits</p>

          <h2 className="text-3xl lg:text-4xl font-extrabold mb-2 text-center">
            No card required. No strings attached.
          </h2>
          <h3 className="mb-12">Optional add-on services make it easy to track your 
            learning and showcase your portfolio.</h3>


          {/* pricing cards */}
          <div className="p-8 bg-base-100 w-96 rounded-3xl mx-auto space-y-6">
            <div className="flex gap-2 items-baseline">
              <div className="text-4xl font-black">$0</div>
              <div className="uppercase text-sm font-medium opacity-60">
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

                    {priceItem}
                  </li>
                  );
                })}
            </ul>

            <ButtonLogin 
            isLoggedIn={isLoggedIn} 
            name={name} 
            extraStyle="w-full" />
          </div>
          
        </div>
      </section>

    {/* FAQ */}
    <section className="bg-base-200" id="faq">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-2 text-center">
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
