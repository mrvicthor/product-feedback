import { useMemo } from "react";
import Feedbacks from "../components/feedbacks";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import EmptyFeedback from "../components/emptyFeedback";
import { createProductFeedbackPageModel } from "../useCases/viewProductFeedback/productFeedbackPageModel";

const Home = () => {
  const {
    state: { feedbacks },
    filterBy,
    sortBy,
  } = useFeedbackContext();

  const viewModel = useMemo(
    () => createProductFeedbackPageModel(feedbacks, filterBy, sortBy),
    [feedbacks, filterBy, sortBy],
  );

  return (
    <>
      <main className="max-w-6xl mx-auto lg:grid lg:grid-cols-4 md:py-6 md:space-y-10 lg:space-y-0 lg:gap-x-7.5 md:px-6">
        <Sidebar />
        <section className="col-span-3 flex flex-1 flex-col min-w-0 min-h-0">
          <Header suggestionCount={viewModel.suggestionCount} />
          {viewModel.isEmpty ? (
            <EmptyFeedback />
          ) : (
            <Feedbacks feedbacks={viewModel.feedbacks} />
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
