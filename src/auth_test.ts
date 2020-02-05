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
  const result = JSON.parse(testContext.response.body);
  assertEquals(result.login, testLogin);
  assertEquals(result.success, true);
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
  const result = JSON.parse(testContext.response.body);
  assertEquals(result.login, testLogin);
  assertEquals(result.success, true);
});
