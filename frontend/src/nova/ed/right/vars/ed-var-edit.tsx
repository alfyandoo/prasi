import { Trash2 } from "lucide-react";
import { Resizable } from "re-resizable";
import { FC } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { IVar } from "utils/types/item";
import { Tooltip } from "utils/ui/tooltip";
import { EdTypeLabel } from "./lib/label";
import { EObjectEntry, EType } from "./lib/type";
import { EdVarPicker } from "./picker/picker";
import { EdPickerBoolean } from "./picker/picker-boolean";
import { EdPickerNumber } from "./picker/picker-number";
import { EdPickerString } from "./picker/picker-string";
import { EdPickerLines } from "./picker/picker-lines";

const DEPTH_PX = 6;
export const EdVarEdit: FC<{
  variable: IVar<any>;
  onChange: (arg: {
    path: string;
    type: EType | EObjectEntry | undefined;
    valuePath?: string;
  }) => void;
  onRename: (arg: {
    path: string[];
    new_name: string;
    old_name: string;
  }) => void;
  setValue: (path: string[], value: any) => void;
}> = ({ variable, onChange, onRename, setValue }) => {
  const size = localStorage.getItem("prasi-var-edit-size") || "400*700";
  const [height, width] = size.split("*").map(Number);
  return (
    <Resizable
      defaultSize={{
        height,
        width,
      }}
      className={cx(
        "flex text-sm ",
        css`
          min-width: 700px;
        `
      )}
      onResizeStop={(_, __, div) => {
        localStorage.setItem(
          "prasi-var-edit-size",
          div.clientHeight.toString() + "*" + div.clientWidth.toString()
        );
      }}
    >
      <PanelGroup autoSaveId="prasi-var-edit" direction="horizontal">
        <Panel className="flex flex-col">
          <div className="border-b text-xs bg-slate-50 p-1 border-r">
            Current Value:
          </div>

          <div className="flex flex-1 relative overflow-auto border-r ">
            <pre className="absolute inset-0 whitespace-pre-wrap text-[7px] monospace leading-3">
              {JSON.stringify(variable, null, 2)}
            </pre>
          </div>
        </Panel>
        <PanelResizeHandle />
        <Panel className="flex flex-col">
          <div className="border-b text-xs bg-slate-50 p-1">Default Value:</div>
          <div className="flex flex-1 relative overflow-auto">
            <div className="absolute inset-0 flex flex-col flex-1 select-none">
              <EdVarPicker
                type={variable.type}
                onChange={(path, type, valuePath) => {
                  onChange({
                    path: path.join("."),
                    type,
                    valuePath: valuePath ? valuePath.join(".") : undefined,
                  });
                }}
                path={["~~"]}
                value={variable.default}
              >
                {({
                  Item,
                  open,
                  type,
                  depth,
                  name,
                  Rename,
                  path,
                  value,
                  valuePath,
                  markChanged,
                  children,
                }) => (
                  <div className={cx("flex flex-1 flex-col items-stretch")}>
                    <div
                      className={cx(
                        "flex items-stretch relative cursor-pointer border-b ",
                        css`
                          padding-left: ${(depth - 1) * DEPTH_PX}px;
                        `
                      )}
                      onClick={open}
                    >
                      <div className="flex justify-between flex-1">
                        <div className="flex items-stretch text-sm flex-1">
                          <Item
                            className={cx(
                              "flex h-[30px]",
                              css`
                                .text {
                                  font-size: 90%;
                                  margin-left: 3px;
                                }
                              `,
                              !name && "flex-1"
                            )}
                          >
                            <EdTypeLabel type={type} show_label={!name} />
                          </Item>
                          {name && (
                            <>
                              <div className="flex-1 flex items-center">
                                <Rename name={name} onRename={onRename} />
                              </div>
                            </>
                          )}

                          <div
                            className="flex items-center mr-1"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {type === "string" && (
                              <EdPickerString
                                value={value}
                                onChange={(v) => {
                                  markChanged(valuePath);
                                  setValue(valuePath, v);
                                }}
                              />
                            )}
                            {type === "number" && (
                              <EdPickerNumber
                                value={value}
                                onChange={(v) => {
                                  markChanged(valuePath);
                                  setValue(valuePath, v);
                                }}
                              />
                            )}
                            {type === "boolean" && (
                              <EdPickerBoolean
                                value={value}
                                onChange={(v) => {
                                  markChanged(valuePath);
                                  setValue(valuePath, v);
                                }}
                              />
                            )}
                          </div>
                          {path.length > 1 && (
                            <Tooltip
                              content="Delete Property"
                              onClick={(e) => {
                                e.stopPropagation();
                                setValue(valuePath, undefined);
                                onChange({
                                  path: path
                                    .slice(0, path.length - 1)
                                    .join("."),
                                  type: undefined,
                                });
                              }}
                              className="del flex items-center justify-center w-[25px] border-l cursor-pointer hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 size={14} />
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={cx("flex flex-col")}>
                      <EdPickerLines
                        children={children}
                        onChange={(path, type, valuePath) => {
                          onChange({
                            path: path.join("."),
                            type,
                            valuePath: valuePath
                              ? valuePath.join(".")
                              : undefined,
                          });
                        }}
                        path={path}
                        type={type}
                        value={value}
                        valuePath={valuePath}
                        markChanged={markChanged}
                        className={css`
                          padding-left: ${depth * DEPTH_PX}px;
                        `}
                      />
                    </div>
                  </div>
                )}
              </EdVarPicker>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </Resizable>
  );
};
