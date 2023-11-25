<script lang="ts" setup>
import { useTaskListStore } from '../store/taskList'
import { useEditTaskDialogStore } from '../store/editTaskDialog';
import ShowSubTaskList from './ShowSubTaskList.vue';
import { getColor } from '../utils/Colors';


const taskListStore = useTaskListStore();
const dialogStore = useEditTaskDialogStore();

const props = defineProps<{ taskId: string }>();
</script>

<template>
  <v-list v-if="taskListStore.getSubTaskList(props.taskId).length">
    <v-list-item v-for="subTask in taskListStore.getSubTaskList(props.taskId)" :key="subTask.id" class="rounded-md border-l-8 bg-white drop-shadow pl-2 pr-0" :style="{ borderColor: getColor(subTask.color) }">
      <v-row justify="space-between" class="">
        <v-col cols="1" class="items-center">
          <v-checkbox-btn v-model="subTask.checked" color="success" @checked="taskListStore.checkTask(subTask.id)"></v-checkbox-btn>
        </v-col>
        <v-col class="flex items-center">
          <input v-model="subTask.title" class="w-full focus:outline-none" :class="{ 'line-through': subTask.checked }" :disabled="subTask.checked" readonly />
        </v-col>
        <v-col cols="3" class="flex items-center d-flex justify-end">
          <v-btn color="primary" density="compact" icon="mdi-pencil" @click="dialogStore.openDialog(subTask.id)">
          </v-btn>
          <v-btn class="ml-4" color="error" @click="taskListStore.deleteTask(subTask.id)" density="compact" icon="mdi-delete">
          </v-btn>
        </v-col>
      </v-row>
      <ShowSubTaskList :taskId="subTask.id" />
    </v-list-item>
  </v-list>
</template>
