# Decision Log

This document outlines the key technology decisions made during the development of the **Smart Tag Input** component.

---

## Framework: Next.js + React

### Reason:

- **React** makes it easy to build reusable, interactive components like tag inputs using a clear and flexible structure.
- **Next.js** builds on React with:
  - Out-of-the-box routing and SSR
  - File-based routing and simplified project structure
  - Performance optimizations

---

## Styling: Tailwind CSS

### Reason:

- Faster development
- Less need to write custom CSS files
- Easy to build customizable UI components like tags, dropdowns, etc.

---

## Testing: React Testing Library (RTL)

### Reason:

- Lightweight
- Works well with accessibility (`aria-*`, roles)
- RTL ensures the component remains **maintainable**, **bug-free**.
