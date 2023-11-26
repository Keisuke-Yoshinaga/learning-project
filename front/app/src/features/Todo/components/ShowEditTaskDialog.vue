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
let parentTaskId = ref(task?.parentTaskId ?? '');

// タスクの変更を監視
watchEffect(() => {
  task = taskListStore.getTask(dialogStore.getTaskId);
  title.value = task?.title ?? '';
  memo.value = task?.memo ?? '';
  dueDate.value = task?.dueDate ?? null;
  color.value = task?.color ?? "white";
  parentTaskId.value = task?.parentTaskId ?? '';
});

// 親タスクの変更を監視
watchEffect(() => {
  parentTaskId.value = dialogStore.getParentTaskId ?? '';
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
  if (dialogStore.getTaskId == '') {
    // 新規タスクの場合
    taskListStore.addDetailTask(title.value, memo.value, dueDate.value, color.value, parentTaskId.value);
  } else {
    // 既存タスクの場合
    taskListStore.editTask(dialogStore.getTaskId, title.value, memo.value, dueDate.value, color.value);
  }

  dialogStore.closeDialog();
};

</script>

<template>
  <v-dialog v-model="dialogStore.getIsOpen" persistent no-click-animation width="50%">
    <v-card>
      <v-toolbar color="white" flat>
        <v-toolbar-title class="grey--text text--darken-4">
          <div v-if="dialogStore.getTaskId == ''" class="bold ms-6">タスクの追加</div>
          <div v-else class="bold ms-6">タスクの修正</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon light @click="dialogStore.closeDialog()">
          <v-icon color="grey darken-2">
            mdi-window-close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-subtitle v-if="parentTaskId != ''" class="text-right px-8">親タスク：{{ taskListStore.getTask(parentTaskId)?.title }}</v-card-subtitle>
      <v-card-text>
        <!-- タスク名 -->
        <v-text-field v-model="title" label="タスク" clearable variant="outlined" :error-messages="errorMessage"></v-text-field>
        <v-textarea v-model="memo" clearable clear-icon="mdi-close-circle-outline" label="メモ" variant="outlined"></v-textarea>
        <!-- 期日 -->
        <!-- todo default時間 -->
        <div class="my-2">期日</div>
        <VueDatePicker v-model="dueDate" :teleport="true" locale="ja" :format=dateFormat time-picker-inline />
        <!-- ラベルカラーの追加 -->
        <div class="mt-6 mb-2">ラベルカラー</div>
        <v-chip-group v-model="color" column>
          <v-chip v-for="color in colors" :key="color.name" :value="color.name" variant="outlined" label filter>
            <v-icon start icon="mdi-circle" :color="color.color"></v-icon>
            {{ color.name }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- 保存 -->
        <v-btn color="primary" @click="saveTask">SAVE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.dp__action_select {
  background: var(--dp-primary-color) !important;
  color: var(--dp-primary-text-color) !important;
}
</style>
