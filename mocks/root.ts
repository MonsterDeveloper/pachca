import { rest } from "msw";
import { PACHCA_BASE_URL } from "./constants";

export default [
  rest.all(PACHCA_BASE_URL, (_, response, context) =>
    response(context.status(200), context.json({ hello: "from Pachca API" })),
  ),
];
