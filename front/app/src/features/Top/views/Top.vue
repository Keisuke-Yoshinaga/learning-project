<template>
  <v-tabs v-model="tab">
    <v-tab value="VIEW">VIEW</v-tab>
    <v-tab value="EDIT">EDIT</v-tab>
    <v-btn class="ml-auto" @click="saveMarkdown">SAVE</v-btn>
    <v-divider vertical class="mx-2"></v-divider>
    <v-btn icon="mdi-dots-vertical" variant="plain" size="small" class="mr-2"></v-btn>
  </v-tabs>
  <v-window v-model="tab" :touch=false>
    <v-window-item value="VIEW">
      <v-container>
        <MdPreview :modelValue="markdown" language="jp_JP" />
      </v-container>
    </v-window-item>
    <v-window-item value="EDIT">
      <MdEditor v-model="markdown" language="jp_JP" :toolbars="include" :preview="false" showCodeRowNumber />
    </v-window-item>
  </v-window>
</template>

<script lang="ts" setup>
import { MdEditor, config, MdPreview, ToolbarNames } from 'md-editor-v3';
import { ref } from 'vue';
import 'md-editor-v3/lib/style.css';
import 'md-editor-v3/lib/preview.css';
import JP_JP from '@vavt/cm-extension/dist/locale/jp-JP';
import { useMarkdownStore } from '@/features/Top/store/markdown'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const markdownStore = useMarkdownStore();

const tab = ref('VIEW');

const include: ToolbarNames[] = [
  'revoke',
  'next',
  '-',
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  // 'image',
  'table',
  'mermaid',
  'katex',
  // 'save',
  '=',
  // 'pageFullscreen',
  // 'fullscreen',
  'preview',
  // 'htmlPreview',
  // 'catalog',
  // 'github'

];

config({
  editorConfig: {
    languageUserDefined: {
      'jp_JP': JP_JP
    }
  },
})

const markdown = ref(markdownStore.getMarkdown);

const saveMarkdown = () => {
  markdownStore.setMarkdown(markdown.value);
  const $toast = useToast();
  $toast.success("保存!", {
    position: 'top',
    dismissible: true,
  });
}

</script>

<style>
.v-slide-group__content {
  align-items: baseline;
}

@media screen and (max-width: 520px) {
  #md-editor-v3-preview {
    font-size: 12px !important;
  }
}
</style>
