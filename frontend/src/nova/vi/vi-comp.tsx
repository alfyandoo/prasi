import { DeepReadonly } from "popup/flow/runtime/types";
import { FC } from "react";
import { IItem } from "utils/types/item";
import { LoadingSpinner } from "utils/ui/loading";
import { compArgs } from "./lib/comp-args";
import { DIV_PROPS } from "./lib/gen-parts";
import { parentCompArgs } from "./lib/parent-comp-args";
import { useVi } from "./lib/store";
import { DIV_PROPS_OPT, ViMergedProps } from "./lib/types";
import { ViItem } from "./vi-item";

export const ViComp: FC<{
  item: DeepReadonly<IItem>;
  is_layout: boolean;
  div_props?: (opt: DIV_PROPS_OPT) => DIV_PROPS;
  merged?: ViMergedProps;
  standalone?: string;
}> = ({ item, is_layout, div_props, merged, standalone }) => {
  const {
    comps,
    instances,
    instantiate,
    ref_comp_props,
    parents,
    db,
    api,
    instanced,
    edit_comp_id,
    vscode_exports,
  } = useVi(
    ({ state, ref, action }) => ({
      comps: ref.comps,
      load: ref.loader.comps,
      instances: ref.comp.instances,
      loaded: ref.comp.loaded,
      instantiate: action.instantiateComp,
      ref_comp_props: ref.comp_props,
      parents: ref.item_parents,
      db: ref.db,
      api: ref.api,
      instanced: ref.instanced,
      edit_comp_id: ref.edit_comp_id,
      vscode_exports: ref.vscode_exports,
    }),
    standalone
  );

  const comp_id = item.component!.id;
  const loading_component = <LoadingSpinner />;

  if (!comps[comp_id]) {
    return loading_component;
  } else {
    if (
      !instances[item.id] ||
      instanced[item.id] !== item ||
      edit_comp_id === comp_id
    ) {
      instanced[item.id] = item;
      ref_comp_props[item.id] = compArgs(
        item,
        comps,
        { ...merged },
        db,
        api,
        vscode_exports,
        standalone
      );

      instantiate(item);
    }
  }
  const instance = instances[item.id];

  if (!instance) return loading_component;

  let instance_id: string | undefined = item.id;
  if (edit_comp_id === comp_id) {
    instance_id = undefined;
  }

  return (
    <ViItem
      item={instance as any}
      is_layout={is_layout}
      div_props={div_props}
      instance_id={instance_id}
      merged={merged}
      standalone={standalone}
    />
  );
};
