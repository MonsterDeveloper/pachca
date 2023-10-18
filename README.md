# pachca
<a href="https://gitpod.io/#https://github.com/MonsterDeveloper/pachca" rel="nofollow noopener noreferrer" target="_blank" class="after:hidden"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Открыть в Gitpod"></a>

[![npm](https://img.shields.io/npm/v/pachca)](https://npmjs.com/package/pachca)
[![Размер минимизированного пакета с gzip](https://img.shields.io/bundlejs/size/pachca)](https://bundlejs.com/?q=pachca)
![Статус сборки](https://img.shields.io/github/actions/workflow/status/MonsterDeveloper/pachca/publish-to-npm.yml)
![Лицензия](https://img.shields.io/github/license/MonsterDeveloper/pachca)


`pachca` это полностью типизированный JS клиент для [мессенджера Пачка](https://pachca.com). Документация к API Пачки доступна [здесь](https://crm.pachca.com/dev/).

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


## Contributing
Пожалуйста, прочитайте [гайд](./CONTRIBUTING.md) перед тем как отправлять PR.

## Лицензия
Этот проект лицензирован [GPL-3.0](./LICENSE).

## Функционал
- ✅ [Дополнительные поля](https://crm.pachca.com/dev/common/fields/)
- ✅ [Загрузка файлов](https://crm.pachca.com/dev/common/files/)
- ✅ [Сотрудники](https://crm.pachca.com/dev/users/new/)
- ⭕ [Теги сотрудников](https://crm.pachca.com/dev/group_tags/list/)
- ⭕ [Беседы и каналы](https://crm.pachca.com/dev/chats/new/)
- ⭕ [Участники бесед и каналов](https://crm.pachca.com/dev/members/users/new/)
- ⭕ [Комментарии](https://crm.pachca.com/dev/threads/new/)
- ⭕ [Сообщения](https://crm.pachca.com/dev/messages/new/)
- ⭕ [Реакции на сообщения](https://crm.pachca.com/dev/reactions/new/)
- ⭕ [Задачи](https://crm.pachca.com/dev/tasks/new/)