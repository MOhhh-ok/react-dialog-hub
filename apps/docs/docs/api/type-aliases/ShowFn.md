# Type Alias: ShowFn()

> **ShowFn** = \<`TProps`, `TResult`, `TError`\>(`comp`, `props?`) => `Promise`\<`TResult`\>

Defined in: [types.ts:18](https://github.com/MOhhh-ok/react-dialog-hub/blob/da6ae5cfa7931b6f3078f7ce1fc6cc903dfd8206/packages/react-dialog-hub/src/types.ts#L18)

## Type Parameters

### TProps

`TProps`

### TResult

`TResult` = `void`

### TError

`TError` = `unknown`

## Parameters

### comp

[`DialogComponent`](DialogComponent.md)\<`TProps`, `TResult`, `TError`\>

### props?

`Omit`\<`TProps`, keyof [`DialogBase`](DialogBase.md)\<`TResult`, `TError`\>\>

## Returns

`Promise`\<`TResult`\>
