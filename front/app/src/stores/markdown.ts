import { defineStore } from "pinia";

type Markdown = {
  markdown: string;
};

export const useMarkdownStore = defineStore("markdown", {
  state: (): Markdown => ({
    markdown: `
注意：
当ウェブサイトでは、**ローカルストレージ**を保存先として利用しています。
ご利用後は、右上のヘッダにあるアイコンから「**初期化**」を選択することで、当サイト内のデータを削除できます。

---
## Vue.js
#### コンポーネント指向
コンポーネントは、「構成要素」や「部品」といった意味を持ちます。
UI要素をコンポーネント単位で作成し、それらを組み合わせることで、アプリケーションを構築します。
コンポーネントは再利用可能となることで、開発効率が向上するとともに、コードの保守性も高まります。

Vue.jsは、このコンポーネントベースのアーキテクチャを採用しています。

#### データバインディング
Vue.jsは、データとビューの間にリアクティブなバインディングを提供しています。
これにより、データが変更されると、それに連動して自動的にビューが更新されます。
手動でDOMを更新する必要がなくなり、コードの記述が簡潔で保守しやすくなります。

## TypeScript
Vue3からTypeScriptの本格的なサポートされました。
#### 静的型付け
TypeScriptはJavaScriptのスーパーセットであり、静的型付けをサポートしています。これは、変数や関数の型を宣言し、コンパイル時に型エラーを検出できるという意味です。静的型付けにより、コードの品質向上や開発効率の向上が期待できます。
#### クラスベースオブジェクト指向
TypeScriptはクラスやインターフェースなど、クラスベースのオブジェクト指向プログラミングをサポートしています。これにより、コードをより構造化し、再利用性や保守性を向上させることができます。

## Vite
Viteは元々Vue.jsのために作られました。
#### 高速な開発サーバー
Viteは非常に高速で効率的な開発サーバーを備えています。
開発中に即座に変更を反映させるホットリローディングをサポートしています。

**ESM (ECMAScript Modules)ベースのビルド**
モジュール単位でのキャッシュや、効率的なバンドルが実現されており、ビルドプロセスが高速になります。

**最終的なビルドでは、他ツールと同様にすべてのファイルをコンパイルしバンドルを生成します。**

#### 参考：JavaScriptバンドラー
複数のJavaScriptファイルやモジュールを一つのファイルにまとめて、Webページでの読み込みや実行を効率化するツールです。
代表的なツールには、WebPackやParcel、Rollupのようなものがあります。
Viteとの違いは、開発サーバーの起動時にも、すべてのモジュールをコンパイルしバンドルしたソースコードを生成するため、プロジェクトが大きくなればなるほど、時間も比例し伸びます。


### 参考
[Vue.js](https://ja.vuejs.org/)
[TypeScript](https://www.typescriptlang.org/ja/)
[Vite](https://ja.vitejs.dev/)
    `,
  }),
  persist: {
    storage: window.localStorage,
    key: "markdown",
  },
  getters: {
    getMarkdown(): string {
      return this.markdown;
    },
  },
  actions: {
    setMarkdown(markdown: string): void {
      this.markdown = markdown;
    },
  },
});
