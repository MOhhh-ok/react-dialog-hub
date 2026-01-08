# Comparison with Alternatives

This page compares React Dialog Hub with common alternatives for dialog/modals orchestration.

> Scope: focus on function/Promise-based flows and library-agnostic usage.

## At a Glance

- **React Dialog Hub**: Headless, typed `await show(Dialog, props)` returning a Promise. Bring-your-own UI.
- **@ebay/nice-modal-react**: Very similar concept (`NiceModal.show`). Rich instance/ID control.
- **react-modal-hook**: Hook to open/close; no Promise result by default.
- **reoverlay**: Global registry & imperative open by key; no Promise result.
- **UI kit modals (Mantine/AntD/Chakra)**: Tight UI integration; typically callback-based.

## Feature Matrix

| Feature | React Dialog Hub | @ebay/nice-modal-react | react-modal-hook | reoverlay | UI kit modals |
|---|---|---|---|---|---|
| API style | `await show(Component, props)` | `await NiceModal.show(id\|Comp, props)` | `const [open] = useModal()` | `openModal(key, props)` | `openModal/confirm` |
| Type-safety | end-to-end props/result inference | partial; good TS support | basic | basic | varies |
| Headless (bring UI) | Yes | Yes | Yes | Yes | No (kit-tied) |
| Promise result | Yes | Yes | No | No | Rarely |
| Multiple stacks | Yes | Yes | Limited | Yes | Varies |
| Vendor lock-in | Low | Low | Low | Medium | High |
| A11y responsibility | Yours | Yours | Yours | Yours | Kit-provided |

## When to Choose Which

- Choose **React Dialog Hub** if you want small surface, strict typing of dialog inputs/outputs, and UI-library agnosticism.
- Choose **@ebay/nice-modal-react** if you need advanced instance/ID control, lifecycle helpers, and are fine with a larger abstraction.
- Choose **react-modal-hook / reoverlay** if you don’t need Promise results and prefer simple open/close mechanics.
- Choose **UI kit modals** if you are fully invested in a specific UI kit and OK with callbacks over Promises.

## Notes

- All headless options require you to ensure accessibility, focus management, and animations in your dialog components.
- Router-driven modals (route-based overlays) are another approach when URL/history synchronization is required.
