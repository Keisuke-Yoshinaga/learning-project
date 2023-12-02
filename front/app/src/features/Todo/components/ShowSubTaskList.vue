<script lang="ts" setup>
import { useTaskListStore } from '@/features/Todo/store/taskList'
import ShowSubTaskList from '@/features/Todo/components/ShowSubTaskList.vue';
import ShowTask from '@/features/Todo/components/ShowTask.vue';

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
