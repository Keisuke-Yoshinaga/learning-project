<script lang="ts" setup>
import { ref } from 'vue';
import { useDialogStore } from '../store/dialog';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// 日付フォーマット
const dateFormat = (date: Date) => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const hour: string = date.getHours().toString().padStart(2, "0");
  const minute: string = date.getMinutes().toString().padStart(2, "0");
  const dayOfWeek: number = date.getDay();
  const dayOfWeekStr: string = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
  return `${year}/${month}/${day} (${dayOfWeekStr}) ${hour}:${minute}`;
};

// 初期期日を明日に設定
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);
const date = ref(tomorrow);

const dialogStore = useDialogStore();

</script>

<template>
  <v-dialog v-model="dialogStore.getDialog" width="50%">
    <v-card>
      <v-toolbar color="white" flat>
        <v-toolbar-title class="grey--text text--darken-4">
          <div class="bold">タスクの修正</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon light @click="dialogStore.setDialog(false)">
          <v-icon color="grey darken-2">
            mdi-window-close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field class="mt-2" label="タスク" clearable variant="outlined"></v-text-field>
        <v-textarea clearable clear-icon="mdi-close-circle-outline" label="メモ" variant="outlined"></v-textarea>
        <!-- 期日 -->
        <div class="my-2">期日</div>
        <VueDatePicker v-model="date" :teleport="true" locale="ja" :format=dateFormat auto-apply />
        <!-- ラベルカラーの追加 -->
        <div class="mt-4 mb-2">ラベルカラー</div>
        <!-- TODO 色を選択できるように -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- TODO 保存 -->
        <v-btn color="primary" @click="dialogStore.setDialog(false)">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
