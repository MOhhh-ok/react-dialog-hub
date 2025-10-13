# Type Alias: ShowFn()

> **ShowFn** = \<`TProps`, `TResult`, `TError`\>(`comp`, `props?`) => `Promise`\<`TResult`\>

Defined in: [types.ts:19](https://github.com/MOhhh-ok/react-dialog-hub/blob/5673faacf88e76b0990b2083c26229d9de0bb4ca/packages/react-dialog-hub/src/types.ts#L19)

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
