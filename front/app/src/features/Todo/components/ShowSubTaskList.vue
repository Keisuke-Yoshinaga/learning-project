<script lang="ts" setup>
import { useTaskListStore } from '../store/taskList'
import ShowSubTaskList from './ShowSubTaskList.vue';
import ShowTask from './ShowTask.vue';

const taskListStore = useTaskListStore();

const props = defineProps<{ taskId: string }>();
</script>

<template>
  <v-list v-if="taskListStore.getSubTaskList(props.taskId).length" lines="two" class="bg-inherit ml-6">
    <template v-for="subTask in taskListStore.getSubTaskList(props.taskId)" :key="subTask.id">
      <ShowTask :taskId="subTask.id" :subTask=true />
      <ShowSubTaskList :taskId="subTask.id" />
    </template>
  </v-list>
</template>
