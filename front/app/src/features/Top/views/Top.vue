<template>
  <v-tabs v-model="tab" align-tabs="end">
    <v-tab value="VIEW">VIEW</v-tab>
    <v-tab value="EDIT">EDIT</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item value="VIEW">
      <v-container>
        <MdPreview :modelValue="markdown" language="jp_JP" />
      </v-container>
    </v-window-item>
    <v-window-item value="EDIT">
      <MdEditor v-model="markdown" language="jp_JP" :toolbarsExclude="exclude" @onSave="saveMarkdown" />
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

const exclude: ToolbarNames[] = ['image'];

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
  $toast.success("保存!");
}

</script>
