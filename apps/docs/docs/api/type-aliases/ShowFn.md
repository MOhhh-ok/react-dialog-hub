# Type Alias: ShowFn()

> **ShowFn** = \<`TProps`, `TResult`, `TError`\>(`comp`, `props?`) => `Promise`\<`TResult`\>

Defined in: [types.ts:19](https://github.com/MOhhh-ok/react-dialog-hub/blob/82376cfc18edcade8f2ad8d1e630375a85681345/packages/react-dialog-hub/src/types.ts#L19)

## Type Parameters

### TProps

`TProps`

### TResult

`TResult`

### TError

`TError`

## Parameters

### comp

[`DialogComponent`](DialogComponent.md)\<`TProps`, `TResult`, `TError`\>

### props?

`Omit`\<`TProps`, keyof [`DialogBase`](DialogBase.md)\<`TResult`, `TError`\>\>

## Returns

`Promise`\<`TResult`\>
