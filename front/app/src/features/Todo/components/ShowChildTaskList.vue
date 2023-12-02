<script lang="ts" setup>
import { useTaskListStore } from '@/features/Todo/store/taskList'
import ShowChildTaskList from '@/features/Todo/components/ShowChildTaskList.vue';
import ShowTask from '@/features/Todo/components/ShowTask.vue';

const taskListStore = useTaskListStore();

const props = defineProps<{ taskId: string }>();
</script>

<template>
  <v-list v-if="taskListStore.getChildTaskList(props.taskId).length" lines="two" class="bg-inherit ml-6">
    <template v-for="childTask in taskListStore.getChildTaskList(props.taskId)" :key="childTask.id">
      <ShowTask :taskId="childTask.id" :childTask=true />
      <ShowChildTaskList :taskId="childTask.id" />
    </template>
  </v-list>
</template>
