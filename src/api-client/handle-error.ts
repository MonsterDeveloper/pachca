import { PachcaClientError, PachcaError } from "@/errors";

export async function handleError(response: Response): Promise<never> {
  if (!response.headers.has("Content-Type"))
    throw new PachcaError("В ответе нет заголовка Content-Type", response);

  if (!response.headers.get("Content-Type")?.includes("application/json"))
    throw new PachcaError(
      "Заголовок Content-Type в ответе не application/json",
      response,
    );

  const text = await response.text();

  if (!text) throw new PachcaError("Тело ответа пустое", response);

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
