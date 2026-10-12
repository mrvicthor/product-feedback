import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="mx-auto max-w-182.5 px-6 py-14 text-[#3A4374]">
      <p className="font-bold">Feedback not found.</p>
      <Link to="/" className="text-[#4661E6] font-semibold text-sm">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
