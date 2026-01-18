# Type Alias: ShowFn()

> **ShowFn** = \<`TProps`, `TResult`, `TError`\>(`comp`, `props?`) => `Promise`\<`TResult`\>

Defined in: [types.ts:18](https://github.com/MOhhh-ok/react-dialog-hub/blob/d84c8ec2b982fbcb0b49725d824032999648eda8/src/types.ts#L18)

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
