<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useTaskListStore } from '../store/taskList'


const inputTask: Ref<string> = ref("");
const errorMessage: Ref<string> = ref("");

const taskListStore = useTaskListStore();

const requiredValidation = (): boolean => {
  if (!inputTask.value) {
    if (!inputTask.value.trim()) {
      // 入力が空orスペースのみの場合はエラーメッセージを表示
      errorMessage.value = "入力してください。";
      return false;
    }
  } else {
    errorMessage.value = "";
    return true;
  }
  return true;
}

const addTask = (): void => {
  if (!requiredValidation()) {
    return;
  }

  taskListStore.addTask(inputTask.value);

  inputTask.value = "";
}
</script>

<template>
  <v-row>
    <v-col>
      <v-text-field v-model="inputTask" label="タスク" clearable variant="outlined" :error-messages="errorMessage" @input="requiredValidation"></v-text-field>
      <v-btn color="primary" class="w-full rounded mt-2" @click="addTask">
        Add Task
      </v-btn>
    </v-col>
  </v-row>
</template>
