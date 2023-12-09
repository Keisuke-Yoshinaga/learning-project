<template>
  <v-container>
    <MdPreview :modelValue="markdown" language="jp_JP" />
  </v-container>
</template>

<script lang="ts" setup>
import { config, MdPreview } from 'md-editor-v3';
import { ref } from 'vue';
import 'md-editor-v3/lib/style.css';
import 'md-editor-v3/lib/preview.css';
import JP_JP from '@vavt/cm-extension/dist/locale/jp-JP';
import { useMarkdownStore } from '@/stores/markdown'
import 'vue-toast-notification/dist/theme-sugar.css';

const markdownStore = useMarkdownStore();

config({
  editorConfig: {
    languageUserDefined: {
      'jp_JP': JP_JP
    }
  },
})

const markdown = ref(markdownStore.getMarkdown);

</script>

<style>
@media screen and (max-width: 520px) {
  #md-editor-v3-preview {
    font-size: 12px !important;
  }
}
</style>
