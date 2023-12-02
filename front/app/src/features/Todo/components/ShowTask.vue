<script lang="ts" setup>
import { useTaskListStore } from '../store/taskList'
import { useEditTaskDialogStore } from '../store/editTaskDialog';
import { getColor } from '../utils/Colors';
import { dateFormat, isPastDueDate } from '../utils/DateFormat';
import { computed } from 'vue';
import { Task } from '../types/Task';


const taskListStore = useTaskListStore();
const dialogStore = useEditTaskDialogStore();

const props = defineProps<{ taskId: string, subTask: boolean }>();
const task = computed<Task | undefined>(() => taskListStore.getTask(props.taskId));

</script>

<template>
  <v-list-item v-if="task" class="rounded-md border-l-8 bg-white shadow-md px-2" :style="{ borderColor: getColor(task.color) }" :class="{ 'mt-2': !subTask }">
    <v-list-item-title>
      <input v-model="task.title" class="w-full focus:outline-none" :class="{ 'text-decoration-line-through': task.checked }" :disabled="task.checked" readonly />
    </v-list-item-title>
    <v-list-item-subtitle>
      <span v-if="task.dueDate" class="text-xs" :class="{ 'text-red-500': isPastDueDate(task.dueDate) }">{{ dateFormat(task.dueDate) }}</span>
    </v-list-item-subtitle>

    <template v-slot:prepend>
      <v-checkbox-btn v-model="task.checked" color="success" @checked="taskListStore.checkTask(task.id)"></v-checkbox-btn>
    </template>

    <template v-slot:append>
      <v-btn color="secondary" density="compact" icon="mdi-plus" @click="dialogStore.openNewDialog(task.id)">
      </v-btn>
      <v-btn class="ml-4" color="primary" density="compact" icon="mdi-pencil" @click="dialogStore.openEditDialog(task.id)">
      </v-btn>
      <v-btn class="ml-4" color="error" @click="taskListStore.deleteTask(task.id)" density="compact" icon="mdi-delete">
      </v-btn>
    </template>
  </v-list-item>
</template>
