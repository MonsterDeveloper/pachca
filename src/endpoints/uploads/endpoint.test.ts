import { describe, expect, it } from "vitest";
import { UploadsEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";

const endpoint = new UploadsEndpoint(new ApiClient({ accessToken: "" }));

describe("UploadsEndpoint", () => {
  describe("post", () => {
    it("should retrieve get uploads data", async () => {
      const data = await endpoint.post();

      expect(data).toEqual(
        expect.objectContaining({
          "Content-Disposition": expect.any(String),
        }),
      );
    });
  });

  describe("postFile", () => {
    it("should upload a file", async () => {
      const uploadsData = await endpoint.post();

      const file = new Blob(["Hello, world!"], { type: "text/plain" });

      await endpoint.postFile(file, uploadsData);
    });
  });
});
