<script lang="ts" setup>
import { useTaskListStore } from '../store/taskList'

const taskListStore = useTaskListStore();

</script>

<template>
  <v-row>
    <v-col xs="12" class="text-center">
      <span>全：</span>
      <span>{{ taskListStore.getTaskListLength }}</span>
    </v-col>
    <v-col xs="12" class="text-center">
      <span>完了：</span>
      <span>{{ taskListStore.getTaskListCheckedLength }}</span>
    </v-col>
    <v-col xs="12" class="text-center">
      <span>残：</span>
      <span>{{ taskListStore.getTaskListUncheckedLength }}</span>
    </v-col>
  </v-row>
</template>
