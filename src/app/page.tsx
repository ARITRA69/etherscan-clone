import FeaturedSection from "@/components/FeaturedSection";
import SearchArea from "@/components/SearchArea";

const Home: React.FC = () => {
  return (
    <main className="bg-slate-50 dark:bg-slate-950">
      <SearchArea />
      <div className="w-11/12 lg:w-2/3 mx-auto space-y-8 -translate-y-6 z-50">
        <FeaturedSection />
      </div>
    </main>
  );
};

export default Home;
