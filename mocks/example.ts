import { rest } from "msw";
import { EXAMPLE_BASE_URL } from "./constants";

export default [
  rest.get(EXAMPLE_BASE_URL, (_, response, context) =>
    response(context.status(200), context.json({ hello: "from example.com" })),
  ),
  rest.get(`${EXAMPLE_BASE_URL}/error`, (_, response, context) =>
    response(
      context.status(400),
      context.json({
        errors: [
          {
            key: "error key",
            value: "some value",
            message: "some error message",
            code: "blank",
            payload: { some: "meta" },
          },
        ],
      }),
    ),
  ),
];
