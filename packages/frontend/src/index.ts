import { Classic } from "@caido/primevue";
import PrimeVue from "primevue/config";
import { createApp } from "vue";

import App from "./views/App.vue";

import "./styles/index.css";

import { SDKPlugin } from "./plugins/sdk";
import type { FrontendSDK, CaidoClipboard, PluginStorage } from "./types";

export const refreshClipboards = (sdk:FrontendSDK) => {
  sdk.backend.getAllClipboards().then((boards) => {
    sdk.storage.set({clipboards: boards})
  })
}

export const initCaidoClipCommands = (sdk: FrontendSDK, storage: PluginStorage | undefined) => {
  (storage as PluginStorage | undefined)?.clipboards?.forEach((clip : CaidoClipboard) => {
      let i = clip.id
      let clipIdentifier = clip.name || clip.value
      // Register the paste command
      // and its command pallete as well as a hotkey
      sdk.commands.register(`caido-clip-${i}-i`, {
        name: `Insert caido-clip ${i}: ${clipIdentifier}`,
        run: () => { 
          sdk.backend.getValueFromClipboard(i).then((value) => {
            sdk.window.getActiveEditor()?.replaceSelectedText(value);
          });
        },
        group: "caido-clip",
      });
      sdk.commandPalette.register(`caido-clip-${i}-i`);
      sdk.shortcuts.register(`caido-clip-${i}-i`, ['cmd',`${i}`]);

      // register update command
      sdk.commands.register(`caido-clip-${i}-u`, {
        name: `Update caido-clip ${i}`,
        run: () => { 
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const selectedText = selection.toString();
            sdk.backend.saveToClipboard(i, selectedText).then(() => {
              // TODO optimize to not reinit all commands all the time
              refreshClipboards(sdk)
              initCaidoClipCommands(sdk, storage)
            })
          }
        },
        group: "caido-clip",
      });
      sdk.commandPalette.register(`caido-clip-${i}-u`);
      sdk.shortcuts.register(`caido-clip-${i}-u`, ['cmd','alt',`${i}`]);
    })
}

// This is the entry point for the frontend plugin
export const init = (sdk: FrontendSDK) => {
  const app = createApp(App);

  // Load the PrimeVue component library
  app.use(PrimeVue, {
    unstyled: true,
    pt: Classic,
  });

  // Provide the FrontendSDK
  app.use(SDKPlugin, sdk);

  // Create the root element for the app
  const root = document.createElement("div");
  Object.assign(root.style, {
    height: "100%",
    width: "100%",
  });

  // Set the ID of the root element
  // Replace this with the value of the prefixWrap plugin in caido.config.ts 
  // This is necessary to prevent styling conflicts between plugins
  root.id = `caido-clip--frontend-vue`;

  // Mount the app to the root element
  app.mount(root);

  // Add the page to the navigation
  // Make sure to use a unique name for the page
  sdk.navigation.addPage("/caido-clip", {
    body: root,
  });

  // Add a sidebar item
  sdk.sidebar.registerItem("caido-clip", "/caido-clip");
  
  sdk.storage.onChange((storage) => {
    console.log("Storage Changed!")
    initCaidoClipCommands(sdk, storage)
  })
  
  refreshClipboards(sdk)
};
