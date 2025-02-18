import { describe, expect, test } from "vitest";
import { get, shorten } from "./url";

describe("shorten", () => {
  test("getting a shortened url should give back the original", async () => {
    const originalUrl = "https://example.com";

    const shortened = await shorten({ url: originalUrl });
    const result = await get({ id: shortened.id });

    expect(result.url).toBe(originalUrl);
  });
});
