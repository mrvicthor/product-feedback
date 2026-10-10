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
    <main className="max-w-6xl mx-auto grid grid-cols-4 py-6 gap-7.5">
      <Sidebar />
      <section className="col-span-3 h-screen">
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
