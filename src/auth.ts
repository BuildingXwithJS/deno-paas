import { hmac } from "https://denopkg.com/chiefbiiko/hmac/mod.ts";
import db from "./db.ts";

const secureKey = "1234567890";
const hash = password => hmac("sha256", secureKey, password, "utf8", "hex");

export const login = async context => {
  const { value: { login, password } } = await context.request.body();
  const hashedPassword = hash(password);
  const existingAccount = db.accounts
    .find(acc => acc.login === login && acc.password === hashedPassword);
  if (existingAccount) {
    context.response.body = JSON.stringify({ login, success: true });
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
