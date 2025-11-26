import { NextPage } from "next";
import dynamic from "next/dynamic";
const HomePageList = dynamic(() => import("@/components/sections/Home/List"));

const HomePage: NextPage = () => {
  return (
    <div className="flex flex-col gap-3 md:gap-8">
      <HomePageList />
    </div>
  );
};

export default HomePage;
