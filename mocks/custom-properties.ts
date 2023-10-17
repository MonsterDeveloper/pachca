import { rest } from "msw";
import { PACHCA_BASE_URL } from "./constants";
import { CustomPropertyEntityType } from "@/endpoints";

const ENDPOINT_URL = "/custom_properties";

export default [
  rest.get(PACHCA_BASE_URL + ENDPOINT_URL, (request, response, context) => {
    const entityType = request.url.searchParams.get("entity_type");

    if (entityType !== CustomPropertyEntityType.User)
      return response(
        context.status(400),
        context.json({
          errors: [
            {
              key: "custom_property.entity_type",
              value: "Asd",
              message: "Тип сущности имеет непредусмотренное значение",
              code: "inclusion",
              // eslint-disable-next-line unicorn/no-null
              payload: null,
            },
          ],
        }),
      );

    return response(
      context.status(200),
      context.json({
        data: [
          {
            id: 1487,
            name: "Адрес",
            data_type: "string",
          },
          {
            id: 1489,
            name: "Номер доступа",
            data_type: "number",
          },
          {
            id: 1572,
            name: "Дата рождения",
            data_type: "date",
          },
        ],
      }),
    );
  }),
];
