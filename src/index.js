import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";

import log from "../src/middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js"
import amenitiesRouter from "./routes/amenities.js";

const app = express();

Sentry.init({
  dsn: 'https://2bfcc7deb79878de8fcf67ff643c3fd6@o4506167694196736.ingest.sentry.io/4506373116657664',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Global middleware
app.use(express.json());
app.use(log);

// Resource routes
app.use("/amenities", amenitiesRouter);
// Trace errors
// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler)

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
