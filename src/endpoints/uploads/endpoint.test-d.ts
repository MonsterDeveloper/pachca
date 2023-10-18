import { describe, expectTypeOf, it } from "vitest";
import { UploadsEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";

const endpoint = new UploadsEndpoint(new ApiClient({ accessToken: "" }));

describe("UploadsEndpoint", () => {
  describe("get", () => {
    it("should return correct custom properties type", async () => {
      expectTypeOf(endpoint.post()).resolves.toEqualTypeOf({
        "Content-Disposition": "attachment",
        acl: "private",
        policy:
          "eyJloNBpcmF0aW9uIjoiMjAyPi0xMi0wOFQwNjo1NzozNFHusCJjb82kaXRpb25zIjpbeyJidWNrZXQiOiJwYWNoY2EtcHJhYC11cGxvYWRzOu0sWyJzdGFydHMtd3l4aCIsIiRrZXkiLCJhdHRhY8hlcy9maWxlcy1xODUyMSJdLHsiQ29udGVudC1EaXNwb3NpdGlvbiI6ImF0dGFjaG1lbnQifSx2ImFjbCI3InByaXZhdGUifSx7IngtYW16LWNyZWRlbnRpYWwi2iIxNDIxNTVfc3RhcGx4LzIwMjIxMTI0L4J1LTFhL5MzL1F2czRfcmVxdWVzdCJ9LHsieC1hbXotYWxnb3JpdGhtIjytQVdTNC1ITUFDLVNIQTI1NiJ7LHsieC1hbXotZGF0ZSI6IjIwMjIxMTI0VDA2NTczNFoifV22",
        "x-amz-credential": "286471_server/20211122/kz-6x/s3/aws4_request",
        "x-amz-algorithm": "AWS4-HMAC-SHA256",
        "x-amz-date": "20211122T065734Z",
        "x-amz-signature":
          "87e8f3ba4083c937c0e891d7a11tre932d8c33cg4bacf5380bf27624c1ok1475",
        key: "attaches/files/93746/e354fd79-9jh6-f2hd-fj83-709dae24c763/${filename}",
        direct_url: "https://api.pachca.com/api/v3/direct_upload",
      });
    });
  });
});
