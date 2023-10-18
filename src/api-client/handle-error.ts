import { PachcaClientError, PachcaError } from "@/errors";

export async function handleError(response: Response): Promise<never> {
  if (!response.headers.has("Content-Type"))
    throw new PachcaError("В ответе нет заголовка Content-Type", response);

  const contentType = response.headers.get("Content-Type");

  if (
    !contentType?.includes("application/json") &&
    !contentType?.includes("text/xml")
  )
    throw new PachcaError(
      `Заголовок Content-Type ${contentType} в ответе не поддерживается`,
      response,
    );

  const text = await response.text();

  if (!text) throw new PachcaError("Тело ответа пустое", response);

  if (contentType?.includes("text/xml")) {
    const code = /<Code>(.+?)<\/Code>/.exec(text)?.at(1);
    const message = /<Message>(.+?)<\/Message>/.exec(text)?.at(1);

    throw new PachcaError(`${code} ${message}`, response);
  }

  const data: unknown = JSON.parse(text);

  if (
    typeof data === "object" &&
    data &&
    "errors" in data &&
    Array.isArray(data.errors)
  )
    throw new PachcaClientError("Клиентская ошибка", response, data.errors);

  throw new PachcaError(
    `HTTP ${response.status} ${response.statusText}`,
    response,
  );
}
