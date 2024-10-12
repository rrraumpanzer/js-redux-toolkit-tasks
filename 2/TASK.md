# Редьюсеры

## reducers.js

Реализуйте в `Store` следующую структуру состояния:

```json
{
  "comments": {
    "1": { "id": 1, "taskId": 1, "body": "comment 1" },
    "2": { "id": 2, "taskId": 1, "body": "comment 2" },
    "5": { "id": 5, "taskId": 2, "body": "another comment" }
  },
  "tasks": {
    "1": { "id": 1, "name": "first task" },
    "2": { "id": 2, "name": "second task" }
  }
}
```

`Store` должен уметь обрабатывать действия, перечисленные в файле `actions.js`.

При удалении `task` должны удаляться комментарии с таким же `taskId`, как `id` у этого `task`.

## Подсказки

- [\_.omitBy()](https://lodash.com/docs/4.17.15#omitBy) позволяет удалить из объекта свойство по значению.
