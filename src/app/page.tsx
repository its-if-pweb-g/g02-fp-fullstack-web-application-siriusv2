import Image from "next/image";

export default function Home() {
  return (
    <div className="landing bg-gradient-to-r from-[#3872be] to-[#bde7ff] py-64">
      <div className="flex-col justify-center text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl">Welcome!</h1>
        <a href="/" className="flex justify-center">
            <img
                src={"/logo.png"}
                alt="Logo Sirius"
                width={350}
                height={350}
                className="bg-transparent m-5"
            />
        </a>
        <h2 className="text-4xl sm:text-5xl mx-5">The beginning of our Sirius v2 Project.</h2>
        <div className="flex flex-row flex-wrap justify-center">
          <div className="shadow-md shadow-[#004aad] outline outline-5 rounded-3xl sm:rounded-full outline-white m-7">
            <a href="about">
              <button className="text-xl sm:text-2xl rounded-full px-10 py-2.5 mx-10 my-5 shadow-lg duration-300">
                About Us
              </button>
            </a>
            <a href="blog">
              <button className="text-xl sm:text-2xl rounded-full px-10 py-2.5 mx-10 my-5 shadow-lg duration-300">
                Our Blog
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
