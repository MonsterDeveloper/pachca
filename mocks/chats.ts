import { rest } from "msw";
import { PACHCA_BASE_URL } from "./constants";

const ENDPOINT_URL = "/chats";

export default [
  rest.post(
    PACHCA_BASE_URL + ENDPOINT_URL,
    async (request, response, context) => {
      const { chat } = await request.json();

      return response(
        context.status(201),
        context.json({
          data: {
            id: 334,
            name: chat.name,
            created_at: new Date().toISOString(),
            owner_id: 185,
            member_ids: chat.member_ids,
            group_tag_ids: chat.group_tag_ids,
            channel: chat.channel,
            public: chat.public,
          },
        }),
      );
    },
  ),
  rest.get(
    PACHCA_BASE_URL + ENDPOINT_URL + "/:id",
    (request, response, context) => {
      const { id } = request.params;

      return response(
        context.status(200),
        context.json({
          data: {
            id: Number(id),
            name: "🤿 aqua",
            created_at: "2021-08-28T15:56:53.000Z",
            owner_id: 185,
            member_ids: [185, 186, 187],
            group_tag_ids: [],
            channel: true,
            public: false,
          },
        }),
      );
    },
  ),
  rest.get(PACHCA_BASE_URL + ENDPOINT_URL, (_, response, context) =>
    response(
      context.status(200),
      context.json({
        data: [
          {
            id: 334,
            name: "🤿 aqua",
            created_at: "2021-08-28T15:56:53.000Z",
            owner_id: 185,
            member_ids: [185, 186, 187],
            group_tag_ids: [],
            channel: true,
            public: false,
          },
          {
            id: 333,
            name: "development",
            created_at: "2021-08-28T15:54:22.000Z",
            owner_id: 185,
            member_ids: [185],
            group_tag_ids: [22, 24],
            channel: false,
            public: true,
          },
        ],
      }),
    ),
  ),
  rest.put(
    PACHCA_BASE_URL + ENDPOINT_URL + "/:id",
    async (request, response, context) => {
      const data = await request.json();
      const { id } = request.params;

      return response(
        context.status(200),
        context.json({
          data: {
            id,
            name: data.chat.name || "Бассейн",
            created_at: "2022-08-28T15:56:53.000Z",
            owner_id: 185,
            member_ids: [185, 186, 187],
            group_tag_ids: [],
            channel: true,
            public: data.chat.public || true,
          },
        }),
      );
    },
  ),
  rest.post(
    PACHCA_BASE_URL + ENDPOINT_URL + "/:id/members",
    (_, response, context) => response(context.status(201)),
  ),
  rest.delete(
    PACHCA_BASE_URL + ENDPOINT_URL + "/:id/members/:memberId",
    (_, response, context) => response(context.status(204)),
  ),
  rest.post(
    PACHCA_BASE_URL + ENDPOINT_URL + "/:id/group_tags",
    (_, response, context) => response(context.status(201)),
  ),
  rest.delete(
    PACHCA_BASE_URL + ENDPOINT_URL + "/:id/group_tags/:groupTagId",
    (_, response, context) => response(context.status(204)),
  ),
];
