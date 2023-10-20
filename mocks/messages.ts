import { rest } from "msw";
import { PACHCA_BASE_URL } from "./constants";

const ENDPOINT_URL = "/messages";

export default [
  rest.post(
    `${PACHCA_BASE_URL}${ENDPOINT_URL}/:id/thread`,
    (request, response, context) => {
      const { id } = request.params;

      return response(
        context.status(200),
        context.json({
          data: {
            id: 265_142,
            chat_id: 2_637_266_155,
            message_id: Number(id),
            message_chat_id: 2_637_266_154,
            updated_at: "2023-02-01T19:20:47.204Z",
          },
        }),
      );
    },
  ),
];
