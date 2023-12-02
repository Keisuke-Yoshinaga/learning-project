<script lang="ts" setup>
import { useTaskListStore } from '@/features/Todo/store/taskList'
import { useFiltersStore } from '@/features/Todo/store/filters';
import ShowTask from '@/features/Todo/components/ShowTask.vue'
import ShowChildTaskList from '@/features/Todo/components/ShowChildTaskList.vue'

const taskListStore = useTaskListStore();
const filtersStore = useFiltersStore();

</script>

<template>
  <v-list v-if="taskListStore.getFilterTaskIdListForView(filtersStore.getFilters).length" lines="two" class="bg-inherit" :class="[]">
    <template v-for="id in taskListStore.getFilterTaskIdListForView(filtersStore.getFilters)" :key="id">
      <ShowTask :taskId="id" :childTask=false />
      <ShowChildTaskList v-if="filtersStore.isNull" :taskId="id" />
    </template>
  </v-list>
</template>
