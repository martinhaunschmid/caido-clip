import { Caido } from "@caido/sdk-frontend";
import { API } from "backend";

export type FrontendSDK = Caido<API, {}>;

export type CaidoClipboard = {
  name: string,
  id: number,
  value: string
}

export type PluginStorage = {
    clipboards: CaidoClipboard[]
}