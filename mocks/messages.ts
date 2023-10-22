/* eslint-disable unicorn/no-null */
import { rest } from "msw";
import { PACHCA_BASE_URL } from "./constants";

const ENDPOINT_URL = "/messages";

export default [
  rest.post(
    PACHCA_BASE_URL + ENDPOINT_URL,
    async (request, response, context) => {
      const { message } = await request.json();

      return response(
        context.status(200),
        context.json({
          data: {
            id: 194_275,
            entity_type: message.entity_type || "discussion",
            entity_id: message.entity_id,
            chat_id: 198,
            content: message.content,
            user_id: 12,
            created_at: new Date().toISOString(),
            files: [],
            thread: null,
            parent_message_id: null,
          },
        }),
      );
    },
  ),
  rest.get(
    PACHCA_BASE_URL + ENDPOINT_URL + "/:id",
    (request, response, context) =>
      response(
        context.status(200),
        context.json({
          data: {
            id: Number(request.params.id),
            entity_type: "discussion",
            entity_id: 198,
            chat_id: 198,
            content:
              "Вчера мы продали 756 футболок (что на 10% больше, чем в прошлое воскресенье)",
            user_id: 12,
            created_at: "2020-06-08T09:32:57.000Z",
            files: [
              {
                id: 3560,
                key: "attaches/files/12/21zu7934-02e1-44d9-8df2-0f970c259796/congrat.png",
                name: "congrat.png",
                file_type: "file",
              },
            ],
            thread: {
              id: 29_873,
              chat_id: 1_949_863,
            },
            parent_message_id: 194_274,
          },
        }),
      ),
  ),
  rest.get(PACHCA_BASE_URL + ENDPOINT_URL, (request, response, context) => {
    const chat_id = Number(request.url.searchParams.get("chat_id"));
    return response(
      context.status(200),
      context.json({
        data: [
          {
            id: 1_194_277,
            entity_type: "discussion",
            entity_id: 198,
            chat_id,
            content: "Это сообщение тоже попадёт в экспорт",
            user_id: 12,
            created_at: "2023-09-18T13:43:32.000Z",
            files: [],
            thread: {
              id: 2633,
              chat_id: 44_997,
            },
            parent_message_id: null,
          },
          {
            id: 1_194_276,
            entity_type: "discussion",
            entity_id: 198,
            chat_id,
            content: "**Andrew** добавил **Export bot** в беседу",
            user_id: 12,
            created_at: "2023-09-18T13:43:27.000Z",
            files: [],
            thread: null,
            parent_message_id: null,
          },
          {
            id: 1_194_275,
            entity_type: "discussion",
            entity_id: 198,
            chat_id,
            content: "**Andrew** создал беседу",
            user_id: 12,
            created_at: "2023-09-18T13:43:19.000Z",
            files: [],
            thread: null,
            parent_message_id: null,
          },
        ],
      }),
    );
  }),
  rest.put(
    PACHCA_BASE_URL + ENDPOINT_URL + "/:id",
    async (request, response, context) => {
      const id = Number(request.params.id);
      const { message } = await request.json();

      return response(
        context.status(200),
        context.json({
          data: {
            id,
            entity_type: "discussion",
            entity_id: 17_452,
            chat_id: 17_452,
            content: message.content,
            user_id: 65,
            created_at: "2022-06-08T09:32:57.000Z",
            files: message.files,
            thread: null,
            parent_message_id: null,
          },
        }),
      );
    },
  ),
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
  rest.post(
    `${PACHCA_BASE_URL}${ENDPOINT_URL}/:id/reactions`,
    (_, response, context) => response(context.status(201)),
  ),
  rest.delete(
    `${PACHCA_BASE_URL}${ENDPOINT_URL}/:id/reactions`,
    (_, response, context) => response(context.status(204)),
  ),
  rest.get(
    `${PACHCA_BASE_URL}${ENDPOINT_URL}/:id/reactions`,
    (_, response, context) =>
      response(
        context.status(200),
        context.json({
          data: [
            {
              user_id: 76_243,
              created_at: "2023-09-11T14:59:35.000Z",
              code: "👍",
            },
            {
              user_id: 10_764,
              created_at: "2023-09-11T15:00:31.000Z",
              code: "👍",
            },
            {
              user_id: 27_494,
              created_at: "2023-09-11T15:01:27.000Z",
              code: "👍",
            },
            {
              user_id: 27_494,
              created_at: "2023-09-11T15:01:47.000Z",
              code: "🔥",
            },
            {
              user_id: 11_887,
              created_at: "2023-09-11T15:12:49.000Z",
              code: "👍",
            },
            {
              user_id: 11_887,
              created_at: "2023-09-11T15:13:46.000Z",
              code: "⭐",
            },
            {
              user_id: 11_887,
              created_at: "2023-09-11T15:13:47.000Z",
              code: "🔥",
            },
          ],
        }),
      ),
  ),
];
