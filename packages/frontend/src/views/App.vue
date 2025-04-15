<script setup lang="ts">
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import TextArea from "primevue/textarea";

import { useSDK } from "@/plugins/sdk";
import { CaidoClipboard } from "../types";
import { ref, onMounted } from "vue";
import { initCaidoClipCommands, refreshClipboards } from "../index"

// Retrieve the SDK instance to interact with the backend
const sdk = useSDK();

let clipboards = ref<CaidoClipboard[]>([])

sdk.storage.onChange((storage) => {
  clipboards.value = (storage as PluginStorage | undefined)?.clipboards || []
});

const onValueChange  = (clip : CaidoClipboard) => {
  sdk.backend.saveClipboard(clip);
  refreshClipboards(sdk)
}
</script>

<template>
  <Card class="gap-4 mb-4">
    <template #title>Caido Clipboards</template>
    <template #content>
      <p>Here, you can see the values present in each of the clipboards and name them. The names are then visible in the Command Palette.</p>
    </template>
  </Card>
  <div class="flex flex-wrap" id="caido-clip-wrap">
    <div
      v-for="clip in clipboards"
      :key="clip.id"
      class="w-1/2 gap-4"
    >
    <Card class="flex items-start mx-2 mb-4">
      <template #title>Clipboard {{ clip.id }}: {{ clip.name || "not named" }}</template>
      <template #content>
          <InputText placeholder="Clipboard name" v-model="clip.name" type="text" @change="onValueChange(clip)" class="w-full mb-4"/>
          <TextArea
            v-model="clip.value"
            placeholder="Enter value..."
            @change="onValueChange(clip)"
            class="w-full"
          ></TextArea>
      </template>
    </Card>
  </div>
</div>
</template>
      