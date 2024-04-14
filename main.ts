import { proxy } from "https://deno.land/x/oak_http_proxy@2.3.0/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v12.6.2/mod.ts";

const app = new Application();
const router = new Router();

router.get(
  "/api/(.*)",
  proxy("https://api.github.com", {
    proxyReqUrlDecorator: (url, req) => {
      url.pathname = req.url.pathname.replace("/api", "");
      return url;
    },
  })
);
router.get("/", (ctx) => {
  ctx.request;
  ctx.response.body = "Hello World!";
});

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 3000 });
