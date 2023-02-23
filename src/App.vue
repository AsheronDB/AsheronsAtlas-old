<template>
  <header>
    <title-bar v-if="atlasStore.platform" />
  </header>
  <main>



         <router-view  v-if="atlasStore.serverPort"></router-view>

   
  <!-- 
    <div id="overlays">
    <go-to-coords-modal />
    </div> -->
  </main>
</template>

<script setup lang="ts">
import TitleBar from "@/components/TitleBar.vue";
import GoToCoordsModal from "@/components/Modals/GoToCoords.vue";

import { useAtlasStore } from '@/store/atlas';
const atlasStore = useAtlasStore();

import { onMounted } from "vue";
// import {
//   initAccordions,
//   initCarousels,
//   initCollapses,
//   initDials,
//   initDismisses,
//   initDrawers,
//   initDropdowns,
//   initModals,
//   initPopovers,
//   initTabs,
//   initTooltips,
// } from "flowbite";

// onMounted(() => {
//   initAccordions();
//   initCarousels();
//   initCollapses();
//   initDials();
//   initDismisses();
//   initDrawers();
//   initDropdowns();
//   initModals();
//   initPopovers();
//   initTabs();
//   initTooltips();
// });


onMounted(() => {


    window.ipcRenderer.send('app-mounted');

    window.ipcRenderer.receive('maximized', (event, message) => {
      
            atlasStore.options.window.maximized = event;
        });

     window.ipcRenderer.receive('send-platform', (event, message) => {
            console.log('listen for p[');
            atlasStore.platform = event;
        });

         window.ipcRenderer.receive('server-ready', (event, message) => {
            console.log('listen for server port from main');
            // this.setIsServerReady(true);
            // this.setServerPort(message);
            console.log(event);
            console.log(message)

            atlasStore.serverPort = event;

        });


});
</script>

<style>
@import url("leaflet/dist/leaflet.css");

:root {
  color-scheme: light dark;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 0;
}

main {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  min-height: 0;
}
#overlays {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: transparent;
  display: none;
}

body {
  font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

    overflow: hidden;
}







.leaflet-tooltip.landblock-tooltip {
    /* border: 2px solid var(--tw-slate-100); */
    border-color:var(--tw-color-slate-200);
    font-size: 13px;
    font-weight: bold;
    background: var(--tw-color-slate-200);
    color: var(--tw-color-slate-600);
    padding: 6px 8px;
    opacity: 1;
    /* letter-spacing: 0.03rem; */
    font-family: ui-monospace, 
             Menlo, Monaco, 
             "Cascadia Mono", "Segoe UI Mono", 
             "Roboto Mono", 
             "Oxygen Mono", 
             "Ubuntu Monospace", 
             "Source Code Pro",
             "Fira Mono", 
             "Droid Sans Mono", 
             "Courier New", monospace;
}

.leaflet-tooltip.landblock-tooltip:before {
  border-right-color:var(--tw-color-slate-200);
}



.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
