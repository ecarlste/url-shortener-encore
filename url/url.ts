import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { randomBytes } from "node:crypto";

const db = new SQLDatabase("url", { migrations: "./migrations" });

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

    await db.exec`
      INSERT INTO url (id, original_url)
      VALUES (${id}, ${url})
    `;

    return { id, url };
  }
);

export const get = api(
  { expose: true, auth: false, method: "GET", path: "/url/:id" },
  async ({ id }: { id: string }): Promise<URL> => {
    const row = await db.queryRow`
      SELECT original_url FROM url WHERE id = ${id}
    `;

    if (!row) throw APIError.notFound("url not found");

    return { id, url: row.original_url };
  }
);
