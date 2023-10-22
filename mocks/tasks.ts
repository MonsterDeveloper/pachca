import { rest } from "msw";
import { PACHCA_BASE_URL } from "./constants";

const ENDPOINT_URL = "/tasks";

export default [
  rest.post(
    PACHCA_BASE_URL + ENDPOINT_URL,
    async (request, response, context) => {
      const { task } = await request.json();

      return response(
        context.status(200),
        context.json({
          data: {
            id: 22_283,
            kind: task.kind,
            content: task.content || task.kind,
            due_at: task.due_at || "2020-06-05T09:00:00.000Z",
            priority: task.priority || 2,
            user_id: 12,
            status: "undone",
            created_at: new Date().toISOString(),
            performer_ids: [12],
          },
        }),
      );
    },
  ),
];
