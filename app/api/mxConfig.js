import { Configuration, MxPlatformApi } from "mx-platform-node";

const configuration = new Configuration({
  // Configure with your Client ID/API Key from https://dashboard.mx.com
  username: process.env.CLIENT_ID,
  password: process.env.API_KEY,

  // Configure environment. https://int-api.mx.com for development, https://api.mx.com for production
  basePath:
    process.env.DEVELOPMENT_ENVIRONMENT == "production"
      ? "https://api.mx.com"
      : "https://int-api.mx.com",

  baseOptions: {
    headers: {
      Accept: "application/vnd.mx.api.v1+json",
    },
  },
});

export const mxClient = new MxPlatformApi(configuration);
