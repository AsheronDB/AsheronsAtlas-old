<template>
  <div id="dungeon-map">
    <div id="wrap" class="flex flex-col">
      <header-menu />
      <dungeon-map />
    </div>
  </div>
</template>

<script setup>
import DungeonMap from "@/components/Atlas/Dungeon/Map.vue";
import HeaderMenu from "@/components/Atlas/Dereth/HeaderMenu.vue";
</script>
<style scoped>
#dungeon-map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #444;
  z-index: 60000;
}
#wrap {
  height: 100%;
}
</style>
