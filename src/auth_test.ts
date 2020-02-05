import { assertEquals, test } from "https://deno.land/std/testing/mod.ts";
import { login, register } from "./auth.ts";

const testLogin = "test";
const testPassword = "123";

test(async function registerTest() {
  const testContext = {
    request: {
      body:
        async () => ({ value: { login: testLogin, password: testPassword } })
    },
    response: {
      body: ""
    }
  };
  await register(testContext);
  assertEquals(
    testContext.response.body,
    JSON.stringify({ login: testLogin, success: true })
  );
});

test(async function loginTest() {
  const testContext = {
    request: {
      body:
        async () => ({ value: { login: testLogin, password: testPassword } })
    },
    response: {
      body: ""
    }
  };
  await login(testContext);
  assertEquals(
    testContext.response.body,
    JSON.stringify({ login: testLogin, success: true })
  );
});
