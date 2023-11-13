<script lang="ts" setup>
import ShowTaskListStats from '../components/ShowTaskListStats.vue'
import { useTaskListStore } from '../store/taskList'
import { Task } from '../types/Task';

const taskListStore = useTaskListStore();
const taskList: Task[] = taskListStore.getTaskList;

</script>

<template>
  <ShowTaskListStats />
  <v-list v-if="taskList.length" lines="one" class="">
    <v-list-item v-for="task in taskList" :key="task.id">
      <v-row align-content="center">
        <v-col cols="1">
          <v-checkbox-btn v-model="task.checked" color="success" @checked="taskListStore.checkTask(task.id)"></v-checkbox-btn>
        </v-col>
        <v-col cols="9" class="flex items-center">
          <!-- task.checkedがtrueの場合、'line-through'クラスを適用し、input要素を無効化します -->
          <input v-model="task.inputValue" :class="{ 'line-through': task.checked }" :disabled="task.checked" @input="taskListStore.editTask(task.id, task.inputValue)" />
        </v-col>
        <v-col cols="2">
          <v-btn color="error" @click="taskListStore.deleteTask(task.id)">削除</v-btn>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>
