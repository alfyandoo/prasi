import { ReactElement } from "react";
import { allNodeDefinitions } from "./nodes";

export type PFNodeID = string;

export type PFNodeBranch = {
  code?: string;
  name?: string;
  flow: PFNodeID[];
  allow_async?: boolean;
  idx?: number;
  meta?: { condition_id: string };
};

export type PFNodePosition = { x: number; y: number };
export type PFNodeSize = { w?: number; h?: number };

export type PFNodeType = keyof typeof allNodeDefinitions;
export type DeepReadonly<T> = T extends Function
  ? T
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

export type PFNode = Record<string, any> & {
  id: string;
  name?: string;
  type: string;
  vars?: Record<string, any>;
  branches?: PFNodeBranch[];
  position?: PFNodePosition;
  size?: PFNodeSize;
  _codeBuild?: Record<string, string>;
  _codeError?: Record<string, string>;
};

export type RPFlow = DeepReadonly<PFlow>;

export type PFlow = {
  id: string;
  name: string;
  path?: string;
  nodes: Record<PFNodeID, PFNode>;
  flow: Record<string, PFNodeID[]>;
};

export type PFNodeRuntime<T extends Record<string, any>> = {
  current: DeepReadonly<PFNode> & T;
  prev?: DeepReadonly<PFNode>;
  first: DeepReadonly<PFNode>;
  visited: { node: DeepReadonly<PFNode>; branch?: PFNodeBranch }[];
};

export type PFRuntime = {
  nodes: DeepReadonly<PFNode>[];
};

export type PFNodeDefinition<F extends Record<string, PFField>> = {
  type: string;
  className?: string;
  vars?: Record<string, any>;
  is_async?: boolean;
  icon: string;
  on_before_connect?: (arg: {
    node: PFNode;
    is_new: boolean;
    pflow: PFlow;
  }) => void;
  has_branches: boolean;
  on_after_connect?: (arg: { from: PFNode; to: PFNode }) => void;
  on_before_disconnect?: (arg: {
    from: PFNode;
    to: PFNode;
    flow: PFNodeID[];
  }) => void;
  on_after_disconnect?: (arg: { from: PFNode; to: PFNode }) => void;
  on_init?: (arg: { node: PFNode; pflow: PFlow }) => void;
  on_fields_changed?: (arg: {
    pflow: PFlow;
    node: PFNode;
    path: string;
    action: string;
  }) => void;
  process: (arg: {
    vars: Record<string, any>;
    node: PFNodeRuntime<{ [K in keyof F]: F[K] }>;
    processBranch: (branch: DeepReadonly<PFNodeBranch>) => Promise<void>;
    next: () => void;
    console: typeof console;
  }) => void | Promise<void>;
  fields?: F;
};

export type PFField = (
  | {
      type: "string";
      placeholder?: (arg: {
        node: DeepReadonly<PFNode>;
        path: string;
      }) => string;
    }
  | {
      type: "array";
      fields: Record<string, PFField>;
      render?: (arg: { node: DeepReadonly<PFNode> }) => ReactElement;
    }
  | { type: "code" }
  | {
      type: "options" | "buttons";
      multiple?: boolean;
      options: () => Promise<
        (string | { value: string; label: string; el?: ReactElement })[]
      >;
    }
) & { idx?: number; label: string; optional?: boolean; className?: string };
