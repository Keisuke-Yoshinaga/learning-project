<script lang="ts" setup>
import InputTask from "@/features/Todo/components/InputTask.vue";
import ShowTaskList from "@/features/Todo/components/ShowTaskList.vue";
import ShowEditTaskDialog from "@/features/Todo/components/ShowEditTaskDialog.vue";
import ShowTaskListHeader from "@/features/Todo/components/ShowTaskListHeader.vue";


</script>


<template>
  <v-container class="h-100 bg-slate-100">
    <div class="h-100 flex flex-col items-center">
      <div class="w-full max-w-xl">
        <InputTask />
        <ShowTaskListHeader />
        <ShowTaskList />
        <ShowEditTaskDialog />
      </div>
    </div>
  </v-container>
</template>

<style>
@media screen and (max-width: 520px) {}
</style>
