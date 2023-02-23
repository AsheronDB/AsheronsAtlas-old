import { createRouter, createWebHashHistory } from 'vue-router'
import AtlasView from '@/views/Atlas/index.vue'
import DerethAtlas from '@/views/Atlas/Dereth/index.vue'
import DungeonMap from '@/views/Atlas/Dungeon/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Atlas',
      component: AtlasView,
      children: [
        {
            path: 'dungeon',
            name: 'DungeonMap',
            component: DungeonMap,
        }
      ]
    }
  ]
})

export default router
