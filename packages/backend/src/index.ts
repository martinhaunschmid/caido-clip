import type { DefineAPI, SDK } from "caido:plugin";

type CaidoClipboard = {
  name: string,
  id: number,
  value: string
}

let clipboards : CaidoClipboard[] = [];
let clipboardCount = 10;

const initClipboards = () => {
  for(let i = 0; i < clipboardCount; i++) {
    let c : CaidoClipboard = {
      id: i,
      value: '',
      name: ''
    }
    clipboards.push(c);
  }
}

initClipboards()

const saveToClipboard = (sdk: SDK, id: number, value: string) => {
  if(clipboards[id]) {
    clipboards[id].value = value;
  }else{
    console.log(`Error Setting value for clipboard ${id}`)
  }
}

const getAllClipboards = (sdk: SDK) : CaidoClipboard[] =>  {
  return clipboards
}

const saveClipboard = (sdk: SDK, clipboard : CaidoClipboard) => {
  console.log("Backend: Updating Clipboard")
  let toUpdate = clipboards[clipboard.id]
  if(toUpdate) {
    toUpdate.name = clipboard.name
    toUpdate.value = clipboard.value
  }else{
    console.log(`ERROR: Something went wrong saving a clipboard`);
    return "ERROR";
  }
}

const getValueFromClipboard = (sdk: SDK, id: number): string => {
  return clipboards[id]?.value || ""
}

export type API = DefineAPI<{
  saveToClipboard: typeof saveToClipboard;
  getAllClipboards: typeof getAllClipboards;
  getValueFromClipboard: typeof getValueFromClipboard;
  saveClipboard: typeof saveClipboard;
}>;

export function init(sdk: SDK<API>) {
  sdk.api.register("saveToClipboard", saveToClipboard);
  sdk.api.register("getAllClipboards", getAllClipboards);
  sdk.api.register("getValueFromClipboard", getValueFromClipboard);
  sdk.api.register("saveClipboard", saveClipboard);
}