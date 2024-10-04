import { codeExec } from "../lib/code-exec";
import { defineNode } from "../lib/define-node";

export const nodeItemRender = defineNode({
  type: "item.render",
  has_branches: true,
  fields: {
    class_name: { idx: 0, type: "string", label: "CSS Class" },
  },
  process: async ({ next, node, vars, console }) => {
    if (node.current.source_code) {
      await codeExec({ code: node.current.source_code, node, vars, console });
    }
    next();
  },
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-stamp"><path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"/><path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13"/></svg>`,
});
