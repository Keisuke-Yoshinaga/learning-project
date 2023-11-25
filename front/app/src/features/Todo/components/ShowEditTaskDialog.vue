<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue';
import { useTaskListStore } from '../store/taskList';
import { useEditTaskDialogStore } from '../store/editTaskDialog';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { dateFormat } from '../utils/DateFormat';
import { colors } from '../utils/Colors';

const taskListStore = useTaskListStore();
const dialogStore = useEditTaskDialogStore();

let task = taskListStore.getTask(dialogStore.getTaskId);

let title = ref(task?.title ?? '');
let memo = ref(task?.memo ?? '');
let dueDate = ref(task?.dueDate ?? null);
let color = ref(task?.color ?? "white");

watchEffect(() => {
  task = taskListStore.getTask(dialogStore.getTaskId);
  title.value = task?.title ?? '';
  memo.value = task?.memo ?? '';
  dueDate.value = task?.dueDate ?? null;
  color.value = task?.color ?? "white";
});

const errorMessage: Ref<string> = ref("");

// 必須入力チェック
const requiredValidation = (): boolean => {
  if (!title.value) {
    if (!title.value.trim()) {
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

const saveTask = () => {
  if (!requiredValidation()) {
    return;
  }
  taskListStore.editTask(dialogStore.getTaskId, title.value, memo.value, dueDate.value, color.value);
  dialogStore.setIsOpen(false);
};

</script>

<template>
  <v-dialog v-model="dialogStore.getIsOpen" persistent width="50%">
    <v-card>
      <v-toolbar color="white" flat>
        <v-toolbar-title class="grey--text text--darken-4">
          <div class="bold">タスクの修正</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon light @click="dialogStore.setIsOpen(false)">
          <v-icon color="grey darken-2">
            mdi-window-close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <!-- タスク名 -->
        <v-text-field v-model="title" class="mt-2" label="タスク" clearable variant="outlined" :error-messages="errorMessage"></v-text-field>
        <v-textarea v-model="memo" clearable clear-icon="mdi-close-circle-outline" label="メモ" variant="outlined"></v-textarea>
        <!-- 期日 -->
        <div class="my-2">期日</div>
        <VueDatePicker v-model="dueDate" :teleport="true" locale="ja" :format=dateFormat auto-apply />
        <!-- ラベルカラーの追加 -->
        <div class="mt-6 mb-2">ラベルカラー</div>
        <v-radio-group v-model="color" inline class="rounded">
          <v-radio v-for="item in colors" :key="item.name" :label="item.name" :value="item.name" :color="item.name !== 'white' ? item.color : '#000000'" :ripple="false">
          </v-radio>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- TODO 保存 -->
        <v-btn color="primary" @click="saveTask">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
