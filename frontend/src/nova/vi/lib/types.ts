import { EPage } from "logic/types";
import { FC, ReactElement } from "react";
import { IItem } from "utils/types/item";
import { ViRender } from "vi/vi-render";

export type ViPage = {
  id: string;
  root: EPage["content_tree"];
  url: string;
};

export type ViComps = Record<string, IItem>;

export type ViProp = {
  page: ViPage;
  layout?: ViPage;
  comps: ViComps;
  db: any;
  api: any;
  mode: "desktop" | "mobile";
  wrapper?: ViWrapperComp;
  loader: {
    pages: (ids: string[]) => Promise<void>;
    comps: (ids: string[]) => Promise<void>;
  };
  enablePreload?: boolean;
};

export type ViWrapperComp = FC<{
  item: IItem;
  is_layout: boolean;
  ViRender: typeof ViRender;
}>;