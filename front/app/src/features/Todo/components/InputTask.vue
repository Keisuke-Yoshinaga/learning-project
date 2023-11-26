<script lang="ts" setup>
import { useEditTaskDialogStore } from '../store/editTaskDialog';

const dialogStore = useEditTaskDialogStore();

</script>

<template>
  <v-row>
    <v-col>
      <v-btn color="primary" class="w-full rounded mt-2" @click="dialogStore.openNewDialog('')">
        Add New Task
      </v-btn>
    </v-col>
  </v-row>
</template>
