<script lang="ts" setup>
import { useTaskListStore } from '../store/taskList'
import { useDialogStore } from '../store/dialog';
import ShowSubTaskList from './ShowSubTaskList.vue';
import ShowEditTaskDialog from './ShowEditTaskDialog.vue';

const taskListStore = useTaskListStore();
const dialogStore = useDialogStore();

</script>

<template>
  <!-- TODO フィルター機能 -->
  <v-list v-if="taskListStore.getMainTaskList.length" lines="one" class="space-y-3 bg-inherit">
    <v-list-item v-for="task in  taskListStore.getMainTaskList " :key="task.id" class="rounded-md border-l-8 bg-white shadow-md px-2" :style="{ borderColor: task.color }">
      <v-row justify="space-between" class="">
        <v-col cols="1" class="items-center">
          <v-checkbox-btn v-model="task.checked" color="success" @checked="taskListStore.checkTask(task.id)"></v-checkbox-btn>
        </v-col>
        <v-col class="flex items-center">
          <input v-model="task.title" class="w-full focus:outline-none" :class="{ 'line-through': task.checked }" :disabled="task.checked" @input="taskListStore.editTask(task.id, task.title)" />
        </v-col>
        <!-- TODO 期日の表示 -->
        <v-col cols="3" class="flex items-center d-flex justify-end">
          <v-btn color="primary" density="compact" icon="mdi-pencil" @click="dialogStore.openDialog(task.id)">
          </v-btn>
          <v-btn class="ml-4" color="error" @click="taskListStore.deleteTask(task.id)" density="compact" icon="mdi-delete">
          </v-btn>
        </v-col>
      </v-row>
      <ShowSubTaskList :taskId="task.id" />
    </v-list-item>
  </v-list>
  <ShowEditTaskDialog />
</template>
