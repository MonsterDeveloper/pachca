import { describe, expectTypeOf, it } from "vitest";
import { UsersEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";
import { CustomPropertyDataType } from "../custom-properties";

const endpoint = new UsersEndpoint(new ApiClient({ accessToken: "" }));
const sampleUser = {
  id: 12,
  first_name: "Олег",
  last_name: "Петров",
  nickname: "",
  email: "olegp@example.com",
  phone_number: "",
  department: "Продукт",
  suspended: false,
  list_tags: ["Product", "Design"],
  custom_properties: [
    {
      id: 1678,
      name: "Город",
      data_type: CustomPropertyDataType.String,
      value: "Санкт-Петербург",
    },
  ],
  bot: false,
};

describe("UsersEndpoint", () => {
  describe("post", () => {
    it("should accept a request body and return a user", async () => {
      const postData = {
        user: {
          first_name: "Олег",
          last_name: "Петров",
          email: "olegp@example.com",
          department: "Продукт",
          list_tags: ["Product", "Design"],
          custom_properties: [
            {
              id: 1678,
              value: "Санкт-Петербург",
            },
          ],
        },
        skip_email_notify: true,
      };

      expectTypeOf(endpoint.post).toBeCallableWith(postData);

      const response = await endpoint.post(postData);

      expectTypeOf({
        data: sampleUser,
      }).toMatchTypeOf(response);
    });
  });

  describe("get", () => {
    it("should accept request options and return a list of users", async () => {
      expectTypeOf(endpoint.get).toBeCallableWith({
        per: 10,
        page: 2,
        query: "test",
      });
      // eslint-disable-next-line unicorn/no-useless-undefined
      expectTypeOf(endpoint.get).toBeCallableWith(undefined);

      const { data } = await endpoint.get();

      expectTypeOf(sampleUser).toMatchTypeOf(data[0]);
    });
  });
});
