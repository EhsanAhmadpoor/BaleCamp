import { parseArgs } from "jsr:@std/cli/parse-args";
import { Router } from "https://deno.land/x/nativerouter/mod.ts";
import { serveDir } from "jsr:@std/http/file-server";
import * as base64 from "jsr:@std/encoding/base64";

const users: Record<string, string> = {
  admin: Deno.env.get("ADMIN_PASS") ?? "TEST",
};

const args = parseArgs(Deno.args, {
  string: ["port"],
});

const dir = args._[0] as string;

const router = new Router();

const textDecoder = new TextDecoder();

function authorize(req: Request, username?: string) {
  const authHeader = req.headers.get("Authorization");

  if (authHeader) {
    const [type, token] = authHeader.split(/\s/);
    if (/basic/i.test(type) && token) {
      const [_username, pass] = textDecoder.decode(base64.decodeBase64(token))
        .split(":");
      if (username && username !== _username) return false;

      const password = users[_username];
      return Boolean(password) && password === pass;
    }
  }

  return false;
}

function unAuthorizeResponse() {
  const response = new Response("401", { status: 401 });
  response.headers.append(
    "WWW-Authenticate",
    `Basic realm="Access to content", charset="UTF-8"`,
  );

  return response;
}

router.get(`/*`, async (req) => {
  const url = new URL(req.url);

  if (authorize(req)) {
    console.log(url.pathname);
    return serveDir(req, {
      fsRoot: dir,
    });
  }

  return unAuthorizeResponse();
});

router.put("/users", async (req) => {
  if (authorize(req, "admin")) {
    const body = await req.text();
    body.split("\n").map((line) => line.split(/\s/)).forEach(
      ([user, pass]) => {
        users[user] = pass;
      },
    );

    return new Response("Updated!", { status: 200 });
  }

  return unAuthorizeResponse();
});

console.log(args);

const port = args.port ?? Deno.env.get("PORT");

console.log(`Serving directory: ${dir} on port: ${port}`);

Deno.serve({ port: port ? Number(port) : 8080 }, (req) => router.route(req));
