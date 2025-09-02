import ContinueWatching from "@/components/sections/Home/ContinueWatching";
import HomePageList from "@/components/sections/Home/List";
import { NextPage } from "next";
import { getUserHistories } from "./actions/histories";
import { isEmpty } from "@/utils/helpers";

const HomePage: NextPage = async () => {
  const { data } = await getUserHistories();

  return (
    <div className="mt-6 flex flex-col gap-3 md:gap-8">
      {!isEmpty(data) && <ContinueWatching histories={data!} />}
      <HomePageList />
    </div>
  );
};

export default HomePage;
