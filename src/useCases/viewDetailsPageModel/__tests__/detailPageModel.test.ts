import { describe, expect, it } from "vitest";
import type { ProductRequest } from "../../../domain/schema";
import { createDetailPageModel } from "../DetailPageModel";

const feedbacks: ProductRequest[] = [
  {
    id: 1,
    title: "Add tags for solutions",
    category: "enhancement",
    upvotes: 112,
    isUpvoted: false,
    status: "suggestion",
    description: "Easier to search for solutions based on a specific stack.",
    comments: [
      {
        id: 1,
        content:
          "Awesome idea! Trying to find framework-specific projects within the hubs can be tedious",
        user: {
          image: "./assets/user-images/image-suzanne.jpg",
          name: "Suzanne Chang",
          username: "upbeat1811",
        },
      },
      {
        id: 2,
        content:
          "Please use fun, color-coded labels to easily identify them at a glance",
        user: {
          image: "./assets/user-images/image-thomas.jpg",
          name: "Thomas Hood",
          username: "brawnybrave",
        },
      },
    ],
  },
  {
    id: 2,
    title: "Add a dark theme option",
    category: "feature",
    upvotes: 99,
    isUpvoted: false,
    status: "suggestion",
    description:
      "It would help people with light sensitivities and who prefer dark mode.",
    comments: [
      {
        id: 3,
        content:
          "Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.",
        user: {
          image: "./assets/user-images/image-elijah.jpg",
          name: "Elijah Moss",
          username: "hexagon.bestagon",
        },
      },
      {
        id: 4,
        content:
          "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
        user: {
          image: "./assets/user-images/image-james.jpg",
          name: "James Skinner",
          username: "hummingbird1",
        },
        replies: [
          {
            content:
              "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
            replyingTo: "hummingbird1",
            user: {
              image: "./assets/user-images/image-anne.jpg",
              name: "Anne Valentine",
              username: "annev1990",
            },
          },
          {
            content:
              "Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I'd prefer not to use one of such extensions, however, for security and privacy reasons.",
            replyingTo: "annev1990",
            user: {
              image: "./assets/user-images/image-ryan.jpg",
              name: "Ryan Welles",
              username: "voyager.344",
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Q&A within the challenge hubs",
    category: "feature",
    upvotes: 65,
    isUpvoted: false,
    status: "suggestion",
    description: "Challenge-specific Q&A would make for easy reference.",
    comments: [
      {
        id: 5,
        content:
          "Much easier to get answers from devs who can relate, since they've either finished the challenge themselves or are in the middle of it.",
        user: {
          image: "./assets/user-images/image-george.jpg",
          name: "George Partridge",
          username: "soccerviewer8",
        },
      },
    ],
  },
];

describe("Detail Page Model", () => {
  it("returns null if no detail with id is found", () => {
    const viewModel = createDetailPageModel(feedbacks, 4, []);
    expect(viewModel).toBeNull();
  });

  it("should return detail if id is found", () => {
    const viewModel = createDetailPageModel(feedbacks, 1, []);
    expect(viewModel!.detail).toEqual({
      id: 1,
      title: "Add tags for solutions",
      category: "enhancement",
      upvotes: 112,
      isUpvoted: false,
      description: "Easier to search for solutions based on a specific stack.",
      commentCount: 2,
      comments: [
        {
          id: 1,
          content:
            "Awesome idea! Trying to find framework-specific projects within the hubs can be tedious",
          user: {
            image: "./assets/user-images/image-suzanne.jpg",
            name: "Suzanne Chang",
            username: "upbeat1811",
          },
        },
        {
          id: 2,
          content:
            "Please use fun, color-coded labels to easily identify them at a glance",
          user: {
            image: "./assets/user-images/image-thomas.jpg",
            name: "Thomas Hood",
            username: "brawnybrave",
          },
        },
      ],
    });
  });
});
