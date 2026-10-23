export const handleUpvote = (
  id: number,
  upvotedSet: number[],
  setUpvotedSet: (value: React.SetStateAction<number[]>) => void,
) => {
  const formattedUpvotes = new Set(upvotedSet);
  if (formattedUpvotes.has(id)) {
    formattedUpvotes.delete(id);
  } else {
    formattedUpvotes.add(id);
  }
  setUpvotedSet(Array.from(formattedUpvotes));
};
