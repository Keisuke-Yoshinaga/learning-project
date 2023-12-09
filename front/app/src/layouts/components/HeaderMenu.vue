<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title>
          <div @click="clearData" role="button">初期化</div>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>

const localStorageKeyList = [
  'markdown',
  'taskList',
];
const SessionStorageKeyList = [
  'filters',
  'editTaskDialog',
];

const clearData = () => {
  // LocalStorageデータを削除
  localStorageKeyList.forEach((key) => {
    localStorage.removeItem(key);
  });
  // SessionStorageデータを削除
  SessionStorageKeyList.forEach((key) => {
    sessionStorage.removeItem(key);
  });
  // ページをリロード
  location.reload();
}
</script>
