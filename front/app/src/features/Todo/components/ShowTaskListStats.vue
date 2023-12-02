<script lang="ts" setup>
import { useTaskListStore } from '@/features/Todo/store/taskList'
import { useFiltersStore } from '@/features/Todo/store/filters';
import { computed } from 'vue';
import { Task } from '@/features/Todo/types/Task';

const taskListStore = useTaskListStore();
const filtersStore = useFiltersStore();

const taskList = computed<Task[]>(() => taskListStore.getFilterTaskListForStats(filtersStore.getFilters));

</script>

<template>
  <v-row>
    <v-col xs="12" class="text-center">
      <span>全：</span>
      <span>{{ taskList.length }}</span>
    </v-col>
    <v-col xs="12" class="text-center">
      <span>完了：</span>
      <span>{{ taskList.filter((task) => task.checked === true).length }}</span>
    </v-col>
    <v-col xs="12" class="text-center">
      <span>残：</span>
      <span>{{ taskList.filter((task) => task.checked === false).length }}</span>
    </v-col>
  </v-row>
</template>
