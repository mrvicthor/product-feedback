import Feedbacks from "../components/feedbacks";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

const Home = () => {
  return (
    <main className="max-w-6xl mx-auto grid grid-cols-4 py-6 gap-7.5">
      <Sidebar />
      <section className="col-span-3 h-screen">
        <Header />
        <Feedbacks />
      </section>
    </main>
  );
};

export default Home;
