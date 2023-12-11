<script lang="ts" setup>
import { colors } from '@/features/Todo/utils/Colors';
import { computed, ref } from 'vue';
import { useFiltersStore } from '@/features/Todo/store/filters';
import ShowTaskListStats from '@/features/Todo/components/ShowTaskListStats.vue'

const filtersStore = useFiltersStore();

let filterDialog = ref(false);

const colorFilters = computed({
  get: () => filtersStore.getColors,
  set: (value: string[]) => filtersStore.setColors(value),
});

</script>

<template>
  <div class="mx-2 flex">
    <ShowTaskListStats />
    <!-- フィルターボタン -->
    <v-btn v-if="!colorFilters.length" class="ml-auto" density="compact" icon="mdi-filter-outline" variant="plain" @click="filterDialog = true"></v-btn>
    <v-btn v-else density="compact" icon="mdi-filter-check" variant="plain" @click="filterDialog = true"></v-btn>
    <v-dialog v-model="filterDialog" width="80%" max-width="700px">
      <v-card class="mx-auto">
        <v-toolbar>
          <v-toolbar-title>Filter</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="my-2">ラベルカラー</div>
          <v-chip-group v-model="colorFilters" column multiple>
            <v-chip v-for="color in colors" :key="color.name" variant="outlined" label filter>
              <v-icon start icon="mdi-circle" :color="color.color"></v-icon>
              {{ color.name }}
            </v-chip>
          </v-chip-group>
          <!-- フィルター条件の削除 -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- 保存 -->
            <v-btn color="secondary" @click="filtersStore.setClear">Clear</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
