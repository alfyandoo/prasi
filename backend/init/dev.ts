import { $ } from "bun";

declare global {
  var reloadCount: number;
}

globalThis.reloadCount ??= 0;
globalThis.reloadCount++;
process.env.FORCE_COLOR = "1";

if (globalThis.reloadCount === 1) {
  const dev = {
    backend: $`bun run --silent --hot --no-clear-screen backend/srv/server.ts dev`,
    frontend: $`bun run --silent dev`.cwd(`frontend`).quiet(),
  };

  await Promise.all([dev.backend, dev.frontend]);
}
