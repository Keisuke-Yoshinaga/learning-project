<script lang="ts" setup>
import { useEditTaskDialogStore } from "@/features/Todo/store/editTaskDialog";

const dialogStore = useEditTaskDialogStore();
</script>

<template>
  <v-row>
    <v-col>
      <v-btn color="primary" class="w-full rounded my-2" @click="dialogStore.openNewDialog('')">
        新規タスク追加
      </v-btn>
    </v-col>
  </v-row>
</template>
