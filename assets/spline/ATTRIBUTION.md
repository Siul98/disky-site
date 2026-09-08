# Stackable Glass

[Stackable Glass](https://app.spline.design/community/file/12c88eab-fad8-4360-bf1d-1c951436188d) by [Spline Team](https://app.spline.design/@spline), licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Original export retrieved 2026-09-08: https://prod.spline.design/TwDbT1tAvjU314kK-9q5/scene.hanacode

Adaptations: one pane per Bento, responsive size and corner radius; demonstration stack, cursor tracking and backdrop removed. Original fill and three material effects retained. Website backdrop is supplied independently; no DISKY studio-room image is used. Native HTML text and controls remain separate.

Spline Hana viewer 1.2.54 and hana-notext.wasm are bundled locally. The viewer has local additions for schema validation, image-decode completion and live canvas texture updates. Original material shaders are unchanged. Static compositions use temporary rendering; the live adapter reuses an engine and updates with its background source.

The four scroll-tour panes share one live atlas engine. The visible website canvas supplies the stars, grid, blue ambient light and shooting star; transformed card bounds determine the current sample each frame. Static How/demo surfaces retain their solid website ground. No room image is used.
