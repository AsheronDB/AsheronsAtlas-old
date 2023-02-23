<template>
  <div id="atlas">
    <div
      id="sidebar-pane"
      class="bg-slate-200 dark:bg-slate-600 flex flex-col"
      v-if="atlasStore.sidebarVisible"
    >
      <!-- <div id="title-bar"></div> -->
      <div class="p-4 flex flex-col overflow-hidden flex-auto">
        <atlas-search class="flex-initial" />

        <div class="relative flex flex-col overflow-hidden flex-auto">
          <atlas-search-results v-if="atlasStore.searchResults.length > 0" />
          <atlas-infobox v-if="atlasStore.selectedLocation" />
        </div>

        <!-- <div>
          <span
            @click="fetchSpawnMap"
            class="border border-slate-700 px-3 py-2 bg-slate-500 text-slate-50 rounded-lg inline"
            >Spawn Map</span
          >
        </div> -->

        <!-- <div class="mt-3">
          <router-link
            to="/dungeon"
            class="border border-slate-700 px-3 py-2 bg-slate-500 text-slate-50 rounded-lg inline"
            >Dungeon Map</router-link
          >
        </div> -->
      </div>

      <!-- <div id="update" class="p-3 bg-slate-300"><data-menu /></div> -->
    </div>

    <div id="map-pane" class="border-l border-slate-300 dark:border-slate-700">
      <div class="flex flex-col flex-auto relative">
        <header-menu />
        <div id="map">
          <dereth-map />

          <div
            id="detail-panel"
            class="bg-slate-300 drop-shadow-lg rounded-md border p-3 border-slate-400 text-sm"
            v-if="atlasStore.targetedPosition"
          >
            <p>{{ atlasStore.targetedPosition.coordinates }}</p>
            <p>{{ atlasStore.targetedReverseGeocode }}</p>
            <p v-if="atlasStore.options.landblockGrid">
              {{ atlasStore.targetedPosition.objCellIdHex }}
            </p>
          </div>

          <div
            class="landblock-mode text-xs bg-slate-700 text-slate-300 rounded-lg font-bold px-3 py-2 border border-slate-900 drop-shadow-lg"
            v-if="atlasStore.options.landblockGrid"
          >
            Landblock Mode
          </div>

          <transition name="fade">
            <div
              id="map-loading"
              v-if="!atlasStore.derethMapLoaded"
              class="absolute top-0 right-0 bottom-0 left-0 bg-slate-600 text-white z-50000"
            >
              Map loading...
            </div>
          </transition>
        </div>
      </div>

      <!-- <Transition>
    <router-view />
</Transition> -->

      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DerethMap from "@/components/Atlas/Dereth/Map.vue";
import AtlasSearch from "@/components/Atlas/Dereth/Search/index.vue";
import AtlasInfobox from "@/components/Atlas/Dereth/Infobox.vue";
import HeaderMenu from "@/components/Atlas/Dereth/HeaderMenu.vue";
// import Sidebar from '@/components/Atlas/Sidebar.vue';
import DataMenu from "@/components/Atlas/DataMenu.vue";
import AtlasSearchResults from "@/components/Atlas/Dereth/Search/Results.vue";

import {
  faSquareCaretLeft,
  faSquareCaretRight,
} from "@fortawesome/free-regular-svg-icons";

import {
  faLayerGroup,
  faBorderAll,
  faShareFromSquare,
  faMagnifyingGlass,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";

const icons = ref({
  faLayerGroup,
  faBorderAll,
  faShareFromSquare,
  faMagnifyingGlass,
  faSquareCaretLeft,
  faSquareCaretRight,
  faCrosshairs,
});

import { useAtlasStore } from "@/store/atlas";
const atlasStore = useAtlasStore();

const toggleLandblockGrid = () => {
  console.log("toggleLandblockGrid");
  atlasStore.options.landblockGrid = !atlasStore.options.landblockGrid;
  console.log(atlasStore.options.landblockGrid);
};

const fetchSpawnMap = async () => {
  try {
    const spawnData = await fetch(
      `http://localhost:${atlasStore.dbPort}/locations?wcid=7`
    );
    const spawnDataJson = await spawnData.json();

    console.log(spawnDataJson);

    if (spawnDataJson) {
      atlasStore.spawnData = spawnDataJson;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
#atlas {
  height: 100%;
  display: flex;
  flex-direction: row;
  min-height: 0;
  flex: 1 1 auto;
}

#map {
  position: relative;
}

#sidebar-pane {
  flex: 0 0 300px;

  z-index: 200;
}

#title-bar {
  height: 44px;
}

#map-pane {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

#map-pane #map {
  flex: 1 1 auto;
}

#detail-panel {
  width: 375px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  height: 90px;
  transform: translate(-50%, 0%);
  z-index: 5000;
}

.landblock-mode {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 40000;
}
</style>
