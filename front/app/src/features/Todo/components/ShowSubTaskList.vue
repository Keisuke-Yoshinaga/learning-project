<script lang="ts" setup>
import { useTaskListStore } from '../store/taskList'
import { useEditTaskDialogStore } from '../store/editTaskDialog';
import ShowSubTaskList from './ShowSubTaskList.vue';
import { getColor } from '../utils/Colors';
import { dateFormat, isPastDueDate } from '../utils/DateFormat';


const taskListStore = useTaskListStore();
const dialogStore = useEditTaskDialogStore();

const props = defineProps<{ taskId: string }>();
</script>

<template>
  <v-list v-if="taskListStore.getSubTaskList(props.taskId).length" lines="two" class="bg-inherit ml-6">
    <template v-for="subTask in taskListStore.getSubTaskList(props.taskId)" :key="subTask.id">
      <v-list-item class="rounded-md border-l-8 bg-white shadow-md px-2" :style="{ borderColor: getColor(subTask.color) }">
        <v-list-item-title>
          <input v-model="subTask.title" class="w-full focus:outline-none" :class="{ 'text-decoration-line-through': subTask.checked }" :disabled="subTask.checked" readonly />
        </v-list-item-title>
        <v-list-item-subtitle>
          <span v-if="subTask.dueDate" class="text-xs" :class="{ 'text-red-500': isPastDueDate(subTask.dueDate) }">{{ dateFormat(subTask.dueDate) }}</span>
        </v-list-item-subtitle>

        <template v-slot:prepend>
          <v-checkbox-btn v-model="subTask.checked" color="success" @checked="taskListStore.checkTask(subTask.id)"></v-checkbox-btn>
        </template>

        <template v-slot:append>
          <v-btn color="secondary" density="compact" icon="mdi-plus" @click="dialogStore.openNewDialog(subTask.id)">
          </v-btn>
          <v-btn class="ml-4" color="primary" density="compact" icon="mdi-pencil" @click="dialogStore.openEditDialog(subTask.id)">
          </v-btn>
          <v-btn class="ml-4" color="error" @click="taskListStore.deleteTask(subTask.id)" density="compact" icon="mdi-delete">
          </v-btn>
        </template>
      </v-list-item>
      <ShowSubTaskList :taskId="subTask.id" />
    </template>
  </v-list>
</template>
