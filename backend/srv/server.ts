import { setupDevPort } from "dev/port";
import { watch } from "fs";
import { existsAsync } from "fs-jetpack";
import { waitUntil } from "prasi-utils";
import { fs } from "utils/files/fs";
import { devProxy } from "./dev/proxy";
import { devWS } from "./dev/ws";
import { c } from "./utils/color";
import { editor } from "./utils/editor";
import "./utils/init";
import { api } from "./utils/server/api";
import { asset } from "./utils/server/asset";
import { serverContext } from "./utils/server/ctx";
import { initWS } from "./ws/init";
import { site_srv } from "utils/site/srv/site-srv";

if (!(global as any).g) {
  (global as any).g = global;
}

editor.init();
api.init();
site_srv.init();

if (g.mode === "dev") {
  setupDevPort();
  const path = fs.path(`data:site-static`);
  if (!(await existsAsync(path))) {
    await waitUntil(() => existsAsync(path));
  }
  watch(path, (e, c) => {
    asset.nova.rescan();
  });
}

const server = Bun.serve({
  port: 4550,
  websocket: g.mode === "dev" ? devWS : initWS,
  async fetch(request, server) {
    const ctx = serverContext(server, request);
    if (ctx.ws) return undefined;

    if (ctx.url.pathname.startsWith("/nova")) {
      const res = asset.nova.serve(ctx, { prefix: "/nova" });

      if (res) return res;
      return new Response("");
    }

    const apiResponse = await api.serve(ctx);
    if (apiResponse) return apiResponse;

    if (g.mode === "dev") return devProxy(ctx);
    return asset.prasi.serve(ctx);
  },
});

console.log(
  `${c.green}[${g.mode.toUpperCase()}]${c.esc} Prasi Server ${
    c.blue
  }http://localhost:${server.port}${c.esc}`
);
