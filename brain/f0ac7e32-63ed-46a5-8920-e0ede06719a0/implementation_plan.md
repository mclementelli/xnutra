# Implementation Plan

**Goal**: Remove the existing "Evaluar Salud Masculina" (Testomax) questionnaire and replace it with a new premium, modern, responsive questionnaire called “Perfil de Energía y Vitalidad Masculina”.

## Steps

1. **Delete/Testomax Cleanup**
   - Remove `src/components/TestomaxGeneratorFlow.tsx`.
   - Remove all imports and UI references to `TestomaxGeneratorFlow` (Vitrina.tsx, any modals).
   - Remove any product‑specific logic for `testomax` (e.g., product.id checks, button labels).
   - Delete any related CSS/tailwind classes if unused.

2. **Create New Quiz Component**
   - File: `src/components/EnergyVitalityQuiz.tsx`.
   - Use React + Framer Motion for smooth transitions.
   - Implement:
     - 10 questions (as specified).
     - Progress bar.
     - State management for answers.
     - IMC calculation from weight/height input.
     - Scoring algorithm mapping answers to low/medium/high.
     - Result view with:
       * Personalized analysis,
       * Symptoms list,
       * Recommendations & habits,
       * Estimated improvement time,
       * Natural supplement suggestion (ginseng, maca, tribulus, ortiga, iicanina).
     - Final CTA button.
   - Styling: dark‑mode, neon accents, glass‑morphism, mobile‑first, Tailwind classes.
   - Export component props: `isOpen`, `onClose`, `productColor` (optional for color theming).

3. **Wire Component Into Vitrina**
   - Add import: `import { EnergyVitalityQuiz } from './EnergyVitalityQuiz';`
   - Add state `isEnergyQuizOpen`.
   - Replace the Testomax button block (lines 341‑348) with a new button that opens the EnergyVitalityQuiz.
   - Add the component near the bottom of Vitrina JSX, similar to existing flows:
   ```tsx
   <EnergyVitalityQuiz
     isOpen={isEnergyQuizOpen}
     onClose={() => setIsEnergyQuizOpen(false)}
     productColor={products.find(p => p.id === 'testomax')?.color || '#ff3e3e'}
   />
   ```

4. **Styling Adjustments**
   - Update `src/index.css` (or Tailwind config) to add dark background variables, neon colors, glass effect utilities.
   - Ensure mobile breakpoints for the quiz (full‑screen modal on small screens, centered on larger screens).
   - Add subtle hover/scale animations for buttons.

5. **Testing & Verification**
   - Run the dev server (`npm run dev`).
   - Verify that the old Testomax flow is completely gone.
   - Walk through the new quiz, ensure progress bar updates, transitions smooth, BMI calculates correctly, and final result displays with correct category.
   - Check responsiveness on mobile screen sizes.
   - Ensure no TypeScript errors (run `npm run lint`).

6. **Documentation**
   - Update any README or component comments to reflect the new quiz.
   - Add a brief usage note in `src/components/EnergyVitalityQuiz.tsx` header.

## Verification Plan

- **Automated**: `npm run build` should succeed; `npm run lint` returns no errors.
- **Manual**: Open the app, navigate to a product, click the new “Perfil de Energía y Vitalidad Masculina” button, complete the quiz, and verify the result view and CTA are displayed.

**User Review Required**: None – the plan follows the provided specifications.
