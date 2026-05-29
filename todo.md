# SeatSnags Mobile Responsiveness Tasks

- [x] Fix hero section grid on mobile (directly override `grid-template-columns`)<!-- id: 1 -->
- [x] Fix badge horizontal overflow (add `overflow: hidden`)<!-- id: 2 -->
- [x] Commit and push changes to GitHub<!-- id: 3 -->

## Review

### Changes Made

1. **`@/Users/benjaminaronov/code/ruskibenya/seatsnags-landing/src/index.css:212-216`**
   - Directly set `grid-template-columns: minmax(0, 1fr) !important;` under `@media (max-width: 860px)`.
   - Added `min-width: 0;` to both first and last children of `.hero-grid` to prevent child contents (like the phone mockup/scroller) from stretching the grid track beyond viewport width.

2. **`@/Users/benjaminaronov/code/ruskibenya/seatsnags-landing/src/App.jsx:126`**
   - Added `overflow: 'hidden'` to the badge parent div so nowrap text is clipped neatly within the border radius rather than bleeding outward on very narrow screens.
