import { rest } from "msw";
import { PACHCA_BASE_URL } from "./constants";

const ENDPOINT_URL = "/group_tags";

export default [
  rest.get(PACHCA_BASE_URL + ENDPOINT_URL, (_, response, context) =>
    response(
      context.status(200),
      context.json({
        data: [
          {
            id: 9111,
            name: "Design",
            users_count: 6,
          },
          {
            id: 9113,
            name: "iOS",
            users_count: 4,
          },
          {
            id: 9114,
            name: "Android",
            users_count: 36,
          },
          {
            id: 9115,
            name: "Backend",
            users_count: 15,
          },
          {
            id: 9510,
            name: "Frontend",
            users_count: 5,
          },
        ],
      }),
    ),
  ),
];
