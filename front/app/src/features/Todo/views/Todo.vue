<script lang="ts" setup>
import InputTask from '../components/InputTask.vue'
import ShowTaskList from '../components/ShowTaskList.vue'

</script>


<template>
  <v-container class="h-100">
    <div class="h-100 flex flex-col items-center bg-slate-100">
      <h1 class="mt-4 text-4xl font-bold">Todoリスト</h1>
      <div class="mt-5 w-full max-w-xl">
        <div class="w-full rounded-lg bg-white px-4 py-3 shadow-md">
          <InputTask />
        </div>
        <div class="mt-4 w-full">
          <ShowTaskList />
        </div>
      </div>
    </div>
  </v-container>
</template>
