import dotenv from 'dotenv';
import process from 'node:process';

dotenv.config({ quiet: true });

const DEFAULT_PORT = 3000;
const DEFAULT_NODE_ENV = 'development';

const port = Number(process.env.PORT ?? DEFAULT_PORT);
const nodeEnv = process.env.NODE_ENV ?? DEFAULT_NODE_ENV;

const DEFAULT_TIMEOUT_MS = 5000;
const DEFAULT_GEOCODING_URL = 'https://geocoding-api.open-meteo.com';
const DEFAULT_FORECAST_URL = 'https://api.open-meteo.com';

const requestTimeoutMs = Number(
    process.env.REQUEST_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS
);
const geocodingBaseUrl =
    process.env.GEOCODING_BASE_URL ?? DEFAULT_GEOCODING_URL;
const forecastBaseUrl = process.env.FORECAST_BASE_URL ?? DEFAULT_FORECAST_URL;
const temperatureUnit = process.env.TEMPERATURE_UNIT ?? 'celsius';
const precipitationUnit = process.env.PRECIPITATION_UNIT ?? 'mm';

const reportsDir = process.env.REPORTS_DIR ?? 'reports';

export {
    port,
    nodeEnv,
    requestTimeoutMs,
    geocodingBaseUrl,
    forecastBaseUrl,
    temperatureUnit,
    precipitationUnit,
    reportsDir,
};
