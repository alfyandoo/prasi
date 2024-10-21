import { getActiveNode } from "crdt/node/get-node-by-id";
import { ActiveTree, getActiveTree } from "logic/active";
import { EDGlobal } from "logic/ed-global";
import { PNode } from "logic/types";
import { PExpr } from "popup/expr/lib/types";
import { EdExprPicker } from "popup/expr/parts/expr-picker";
import { useGlobal } from "utils/react/use-global";
import { VarUsage } from "utils/types/item";
import { EdEventItem } from "./ed-event-item";
import { EdEventTypes } from "./ed-event-types";

export const EdEvents = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const node = getActiveNode(p);

  const item = node?.item;
  if (!item) return null;

  return (
    <div className="flex flex-col flex-1 select-none">
      <div className="text-sm flex flex-1 m-1 my-2 flex-col space-y-1 items-stretch">
        <div className="flex items-center">
          <div className="w-[90px] mr-1">Content</div>

          {node.item.loop ? (
            <div className=" text-slate-500 flex items-center h-[25px] justify-between flex-1">
              <div>Using Loop</div>
              <span
                onClick={() => {
                  const tree = getActiveTree(p);
                  tree.update("Edit Item Content", ({ findNode }) => {
                    const n = findNode(item.id);
                    if (n) {
                      if (n.item.loop) {
                        clearUsage(
                          tree,
                          findNode,
                          { id: item.id, mode: "loop" },
                          n.item.loop
                        );
                      }

                      n.item.loop = undefined;
                    }
                  });
                }}
                className="text-red-600 cursor-pointer px-1 border border-red-100 hover:border-red-500 ml-1"
              >
                Clear
              </span>
            </div>
          ) : (
            <EdExprPicker
              value={node.item.content}
              onChange={(value) => {
                const tree = getActiveTree(p);
                tree.update("Edit Item Content", ({ findNode }) => {
                  const n = findNode(item.id);
                  if (n) {
                    if (n.item.content && n.item.content) {
                      clearUsage(
                        tree,
                        findNode,
                        { id: item.id, mode: "content" },
                        n.item.content
                      );
                    }

                    n.item.content = value;
                    // if (value && value.var) {
                    //   setUsage(
                    //     tree,
                    //     findNode,
                    //     {
                    //       id: item.id,
                    //       mode: "content",
                    //     },
                    //     value
                    //   );
                    // }
                  }
                });
              }}
            />
            // <Picker
            //   value={node.item.content}
            //   onChange={(value) => {
            //     const tree = getActiveTree(p);
            //     tree.update("Edit Item Content", ({ findNode }) => {
            //       const n = findNode(item.id);
            //       if (n) {
            //         if (n.item.content && n.item.content.var) {
            //           clearUsage(
            //             tree,
            //             findNode,
            //             { id: item.id, mode: "content" },
            //             n.item.content
            //           );
            //         }

            //         n.item.content = value;
            //         if (value && value.var) {
            //           setUsage(
            //             tree,
            //             findNode,
            //             {
            //               id: item.id,
            //               mode: "content",
            //             },
            //             value
            //           );
            //         }
            //       }
            //     });
            //   }}
            //   open={p.ui.popup.events.open === "content"}
            //   onOpenChange={(open) => {
            //     if (open) p.ui.popup.events.open = "content";
            //     else p.ui.popup.events.open = "";
            //     p.render();
            //   }}
            //   empty={<>Children</>}
            // ></Picker>
          )}
        </div>
        <div className="flex items-center">
          <div className="w-[90px] mr-1">Loop Items</div>
          <EdExprPicker value={node.item.loop} onChange={() => {}}>
            Mantap
          </EdExprPicker>
          {/* <Picker
            value={node.item.loop}
            onChange={(value) => {
              const tree = getActiveTree(p);
              tree.update("Edit Item loop", ({ findNode }) => {
                const n = findNode(item.id);
                if (n) {
                  if (n.item.loop && n.item.loop.var) {
                    clearUsage(
                      tree,
                      findNode,
                      { id: item.id, mode: "loop" },
                      n.item.loop
                    );
                  }

                  n.item.loop = value;
                  if (value && value.var) {
                    setUsage(
                      tree,
                      findNode,
                      {
                        id: item.id,
                        mode: "loop",
                      },
                      value
                    );
                  }
                }
              });
            }}
            empty={<div className="text-slate-400">Empty</div>}
            open={p.ui.popup.events.open === "loop"}
            onOpenChange={(open) => {
              if (open) p.ui.popup.events.open = "loop";
              else p.ui.popup.events.open = "";
              p.render();
            }}
          ></Picker> */}
        </div>
      </div>
      <div className="flex flex-col border-t flex-1">
        {Object.entries(EdEventTypes).map(([event]) => {
          return <EdEventItem key={event} type={event} node={node} />;
        })}
      </div>
    </div>
  );
};

const clearUsage = (
  tree: ActiveTree,
  findNode: (id: string) => null | PNode,
  used_by: { id: string; mode: "content" | "loop" },
  usage?: PExpr
) => {
  // const var_id = usage.var?.var_id;
  // if (var_id) {
  //   const source = tree.var_items[var_id];
  //   if (source?.item.id) {
  //     const n = findNode(source.item.id);
  //     if (n && n.item.vars) {
  //       const _var = n.item.vars[var_id];
  //       if (_var && _var.usage && _var.usage[used_by.id]) {
  //         delete _var.usage[used_by.id][used_by.mode];
  //         if (Object.keys(_var.usage[used_by.id]).length === 0) {
  //           delete _var.usage[used_by.id];
  //         }
  //       }
  //     }
  //   }
  // }
};

const setUsage = (
  tree: ActiveTree,
  findNode: (id: string) => null | PNode,
  used_by: { id: string; mode: "content" | "loop" },
  usage: { var?: VarUsage }
) => {
  const var_id = usage.var?.var_id;
  if (var_id) {
    const source = tree.var_items[var_id];
    if (source?.item.id) {
      const n = findNode(source.item.id);
      if (n && n.item.vars) {
        const _var = n.item.vars[var_id];
        if (_var) {
          if (!_var.usage) _var.usage = {};
          if (!_var.usage[used_by.id]) {
            _var.usage[used_by.id] = {};
          }
          _var.usage[used_by.id][used_by.mode] = true;
        }
      }
    }
  }
};
