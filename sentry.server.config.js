import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://96fb187e03a84805a4f46812fc614fc2@o4505006413840384.ingest.sentry.io/4505006878883840',
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
