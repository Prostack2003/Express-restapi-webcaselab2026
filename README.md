# Express REST API CaseLab

Учебное REST API на Node.js и Express для учёта оборудования и заявок на техническое обслуживание.

На текущем этапе реализован запуск Express-сервера, базовая маршрутизация и эндпоинт проверки доступности сервиса.

## Требования

- Node.js 20 или новее;
- npm.

## Установка

Клонировать репозиторий:

```bash
git clone git@github.com:Prostack2003/Express-restapi-webcaselab2026.git
```

Перейти в каталог проекта:

```bash
cd Express-restapi-webcaselab2026
```

Установить зависимости:

```bash
npm install
```

Создать локальный файл с переменными окружения:

```bash
cp .env.example .env
```

## Переменные окружения

| Переменная           | Назначение                    | Значение по умолчанию                  |
| -------------------- | ----------------------------- | -------------------------------------- |
| `PORT`               | Порт HTTP-сервера             | `3000`                                 |
| `NODE_ENV`           | Режим работы приложения       | `development`                          |
| `GEOCODING_BASE_URL` | Адрес API геокодирования      | `https://geocoding-api.open-meteo.com` |
| `FORECAST_BASE_URL`  | Адрес API прогноза            | `https://api.open-meteo.com`           |
| `REQUEST_TIMEOUT_MS` | Время ожидания внешнего API   | `5000`                                 |
| `TEMPERATURE_UNIT`   | Единица измерения температуры | `celsius`                              |
| `PRECIPITATION_UNIT` | Единица измерения осадков     | `mm`                                   |

## Запуск

Обычный запуск:

```bash
npm start
```

Запуск с автоматическим перезапуском после изменения файлов:

```bash
npm run dev
```

По умолчанию сервер доступен по адресу:

```text
http://localhost:3000
```

## Эндпоинты

| Метод | Путь          | Назначение                   | Код ответа |
| ----- | ------------- | ---------------------------- | ---------- |
| `GET` | `/api/health` | Проверка доступности сервиса | `200`      |

Проверка через `curl`:

```bash
curl http://localhost:3000/api/health
```

Ожидаемый ответ:

```json
{
    "data": {
        "status": "ok"
    }
}
```

## Команды проекта

Запустить тесты:

```bash
npm test
```

Проверить ESLint:

```bash
npm run lint
```

Проверить форматирование:

```bash
npm run format:check
```

Автоматически отформатировать файлы:

```bash
npm run format
```

## Структура проекта

```text
src/
├── api/
│   └── weather.api.js
├── controllers/
│   └── health.controller.js
├── routes/
│   ├── health.routes.js
│   └── index.js
├── tests/
│   └── weather.api.test.js
├── app.js
├── config.js
└── server.js
```

## Архитектура

`src/app.js` создаёт Express-приложение и подключает middleware и маршруты.

`src/server.js` импортирует готовое приложение и запускает HTTP-сервер.

Запрос проверки доступности проходит следующую цепочку:

```text
GET /api/health
→ app.js
→ apiRouter
→ healthRouter
→ getHealth
→ HTTP 200
```

Модуль `src/api/weather.api.js` переиспользован из первого кейса и содержит работу с Open-Meteo.
