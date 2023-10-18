/* eslint-disable sonarjs/no-duplicate-string */
import { rest } from "msw";
import { PACHCA_BASE_URL } from "./constants";

export default [
  rest.post(PACHCA_BASE_URL + "/users", async (request, response, context) => {
    const data = await request.json();

    return response(
      context.status(200),
      context.json({
        data: {
          id: 1,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          nickname: data.user.nickname,
          email: data.user.email,
          phone_number: data.user.phone_number,
          department: data.user.department,
          role: data.user.role || "user",
          suspended: data.user.suspended || false,
          invite_status: "sent",
          list_tags: data.user.list_tags,
          custom_properties: data.user.custom_properties.map(
            (property: object) => ({
              ...property,
              name: "Город",
              id: 1678,
              data_type: "string",
            }),
          ),
          bot: false,
        },
      }),
    );
  }),

  rest.get(PACHCA_BASE_URL + "/users", async (_, response, context) =>
    response(
      context.status(200),
      context.json({
        data: [
          {
            id: 12,
            first_name: "Олег",
            last_name: "Петров",
            nickname: "olegpetrov",
            email: "olegp@example.com",
            phone_number: "",
            department: "Продукт",
            role: "admin",
            suspended: false,
            invite_status: "confirmed",
            list_tags: ["Product", "Design"],
            custom_properties: [
              {
                id: 1678,
                name: "Город",
                data_type: "string",
                value: "Санкт-Петербург",
              },
            ],
            bot: false,
          },
          {
            id: 13,
            first_name: "Сергей",
            last_name: "Кузнецов",
            nickname: "skuz",
            email: "sergkuzn@example.com",
            phone_number: "",
            department: "Разработка",
            role: "user",
            suspended: false,
            invite_status: "confirmed",
            list_tags: ["Development", "Android"],
            custom_properties: [
              {
                id: 1678,
                name: "Город",
                data_type: "string",
                value: "Москва",
              },
            ],
            bot: false,
          },
          {
            id: 14,
            first_name: "Дмитрий",
            last_name: "Смирнов",
            nickname: "dsmir",
            email: "ds@example.com",
            phone_number: "",
            department: "Разработка",
            role: "user",
            suspended: false,
            invite_status: "confirmed",
            list_tags: ["Development", "Frontend"],
            custom_properties: [
              {
                id: 1678,
                name: "Город",
                data_type: "string",
                value: "Санкт-Петербург",
              },
            ],
            bot: false,
          },
        ],
      }),
    ),
  ),
  rest.get(PACHCA_BASE_URL + "/users/12", (_, response, context) =>
    response(
      context.status(200),
      context.json({
        data: {
          id: 12,
          first_name: "Олег",
          last_name: "Петров",
          nickname: "",
          email: "olegp@example.com",
          phone_number: "",
          department: "Продукт",
          role: "admin",
          suspended: false,
          invite_status: "confirmed",
          list_tags: ["Product", "Design"],
          custom_properties: [
            {
              id: 1678,
              name: "Город",
              data_type: "string",
              value: "Санкт-Петербург",
            },
          ],
          bot: false,
        },
      }),
    ),
  ),
  rest.put(
    PACHCA_BASE_URL + "/users/12",
    async (request, response, context) => {
      const data = await request.json();

      return response(
        context.status(200),
        context.json({
          data: {
            id: 12,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            nickname: data.user.nickname,
            email: data.user.email,
            phone_number: data.user.phone_number,
            department: data.user.department,
            role: data.user.role || "user",
            suspended: data.user.suspended || false,
            invite_status: "sent",
            list_tags: data.user.list_tags,
            custom_properties: data.user.custom_properties?.map(
              (property: object) => ({
                ...property,
                name: "Город",
                id: 1678,
                data_type: "string",
              }),
            ),
            bot: false,
          },
        }),
      );
    },
  ),
  rest.delete(PACHCA_BASE_URL + "/users/12", (_, response, context) =>
    response(context.status(204)),
  ),
];
