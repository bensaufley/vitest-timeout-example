import { describe, it } from "vitest";

describe("timeout examples", () => {
  it.concurrent(
    "times out",
    async () => {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 5_000);
      });
    },
    150
  );

  it.concurrent(
    "does not time out",
    async () => {
      const start = Date.now();
      await new Promise<void>((resolve) => {
        while (Date.now() - start < 5_000) {}
        resolve();
      });
    },
    150
  );

  it.concurrent(
    "does not time out even with a promise after completion allowing the test runner to intervene",
    async () => {
      const start = Date.now();
      while (Date.now() - start < 5_000) {}
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 100); // setTimeout(resolve, 0 or even 10) has no effect either
      });
    },
    150
  );
});
