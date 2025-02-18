import { api } from "encore.dev/api";
import { randomBytes } from "node:crypto";

interface URL {
  id: string;
  url: string;
}

interface ShortenParams {
  url: string;
}

export const shorten = api(
  { method: "POST", path: "/url", expose: true },
  async ({ url }: ShortenParams): Promise<URL> => {
    const id = randomBytes(6).toString("base64url");
    return { id, url };
  }
);
