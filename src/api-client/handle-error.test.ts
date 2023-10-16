import { describe, expect, it } from "vitest";
import { handleError } from "./handle-error";
import { PachcaClientError, PachcaError } from "@/errors";

describe("handleError", () => {
  it("should throw PachcaError if response has no Content-Type header", async () => {
    const response = new Response(undefined, { status: 400 });
    await expect(handleError(response)).rejects.toThrow(
      new PachcaError("В ответе нет заголовка Content-Type", response),
    );
  });

  it("should throw a PachcaError if the response Content-Type is not application/json", async () => {
    const response = new Response(undefined, {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
    await expect(handleError(response)).rejects.toThrow(
      new PachcaError(
        "Заголовок Content-Type в ответе не application/json",
        response,
      ),
    );
  });

  it("should throw a PachcaError when the response body is empty but Content-Type is application/json", async () => {
    const response = new Response("", {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
    await expect(handleError(response)).rejects.toThrow(
      new PachcaError("Тело ответа пустое", response),
    );
  });

  it("should throw a PachcaClientError if the response body is a JSON object with an errors array", async () => {
    const errors = [
      {
        key: "error key",
        value: "some value",
        message: "some error message",
        code: "blank",
        payload: { some: "meta" },
      },
      {
        key: "error key 2",
        value: "some value 2",
        message: "some error message 2",
        code: "blank 2",
        payload: { some: "meta 2" },
      },
    ];
    const response = new Response(
      JSON.stringify({
        errors,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
    await expect(handleError(response)).rejects.toThrow(
      new PachcaClientError("Клиентская ошибка", response, errors),
    );
  });

  it("should throw a PachcaError with the HTTP status and statusText if none of the above conditions are met", async () => {
    const response = new Response(JSON.stringify({}), {
      status: 400,
      statusText: "Bad Request",
      headers: { "Content-Type": "application/json" },
    });
    await expect(handleError(response)).rejects.toThrow(
      new PachcaError("HTTP 400 Bad Request", response),
    );
  });
});
