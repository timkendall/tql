import { Operation, SelectionSet, Field } from "../Operation";

import { Executor } from "../Client";

describe("Executor", () => {
  it("supports passing static HTTP headers", async () => {
    const fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          data: { test: "yay!" },
          errors: undefined,
        }),
    });

    const executor = new Executor({
      uri: "http://localhost:8080",
      httpHeaders: { Authentication: "my-token" },
      fetch: fetch as any,
    });

    const result = await executor.execute(
      new Operation("foo", "query", new SelectionSet([new Field("test")]))
    );

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080", {
      body: '{"operationName":"foo","query":"query foo {\\n  test\\n}"}',
      headers: {
        Authentication: "my-token",
        "Content-Type": "application/json",
      },
      method: "post",
    });
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "test": "yay!",
        },
        "errors": undefined,
      }
    `);
  });

  it("supports passing dynamoc HTTP headers", async () => {
    const fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          data: { test: "yay!" },
          errors: undefined,
        }),
    });

    const executor = new Executor({
      uri: "http://localhost:8080",
      httpHeaders: () => ({ Authentication: "my-token" }),
      fetch: fetch as any,
    });

    const result = await executor.execute(
      new Operation("foo", "query", new SelectionSet([new Field("test")]))
    );

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080", {
      body: '{"operationName":"foo","query":"query foo {\\n  test\\n}"}',
      headers: {
        Authentication: "my-token",
        "Content-Type": "application/json",
      },
      method: "post",
    });
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "test": "yay!",
        },
        "errors": undefined,
      }
    `);
  });
});
