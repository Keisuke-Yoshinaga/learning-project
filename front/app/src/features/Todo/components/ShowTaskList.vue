<script lang="ts" setup>
import { useTaskListStore } from '../store/taskList'
import { useEditTaskDialogStore } from '../store/editTaskDialog';
import ShowSubTaskList from './ShowSubTaskList.vue';
import ShowEditTaskDialog from './ShowEditTaskDialog.vue';
import { colors, getColor } from '../utils/Colors';
import { dateFormat, isPastDueDate } from '../utils/DateFormat';
import { ref } from 'vue';
import ShowTaskListStats from '../components/ShowTaskListStats.vue'

const taskListStore = useTaskListStore();
const dialogStore = useEditTaskDialogStore();

let filterDialog = ref(false);
let filters = ref<string[]>([]);

</script>

<template>
  <!-- TODO フィルター機能 -->
  <v-row class="w-full mt-2" justify="end">
    <ShowTaskListStats :filters="filters" />
    <!-- フィルターボタン -->
    <v-btn v-if="!filters.length" density="compact" icon="mdi-filter-outline" variant="plain" @click="filterDialog = true"></v-btn>
    <v-btn v-else density="compact" icon="mdi-filter-check" variant="plain" @click="filterDialog = true"></v-btn>
    <v-dialog v-model="filterDialog" width="auto">
      <v-card class="mx-auto">
        <v-toolbar>
          <v-toolbar-title>Filter</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-chip-group v-model="filters" column multiple>
            <v-chip v-for="color in colors" :key="color.name" variant="outlined" label filter>
              <v-icon start icon="mdi-circle" :color="color.color"></v-icon>
              {{ color.name }}
            </v-chip>
          </v-chip-group>
          <!-- フィルター条件の削除 -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- 保存 -->
            <v-btn color="secondary" @click="filters = []">Clear</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
  <v-list v-if="taskListStore.getFilterTaskList(filters).length" lines="two" class="bg-inherit">
    <template v-for="task in taskListStore.getFilterTaskList(filters)" :key="task.id">
      <v-list-item class="rounded-md border-l-8 bg-white shadow-md px-2 mt-2" :style="{ borderColor: getColor(task.color) }">
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
      <ShowSubTaskList v-if="!filters.length" :taskId="task.id" />
    </template>
  </v-list>
  <ShowEditTaskDialog />
</template>
