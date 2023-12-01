<script lang="ts" setup>
import { useTaskListStore } from '../store/taskList'
import { useFiltersStore } from '../store/filters';
import ShowTask from '../components/ShowTask.vue'
import ShowSubTaskList from '../components/ShowSubTaskList.vue'

const taskListStore = useTaskListStore();
const filtersStore = useFiltersStore();

</script>

<template>
  <v-list v-if="taskListStore.getFilterTaskIdListForView(filtersStore.getFilters).length" lines="two" class="bg-inherit" :class="[]">
    <template v-for="id in taskListStore.getFilterTaskIdListForView(filtersStore.getFilters)" :key="id">
      <ShowTask :taskId="id" :subTask=false />
      <ShowSubTaskList v-if="filtersStore.isNull" :taskId="id" />
    </template>
  </v-list>
</template>
