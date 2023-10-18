import { rest } from "msw";
import { PACHCA_BASE_URL } from "./constants";

const ENDPOINT_URL = "/uploads";
const DIRECT_UPLOAD_URL = "https://pachca-prod-uploads.s3.storage.selcloud.ru";

function composeXmlError(code: string, message: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <Error>
    <Code>${code}</Code>
    <Message>${message}</Message>
  </Error>`;
}

export default [
  rest.post(PACHCA_BASE_URL + ENDPOINT_URL, (_, response, context) =>
    response(
      context.status(200),
      context.json({
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
        direct_url: DIRECT_UPLOAD_URL,
      }),
    ),
  ),
  rest.post(DIRECT_UPLOAD_URL, (request, response, context) => {
    if (request.headers.has("Authorization"))
      return response(
        context.status(400),
        context.xml(
          composeXmlError("AccessDenied", "Invalid authorization type"),
        ),
      );

    return response(context.status(204));
  }),
];
