# Мидлвары

## src/middlewares.js

Реализуйте мидлвару `addDate()`, которая будет добавлять к названию задачи текущую дату. Например, при вводе имени задачи `Новая задача` должна сформироваться задача с именем `Задача на 14.09.2024: Новая задача`.

## Подсказки

- Для формирования даты подойдет метод [toLocaleDateString()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) и локаль 'ru-RU'.
- Изменение имени должно происходить только при добавлении задачи.
- Структура `payload` при добавлении задачи выглядит так: `{ task: { text: 'task name', id: '1', state: 'active' } }`.
