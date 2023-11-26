<script lang="ts" setup>
import InputTask from '../components/InputTask.vue'
import ShowTaskList from '../components/ShowTaskList.vue'

</script>


<template>
  <v-container class="h-100">
    <div class="h-100 flex flex-col items-center bg-slate-100">
      <h1 class="mt-4 text-4xl font-bold">Todoリスト</h1>
      <div class="mt-4 w-full max-w-xl">
        <InputTask />
        <ShowTaskList />
      </div>
    </div>
  </v-container>
</template>
