import { describe, expect, it } from "vitest";
import { UsersEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";
import { UserRole } from "./types";

const endpoint = new UsersEndpoint(new ApiClient({ accessToken: "" }));

describe("UsersEndpoint", () => {
  describe("post", () => {
    it("should create a user", async () => {
      const { data } = await endpoint.post({
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
          role: UserRole.Admin,
        },
        skip_email_notify: true,
      });

      expect(data).toMatchObject({
        id: expect.any(Number),
        first_name: "Олег",
        last_name: "Петров",
        email: "olegp@example.com",
        department: "Продукт",
        suspended: false,
        invite_status: "sent",
        list_tags: ["Product", "Design"],
        custom_properties: [
          {
            id: 1678,
            name: "Город",
            data_type: "string",
            value: "Санкт-Петербург",
          },
        ],
        role: "admin",
        bot: false,
      });
    });
  });

  describe("get", () => {
    it("should get a list of users", async () => {
      const { data } = await endpoint.get();

      expect(data).toStrictEqual(expect.any(Array));
      expect(data[0]).toHaveProperty("id");
      expect(data[0]).toHaveProperty("first_name");
      expect(data[0]).toHaveProperty("last_name");
      expect(data[0]).toHaveProperty("email");
    });
  });
});
