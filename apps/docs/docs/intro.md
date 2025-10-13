---
sidebar_position: 1
---

# React Dialog Hub

軽量・Headless・型安全なダイアログ呼び出しのハブです。任意の UI ライブラリ（MUI, Radix, 自作）で動作します。

## 特長

- 関数呼び出しでダイアログを表示して結果を Promise で受け取れる
- UI 非依存（Headless）で、既存ダイアログ資産をそのまま活用可能
- TypeScript による型安全な props/result

## インストール

```bash
pnpm add react-dialog-hub
```

## 使い方（クイックスタート）

1. ルートに `DialogProvider` を配置
2. `useDialog()` で `show` を呼び出し、任意のダイアログコンポーネントを表示

```tsx
import { DialogProvider, useDialog } from 'react-dialog-hub';

function AppRoot() {
  return (
    <DialogProvider>
      <App />
    </DialogProvider>
  );
}

function Example() {
  const { show } = useDialog();
  const onClick = async () => {
    const result = await show(MyConfirmDialog, { message: '続行しますか？' });
    console.log(result);
  };
  return <button onClick={onClick}>Open</button>;
}
```

詳細は左メニューの各ガイド、もしくは API 参照をご覧ください。

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 20.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
