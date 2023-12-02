<script lang="ts" setup>
import InputTask from "@/features/Todo/components/InputTask.vue";
import ShowTaskList from "@/features/Todo/components/ShowTaskList.vue";
import ShowEditTaskDialog from "@/features/Todo/components/ShowEditTaskDialog.vue";
import ShowTaskListHeader from "@/features/Todo/components/ShowTaskListHeader.vue";


</script>


<template>
  <v-container class="h-100">
    <div class="h-100 flex flex-col items-center bg-slate-100">
      <h1 class="mt-4 text-4xl font-bold">Todoリスト</h1>
      <div class="mt-4 w-full max-w-xl">
        <InputTask />
        <ShowTaskListHeader />
        <ShowTaskList />
        <ShowEditTaskDialog />
      </div>
    </div>
  </v-container>
</template>
