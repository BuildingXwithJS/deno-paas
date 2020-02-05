import makeJwt from "https://deno.land/x/djwt/create.ts";
import validateJwt from "https://deno.land/x/djwt/validate.ts";
import { hmac } from "https://denopkg.com/chiefbiiko/hmac/mod.ts";
import db from "./db.ts";

// jwt config
const jwtKey = "abc123";
const jwtHeader = {
  alg: "HS512",
  typ: "JWT"
};

// hashing config
const secureKey = "1234567890";
const hash = password => hmac("sha256", secureKey, password, "utf8", "hex");

export const validateToken = async (token) => {
  return await validateJwt(token, jwtKey, false);
};

export const login = async context => {
  const { value: { login, password } } = await context.request.body();
  const hashedPassword = hash(password);
  const existingAccount = db.accounts
    .find(acc => acc.login === login && acc.password === hashedPassword);
  if (existingAccount) {
    const jwt = makeJwt(jwtHeader, { login }, jwtKey);
    context.response.body = JSON.stringify({ login, jwt, success: true });
  } else {
    context.response.body = JSON
      .stringify({ success: false, error: "Wrong login or password" });
  }
};

export const register = async context => {
  const { value: { login, password } } = await context.request.body();
  const hashedPassword = hash(password);
  db.accounts.push({ login, password: hashedPassword });
  context.response.body = JSON.stringify({ login, success: true });
};

export const setupAuth = (router) => {
  router
    .post("/login", login)
    .post("/register", register);
  return router;
};
