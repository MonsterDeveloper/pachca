import { rest } from "msw";
import { EXAMPLE_BASE_URL } from "./constants";

export default [
  rest.get(EXAMPLE_BASE_URL, (_, response, context) =>
    response(context.status(200), context.json({ hello: "from example.com" })),
  ),
  rest.get("https://example.com/error", (_, response, context) => {
    return response(context.status(400), context.json({ sample: "error" }));
  }),
];
