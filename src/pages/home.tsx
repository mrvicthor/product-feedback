import { useMemo } from "react";
import Feedbacks from "../components/feedbacks";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import EmptyFeedback from "../components/emptyFeedback";

const Home = () => {
  const {
    state: { feedbacks },
    filterBy,
  } = useFeedbackContext();
  const visibleFeedbacks = useMemo(
    () =>
      filterBy === null
        ? feedbacks
        : feedbacks.filter(
            (feedback) =>
              feedback.category.toLowerCase() === filterBy.toLowerCase(),
          ),
    [feedbacks, filterBy],
  );
  return (
    <main className="max-w-6xl mx-auto h-screen lg:grid lg:grid-cols-4 md:py-6 md:space-y-10 lg:space-y-0 lg:gap-x-7.5 md:px-6 overflow-hidden">
      <Sidebar />
      <section className="col-span-3 flex flex-col min-w-0 min-h-0">
        <Header />
        {visibleFeedbacks.length === 0 ? (
          <EmptyFeedback />
        ) : (
          <Feedbacks feedbacks={visibleFeedbacks} />
        )}
      </section>
    </main>
  );
};

export default Home;
