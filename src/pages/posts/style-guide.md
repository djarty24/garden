---
layout: ../../layouts/PostLayout.astro
title: "Markdown Styles Test"
date: "2026-05-09"
tag: "Documentation"
---

**Note: This post was generated with AI as it is simply a means to test all of the different Markdown features!**

This document serves as a visual reference for how various Markdown elements render on the Field Notes page. It ensures consistency across all future hardware and software logs.

## Typography and Text Elements

This is a standard paragraph. It demonstrates the default line height and text color. You can also include **bold text** to emphasize a point, or use *italics* for subtle stress. 

If you need to link to external resources, standard [Markdown links](https://example.com) will automatically pick up the theme's highlight color and hover states.

### Lists and Organization

Unordered lists are useful for noting miscellaneous items, like a grocery list:
* Fruit
    * Apples
    * Bananas
* Bread
* Mild

Ordered lists work well for step-by-step instructions:
1. Design the schematic in KiCad.
2. Route the physical traces.
3. Export the Gerber files for manufacturing.

## Blockquotes

When referencing documentation or noting an observation, use blockquotes to separate the text from your main thoughts:

> "The structural integrity of a truss joint depends entirely on the calculation of internal forces. Always double-check your component tables before finalizing a design."

## Code and Technical Snippets

For quick references within a sentence, you can use inline code blocks like `npm install firebase` or `src/components/FieldNotes.tsx`.

For larger technical logs, use standard fenced code blocks. Astro handles the formatting automatically:

```javascript
// This is a test snippet for the syntax highlighter
function calculateForces(joint, load) {
    const angle = Math.PI / 4;
    return load * Math.sin(angle);
}
```

## Visuals and Breaks

You can use horizontal rules to cleanly divide sections of a long post.

---

Images will automatically expand to fill the container and receive a subtle border and rounded corners to match the site's aesthetic.

![Pink and Yellow Tulips](https://images.unsplash.com/photo-1525898939552-346875c89d92?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)