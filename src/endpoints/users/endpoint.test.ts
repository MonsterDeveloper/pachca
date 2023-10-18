import { afterEach, describe, expect, it, vi } from "vitest";
import { UsersEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";
import { UserRole } from "./types";

const endpoint = new UsersEndpoint(new ApiClient({ accessToken: "" }));

describe("UsersEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

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

    it("should get a list of users with options", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      await new UsersEndpoint(new ApiClient({ accessToken: "" })).get({
        per: 10,
        page: 2,
        query: "123",
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("?per=10&page=2&query=123"),
        expect.any(Object),
      );
    });
  });

  describe("getById", () => {
    it("should get a user by id", async () => {
      const { data } = await endpoint.getById(12);

      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("first_name");
      expect(data).toHaveProperty("last_name");
      expect(data).toHaveProperty("email");
    });
  });

  describe("put", () => {
    it("should update a user", async () => {
      const putData = {
        user: {
          first_name: "Олег",
          last_name: "Петров",
          email: "test@example.com",
          department: "Продукт",
        },
      };

      const response = await endpoint.put(12, putData);

      expect(response.data).toMatchObject(putData.user);
    });
  });

  describe("delete", () => {
    it("should delete a user", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      await endpoint.delete(12);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("/users/12"),
        expect.objectContaining({
          method: "DELETE",
        }),
      );
    });
  });
});
