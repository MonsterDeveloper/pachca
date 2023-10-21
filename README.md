# pachca
[![npm](https://img.shields.io/npm/v/pachca)](https://npmjs.com/package/pachca)
[![Размер минимизированного пакета с gzip](https://img.shields.io/bundlejs/size/pachca)](https://bundlejs.com/?q=pachca)
![Статус сборки](https://img.shields.io/github/actions/workflow/status/MonsterDeveloper/pachca/publish-to-npm.yml)
![Лицензия](https://img.shields.io/github/license/MonsterDeveloper/pachca)

<a href="https://gitpod.io/#https://github.com/MonsterDeveloper/pachca" rel="nofollow noopener noreferrer" target="_blank" class="after:hidden"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Открыть в Gitpod"></a>


`pachca` это полностью типизированный, лёгкий и современный JS клиент для [мессенджера Пачка](https://pachca.com). Документация к API Пачки доступна [здесь](https://crm.pachca.com/dev/).

## Использование

### Установка
<img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/npm.svg"> npm

```bash
npm i pachca
```
<details>
  <summary>Другие менеджеры пакетов</summary>

  <img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/pnpm.svg"> pnpm

  ```bash
  pnpm add pachca
  ```

  <img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/yarn.svg"> Yarn

  ```bash
  yarn add pachca
  ```

  <img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/bun.svg"> bun

  ```bash
  bun add pachca
  ```

  <img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/deno.svg"> Deno

  ```typescript
  import { Pachca } from "https://esm.sh/pachca";
  ```
</details>

### Пример использования
```typescript
import { CustomPropertyEntityType, Pachca } from "pachca";

const pachca = new Pachca({
  accessToken: process.env.PACHCA_ACCESS_TOKEN!, // Токен доступа
});

const { data } = await pachca.customProperties.get({ entity_type: CustomPropertyEntityType.User }); // Получаем все дополнительные поля для пользователей

data.at(0).name; // Результат типизирован
```

## Документация
Библиотека использует [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API), т.е. `fetch`, `FormData`, `Blob` и т.п. Для использования библиотеки в средах, которые не поддерживают Web APIs, необходимо использовать полифиллы.

Экспорты библиотеки доступны только в формате [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

### Инициализация
```typescript
/**
 * Опции создания API клиента
 */
export interface ApiClientOptions {
  /**
   * Базовый URL API
   * @default https://api.pachca.com/api/shared/v1
   */
  baseUrl?: string;

  /**
   * Токен доступа
   * @see https://crm.pachca.com/dev/getting-started/requests-and-responses/
   */
  accessToken: string;

  /**
   * Заголовок User-Agent в запросах
   * @default pachca/${version} (+https://github.com/MonsterDeveloper/pachca)
   */
  userAgent?: string;

  /** ID пользователя/бота, которому принадлежит токен */
  userId?: number;
}

const pachca = new Pachca({
  // Опции
});
```

### Работа с API
В классе `Pachca` есть эндпоинты для запросов к API, которые названы в соответствии с URL, описанными в документации Пачки. Доступные эндпоинты описаны в [разделе Функционал](#функционал). Методы эндпоинты названы в соответствии с HTTP методами, которые они используют.

```typescript
// Получить список сотрудников
const { data: users } = await pachca.users.get();

// Получить сотрудника по id
const { data: user } = await pachca.users.getById(1);

// Удалить сотрудника
await pachca.users.delete(1);

// Обновить беседу или канал
const { data: chat } = await pachca.chats.put(1, { chat: { name: "Новое название" } });
```

### Обработка ошибок
Для удобства библиотека экспортирует кастомные классы ошибок:
- `PachcaError` — общая ошибка Пачки
- `PachcaClientError` — клиентская ошибка, которая происходит при ответе с кодом 4xx. Пояснения доступны в [документации Пачки](https://crm.pachca.com/dev/getting-started/errors/)

```typescript
try {
  await pachca.chats.post({ chat: { name: "Новая беседа" } });
} catch (error) {
  if (error instanceof PachcaClientError) {
    console.log(error.errors[0].message);
  } else if (error instanceof PachcaError) {
    console.log(error.response?.status);
  }
}
```

Также во избежание Callback Hell, можно использовать [@open-draft/until](https://github.com/open-draft/until):
```typescript
import { until } from "@open-draft/until";

async function getChatById(id: number) {
  const { error, data } = await until(() => pachca.chats.getById(id));

  if (error) {
    // обработать ошибку
    return;
  }

  return data;
}
```

### Загрузка файлов
Пример для [Bun](https://bun.sh/):
```typescript
const file = Bun.file("test-pachca.txt");

const uploadsData = await pachca.uploads.post();

await pachca.uploads.postFile(file, uploadsData);
```


## Contributing
Пожалуйста, прочитайте [гайд](./CONTRIBUTING.md) перед тем как отправлять PR.

## Лицензия
Библиотека лицензирован [GPL-3.0](./LICENSE).

## Функционал
- ✅ [Дополнительные поля](https://crm.pachca.com/dev/common/fields/)
- ✅ [Загрузка файлов](https://crm.pachca.com/dev/common/files/)
- ✅ [Сотрудники](https://crm.pachca.com/dev/users/new/)
- ✅ [Теги сотрудников](https://crm.pachca.com/dev/group_tags/list/)
- ✅ [Беседы и каналы](https://crm.pachca.com/dev/chats/new/)
- ✅ [Участники бесед и каналов](https://crm.pachca.com/dev/members/users/new/)
- ✅ [Комментарии](https://crm.pachca.com/dev/threads/new/)
- ✅ [Сообщения](https://crm.pachca.com/dev/messages/new/)
- ⭕ [Реакции на сообщения](https://crm.pachca.com/dev/reactions/new/)
- ⭕ [Задачи](https://crm.pachca.com/dev/tasks/new/)