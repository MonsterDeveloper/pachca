import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "./api-client";
import { PACHCA_BASE_URL, EXAMPLE_BASE_URL } from "mocks/constants";
import { PachcaError } from "@/errors";

describe("ApiClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("request", () => {
    it("should send a request with default Pachca base URL", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ accessToken: "test" });

      await client.request("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        PACHCA_BASE_URL + "/",
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer test",
            "Content-Type": "application/json; charset=utf-8",
          }),
        }),
      );
    });

    it("should send a request with custom base URL", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({
        accessToken: "test",
        baseUrl: EXAMPLE_BASE_URL,
      });

      await client.request("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        EXAMPLE_BASE_URL + "/",
        expect.any(Object),
      );
    });

    it("should send a request with absolute URL", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({
        accessToken: "test",
      });

      await client.request(EXAMPLE_BASE_URL);

      expect(fetchSpy).toHaveBeenCalledWith(
        EXAMPLE_BASE_URL,
        expect.any(Object),
      );
    });

    it("should send a request with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ accessToken: "test" });

      await client.request("/", {
        searchParameters: new URLSearchParams({ q: "test" }),
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        PACHCA_BASE_URL + "/?q=test",
        expect.any(Object),
      );
    });

    it("should send a request with a JSON body", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ accessToken: "test" });

      await client.request("/", {
        method: "POST",
        body: { name: "John Doe" },
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        PACHCA_BASE_URL + "/",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ name: "John Doe" }),
        }),
      );
    });

    it("should send a request with a FormData body", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ accessToken: "test" });
      const formData = new FormData();
      formData.append("file", new Blob(["test"], { type: "text/plain" }));

      await client.request("/", {
        method: "POST",
        body: formData,
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        PACHCA_BASE_URL + "/",
        expect.objectContaining({
          method: "POST",
          body: formData,
          headers: expect.not.objectContaining({
            Authorization: "Bearer test",
          }),
        }),
      );
    });

    it("should throw an error if a response is not OK", async () => {
      const client = new ApiClient({
        accessToken: "",
        baseUrl: "https://example.com",
      });

      await expect(client.request("/error")).rejects.toThrow(PachcaError);
    });
  });

  describe("get", () => {
    it("should send a GET request", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ accessToken: "test" });

      await client.get("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "GET",
        }),
      );
    });
  });

  describe("post", () => {
    it("should send a POST request", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ accessToken: "" });

      await client.post("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
        }),
      );
    });
  });
});
