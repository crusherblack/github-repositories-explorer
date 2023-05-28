import { waitMs } from "./helper";

describe("waitMs", () => {
  test("should wait for the specified time", async () => {
    const startTime = Date.now();
    await waitMs(200);
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    expect(elapsedTime).toBeGreaterThanOrEqual(200);
  });
});
