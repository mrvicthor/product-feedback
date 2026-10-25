import { expect, describe, it } from "vitest";
import type { ProductRequest } from "../../../domain/schema";
import { createRoadmapPageModel } from "../roadmapPageModel";

const feedbacks: ProductRequest[] = [
  {
    id: 8,
    title: "Learning paths",
    category: "feature",
    upvotes: 28,
    isUpvoted: false,
    status: "planned",
    description:
      "Sequenced projects for different goals to help people improve.",
    comments: [
      {
        id: 12,
        content:
          "Having a path through the challenges that I could follow would be brilliant! Sometimes I'm not sure which challenge would be the best next step to take. So this would help me navigate through them!",
        user: {
          image: "./assets/user-images/image-george.jpg",
          name: "George Partridge",
          username: "soccerviewer8",
        },
      },
    ],
  },
  {
    id: 9,
    title: "One-click portfolio generation",
    category: "feature",
    upvotes: 62,
    isUpvoted: false,
    status: "in-progress",
    description:
      "Add ability to create professional looking portfolio from profile.",
    comments: [
      {
        id: 13,
        content:
          "I haven't built a portfolio site yet, so this would be really helpful. Might it also be possible to choose layout and colour themes?!",
        user: {
          image: "./assets/user-images/image-ryan.jpg",
          name: "Ryan Welles",
          username: "voyager.344",
        },
      },
    ],
  },
  {
    id: 10,
    title: "Bookmark challenges",
    category: "feature",
    upvotes: 31,
    isUpvoted: false,
    status: "in-progress",
    description: "Be able to bookmark challenges to take later on.",
    comments: [
      {
        id: 14,
        content:
          "This would be great! At the moment, I'm just starting challenges in order to save them. But this means the My Challenges section is overflowing with projects and is hard to manage. Being able to bookmark challenges would be really helpful.",
        user: {
          image: "./assets/user-images/image-suzanne.jpg",
          name: "Suzanne Chang",
          username: "upbeat1811",
        },
      },
    ],
  },
  {
    id: 12,
    title: "Add micro-interactions",
    category: "enhancement",
    upvotes: 71,
    isUpvoted: false,
    status: "live",
    description: "Small animations at specific points can add delight.",
    comments: [
      {
        id: 15,
        content:
          "I'd love to see this! It always makes me so happy to see little details like these on websites.",
        user: {
          image: "./assets/user-images/image-victoria.jpg",
          name: "Victoria Mejia",
          username: "arlen_the_marlin",
        },
        replies: [
          {
            content:
              "Me too! I'd also love to see celebrations at specific points as well. It would help people take a moment to celebrate their achievements!",
            replyingTo: "arlen_the_marlin",
            user: {
              image: "./assets/user-images/image-suzanne.jpg",
              name: "Suzanne Chang",
              username: "upbeat1811",
            },
          },
        ],
      },
    ],
  },
];

describe("createRoadmapPageModel", () => {
  it("visible feedback should match active tab", () => {
    const viewModel = createRoadmapPageModel(feedbacks, []);
    expect(viewModel.roadmap.length).toBe(4);
  });

  it("should return the total count of each roadmap", () => {
    const viewModel = createRoadmapPageModel(feedbacks, []);
    expect(viewModel.inProgressCount).toEqual(2);
    expect(viewModel.liveCount).toEqual(1);
    expect(viewModel.plannedCount).toEqual(1);
  });

  it("should return empty if source data is not available", () => {
    const viewModel = createRoadmapPageModel([], []);
    expect(viewModel.roadmap.length).toEqual(0);
  });
});
