<script lang="ts" setup>
import { useTaskListStore } from '@/features/Todo/store/taskList';
import { useEditTaskDialogStore } from '@/features/Todo/store/editTaskDialog';
import { getColor } from '@/features/Todo/utils/Colors'
import { dateFormat, isPastDueDate } from '@/features/Todo/utils/DateFormat';
import { computed, ref } from 'vue';
import { Task } from '@/features/Todo/types/Task';


const taskListStore = useTaskListStore();
const dialogStore = useEditTaskDialogStore();

const props = defineProps<{ taskId: string, childTask: boolean }>();
const task = computed<Task | undefined>(() => taskListStore.getTask(props.taskId));

let deleteDialog = ref(false);
let deleteId = ref('');

// 削除ダイアログを表示
const showDeleteDialog = (id: string) => {
  deleteDialog.value = true;
  deleteId.value = id;
}
// 削除ダイアログを閉じる
const canselDeleteDialog = () => {
  deleteDialog.value = false;
  deleteId.value = '';
}
// 削除処理
const deleteTask = (id: string) => {
  taskListStore.deleteTask(id);
  deleteDialog.value = false;
  deleteId.value = '';
}
</script>

<template>
  <v-list-item v-if="task" class="rounded-md border-l-8 bg-white shadow-md px-2" :style="{ borderColor: getColor(task.color) }" :class="{ 'mt-2': !childTask }">
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
      <v-btn class="ml-4" color="error" @click="showDeleteDialog(task.id)" density="compact" icon="mdi-delete">
      </v-btn>
    </template>
  </v-list-item>
  <!-- 削除確認ダイアログを追加 -->
  <v-dialog v-model="deleteDialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">削除確認</v-card-title>
      <v-card-text>{{ taskListStore.getTask(deleteId)?.title }}を削除してもよろしいですか？</v-card-text>
      <v-card-text class="!text-xs text-red">注：子タスクがある場合、同時に削除されます。</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" @click="canselDeleteDialog()">キャンセル</v-btn>
        <v-btn color="green darken-1" @click="deleteTask(deleteId)">削除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
