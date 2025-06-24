# Test Plan

This document outlines the testing strategy for the Smart Tag Input component using **React Testing Library**.

---

## Objective

Ensure the component is:

- Functionally correct
- Accessible

---

## Scope

Components to test:

- `TagInput.jsx`

---

## Test Scenarios

### 1. Rendering

- Should render the input and empty tag list by default
- Should show loading placeholder when `loading` is true

### 2. Autocomplete

- Should show suggestions when typing input
- Should hide suggestions when input is cleared
- Should limit suggestions to max 7 items

### 3. Tag Selection

- Should add tag on clicking a suggestion
- Should add tag on pressing `Enter`
- Should not add duplicate tags

### 4. Tag Removal

- Should remove tag on clicking '×'
- Should remove last tag on `Backspace` when input is empty

### 5. Keyboard Navigation

- Should navigate suggestions with ArrowUp / ArrowDown
- Should close suggestion list on `Escape`

### 6. Accessibility (A11y)

- `SuggestionList` has `role="listbox"` and `role="option"`
- `aria-selected`, `aria-disabled` handled correctly

### 7. Edge Cases

- No suggestions → shows "No tag found"
- Handles API failure or empty data correctly

---

## Test File Example

```bash
/__tests__/
  TagInput.test.jsx
```
