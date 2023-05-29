import "@testing-library/jest-dom";
import { fetch, Headers, Request, Response } from "cross-fetch";
import { setupServer } from "msw/node";

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

export const server = setupServer();

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
