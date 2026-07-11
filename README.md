# Gosset Lens — Angular + Tailwind Clone

Full clone of the Gosset Lens app shell (sidebar + top navbar) with a **fully redesigned, custom-built
interactive Disease Biology pathway graph**. Other modules (Standard of Care, Epidemiology, Clinical
Results, Pipeline, Simulator) are wired as static/coming-soon placeholder routes as requested.

## Setup

```bash
npm install
ng serve
```

Then open http://localhost:4200/

## Folder structure

```
src/app/
  core/
    layout/
      shell/       -> ShellComponent (sidebar + navbar + router-outlet wrapper)
      sidebar/      -> Left nav (Disease Biology routed, rest disabled/locked)
      navbar/       -> Top breadcrumb + search + references bar
    models/          -> GraphNode, GraphEdge, NavItem TypeScript interfaces
  features/
    disease-biology/
      components/
        graph-canvas/       -> Custom SVG pathway graph (zoom, pan, hover highlight, tooltips)
        graph-toolbar/       -> Pathways/Mechanisms tabs + Explore mode dropdown
        node-detail-panel/   -> Slide-in node detail card
      data/
        obesity-graph.data.ts -> Sample dataset (nodes/edges/clusters)
      graph.service.ts        -> Signal-based state (selection, hover, explore mode)
      disease-biology.component.ts
    static-page/
      static-page.component.ts -> "Coming soon" placeholder used by locked routes
  shared/
    components/icon/           -> Inline SVG icon registry component
  app.routes.ts                -> All routing (Shell wraps everything)
```

## What's custom-designed (not copied)

- Graph nodes are grouped into **cluster halos** with dashed boundary rings and category labels.
- Hovering/selecting a node **dims unrelated nodes** and animates connected edges with a flowing dash pattern.
- Edge tooltips appear on hover, matching the reference screenshot behavior but styled fresh (dark pill, drop shadow).
- Pan (drag) + scroll-to-zoom + reset view controls, bottom-right, in a floating card.
- A compact **legend** (bottom-left) mapping every cluster color.
- Node detail panel lists connected signals as chips, plus numbered references — same idea as the
  reference screenshots, restyled with the app's brand-purple palette.
- Sidebar items other than Disease Biology show a small lock icon and are non-clickable (static, as requested).

## Notes

- Colors, spacing and the whole visual language (rounded-2xl cards, soft shadows, Inter font,
  purple/teal/orange/pink category palette) were designed fresh for this project — not pixel-copied
  from the reference screenshots.
- Swap the sample dataset in `data/obesity-graph.data.ts` for any other disease's data — the graph,
  legend, and clusters all render dynamically from that file.
