import { Header } from "@/components/Header";
import { InputOuput } from "@/components/Input&Output";

export const Landing = () => {
  return (
    <div className=" bg-black text-white min-h-screen  w-full">
      <Header />
      <div className=" flex justify-center  ">
        <div className=" flex flex-col justify-center ">
          <h1 className="  p-2 text-center text-xl sm:text-3xl leading-none tracking-tighter  ">
            What can I help you to ship today?
          </h1>
          <h3 className=" p-3 text-center text-md sm:text-xl    leading-none tracking-tighter ">
            Generate UIs ,ask Questions, debug ,execute and much more.
          </h3>
          <InputOuput />
        </div>
      </div>
    </div>
  );
};
