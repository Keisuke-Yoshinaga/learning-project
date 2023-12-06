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
  <div class="flex grow">
    <div class="grow">
      <span>全：</span>
      <span>{{ taskList.length }}</span>
    </div>
    <div class="grow">
      <span>完了：</span>
      <span>{{ taskList.filter((task) => task.checked === true).length }}</span>
    </div>
    <div class="grow">
      <span>残：</span>
      <span>{{ taskList.filter((task) => task.checked === false).length }}</span>
    </div>
  </div>
</template>
