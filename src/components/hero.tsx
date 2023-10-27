import toast from "react-hot-toast";

interface DecorationBoardProps {
  wrapperStyle: string;
  innerStyle: string;
}
const DecorationBoard = ({
  wrapperStyle,
  innerStyle,
}: DecorationBoardProps) => (
  <div
    className={`absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl ${wrapperStyle}`}
    aria-hidden="true"
  >
    <div
      className={`relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0ea5e9] to-[#f43f5e] opacity-30 sm:w-[72.1875rem] ${innerStyle}`}
      style={{
        clipPath:
          "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
      }}
    />
  </div>
);

const Hero = () => (
  <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen flex items-center">
    <DecorationBoard
      wrapperStyle="-top-40 sm:-top-80"
      innerStyle="left-[calc(50%-11rem)] rotate-[30deg] sm:left-[calc(50%-30rem)]"
    />
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Relay.Nya.One
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          喵家中继
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          这里是来自喵喵们的电波！
          <span
            className="rounded px-2 py-0.5 hover:bg-sky-100 hover:text-gray-400 transition-colors duration-300 cursor-pointer select-none"
            onClick={() => {
              toast.success("喵～", { icon: "❤" });
            }}
          >
            ฅ^•ω•^ฅ
          </span>
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#join"
            className="rounded-md bg-primary px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-300"
          >
            加入我们
          </a>
          <a
            href="#instances"
            className="font-semibold leading-6 text-gray-900"
          >
            实例列表 <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
    <DecorationBoard
      wrapperStyle="top-[calc(100%-13rem)] sm:top-[calc(100%-30rem)]"
      innerStyle="left-[calc(50%+3rem)] sm:left-[calc(50%+36rem)]"
    />
  </div>
);

export default Hero;
