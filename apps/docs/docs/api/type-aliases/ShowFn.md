# Type Alias: ShowFn()

> **ShowFn** = \<`TProps`, `TResult`, `TError`\>(`comp`, `props?`) => `Promise`\<`TResult`\>

Defined in: [types.ts:18](https://github.com/MOhhh-ok/react-dialog-hub/blob/4aa4bba910aaec24fb967d58b99c8b113f4c0fa0/packages/react-dialog-hub/src/types.ts#L18)

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
