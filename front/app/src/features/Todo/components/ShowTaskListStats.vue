<script lang="ts" setup>
import { useTaskListStore } from '../store/taskList'

const taskListStore = useTaskListStore();

const props = defineProps<{ filters: string[] }>();

</script>

<template>
  <v-row>
    <v-col xs="12" class="text-center">
      <span>全：</span>
      <span>{{ taskListStore.getTaskListLength(props.filters) }}</span>
    </v-col>
    <v-col xs="12" class="text-center">
      <span>完了：</span>
      <span>{{ taskListStore.getTaskListCheckedLength(props.filters) }}</span>
    </v-col>
    <v-col xs="12" class="text-center">
      <span>残：</span>
      <span>{{ taskListStore.getTaskListUncheckedLength(props.filters) }}</span>
    </v-col>
  </v-row>
</template>
