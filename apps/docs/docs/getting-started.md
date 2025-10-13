# Getting Started

`react-dialog-hub` の基本的な導入と、Radix/MUI/素のダイアログの例を紹介します。詳細な API は左メニューの「API」を参照してください。

## インストール

```bash
pnpm add react-dialog-hub
```

## プロバイダの設置

アプリのルートで `DialogProvider` を配置します。

```tsx
import { DialogProvider } from 'react-dialog-hub';

export function Root() {
  return (
    <DialogProvider>
      <App />
    </DialogProvider>
  );
}
```

## ダイアログの呼び出し

`useDialog()` の `show()` を使って、任意のダイアログコンポーネントを表示します。コンポーネントには `resolve/reject` が自動で渡され、`resolve(result)` を呼ぶと Promise が解決されます。

```tsx
import { useDialog } from 'react-dialog-hub';

function Page() {
  const { show } = useDialog();
  const openConfirm = async () => {
    const ok = await show(ConfirmDialog, { message: '続行しますか？' });
    if (ok) {
      // do something
    }
  };
  return <button onClick={openConfirm}>Open Confirm</button>;
}
```

### Confirm の例（素の実装）

```tsx
type ConfirmProps = { message: string };

function ConfirmDialog({ message, resolve, reject }: ConfirmProps & { resolve: (v: boolean) => void; reject: (e?: unknown) => void }) {
  return (
    <div role="dialog">
      <p>{message}</p>
      <button onClick={() => resolve(true)}>OK</button>
      <button onClick={() => resolve(false)}>Cancel</button>
    </div>
  );
}
```

UI ライブラリ（Radix/MUI など）は、既存のダイアログコンポーネントに `resolve/reject` を渡して呼び出すだけです。

---

次は、詳細 API を「API」セクションで確認してください。


