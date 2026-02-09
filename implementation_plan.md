# Implementation Plan
1. **Initialize Project**: Next.js 14+ (App Router), Tailwind, TypeScript.
2. **Mock API**: Create `app/api/data/route.ts` to simulate ESP32 JSON response.
3. **Data Hook**: `useSensorData.ts` to poll `/api/data` (or external IP) every 500ms.
   - Buffer last 60s of data for charts (120 points).
   - Handle connection errors gracefully.
4. **Components**:
   - `Header`: Title, Status, Clock.
   - `StatusCard`: Large, conditional glow (Cyan vs Red).
   - `AxisCard`: X, Y, Z specific views.
   - `LiveChart`: Recharts implementation for heavy UI.
   - `AlertPanel`: Log of "ABNORMAL VIBRATION!" events.
5. **Styling**:
   - Dark mode base (`bg-neutral-950`).
   - Neon colors for "Normal" (Cyan) and "Abnormal" (Red/Magenta).
   - Glassmorphism panels.
