---
description: Design system and animation principles for the portfolio
---

# Portfolio Design System

## Inspiration
- xAI / Grok / Colossus motion systems
- Research lab interfaces
- AI platform dashboards

## Core Principles

### 1. Engineered, Not Decorative
- Animations must serve a purpose
- Every motion should feel intentional
- No gratuitous effects or flourishes

### 2. Subtle, Precise, Intentional
- Controlled easing curves (no bounce, no spring)
- Heavy, cinematic motion (0.5-0.9s duration)
- Minimal movement distances

### 3. Never AI-Generated Looking
- Avoid neon colors
- No rainbow gradients
- No particle explosions
- Clean, geometric forms only

### 4. Readability First
- Text always dominates
- Background effects stay in background
- High contrast maintained at all times

## Color Palette

### Primary Colors
- Background: `#0F1218` (near-black)
- Foreground: `#ffffff` (white)
- Primary: `#3b82f6` (electric blue)
- Accent: `#22d3ee` (cyan)

### Secondary Colors
- Muted: `#6b7280` (gray)
- Border: `rgba(255,255,255,0.06)`
- Card: `#131720`

## Typography

### Font Stack
```css
--font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
```

### Heading Style
- h1: Bold (700), letter-spacing: 0.02em
- h2: Semi-bold (600), letter-spacing: 0.01em
- h3-h4: Semi-bold (600), letter-spacing: 0
- Body: Light weight, letter-spacing: -0.01em

## Animation Guidelines

### Easing Curves
- Heavy: `[0.16, 1, 0.3, 1]` - for dramatic reveals
- Cinematic: `[0.25, 0.1, 0.25, 1]` - for smooth transitions

### Timing
- Fast interactions: 200-300ms
- Card reveals: 500ms
- Hero elements: 700-900ms
- Stagger delay: 100-150ms

### 3D Background Rules
- Load after text (800ms delay)
- Disable on tablets/mobile (≤1024px)
- Fade in smoothly (1s transition)
- Use geometric, data-inspired forms
- Keep particle count low (40-80)

### VISUAL DIRECTION: LOCKED (Do Not Deviate)

**CORE STYLE:** "Advanced AI Infrastructure"
- **Background**: Deep Navy (`#020617`) → Near-Black Gradient
- **Accents**: Blue / Teal ONLY. (No other colors allowed for UI)
- **Vibe**: Research + Real Systems. Engineered. Expensive.
- **Typography**: Inter / SF Pro style. Large, confident, high contrast.

**FORBIDDEN (Strictly Enforced):**
- ❌ Bright neon colors (Pink, Purple, Green, Orange)
- ❌ Glitter, sparkles, or rainbow gradients
- ❌ Playful or "gamified" elements
- ❌ "AI-generated" abstract art
- ❌ Low contrast text

**MOTION:**
- Slow, deliberate, engineered.
- No bounce, no spring, no sudden moves.
- "Supercomputer status light" feel.

**TECHNOLOGY STACK:**
- React Three Fiber (Three.js) for Hero
- Tailwind v4 for system styling
- Framer Motion for UI transitions

**Professional Evaluation Criteria**
- Does it look like a Series A deep-tech startup?
- Is it recruiter-safe (Faang-grade)?
- Is text perfectly readable?


### Professional Evaluation Criteria

**Senior Engineer Review Standards:**
Every element must pass this test:
- ❌ Reject if it looks artistic instead of technical
- ❌ Reject if it distracts from content
- ❌ Reject if it feels AI-generated
- ❌ Reject if it would reduce recruiter trust

**Animation Purpose Test:**
- ✅ Does it communicate system thinking?
- ✅ Does it guide attention to content?
- ✅ Is it interaction-based (not decorative)?
- ✅ Would a senior engineer approve it?

**Banned Decorative Elements:**
- ❌ Sparkles/magic icons (use professional icons: Briefcase, Target, etc.)
- ❌ Floating/bobbing animations (use static or purposeful motion)
- ❌ Rainbow/gradient effects (use muted, technical colors)
- ❌ Particle explosions or confetti
- ❌ Glow effects or halos

## Component Standards

### Cards (System Panels)
- Background: `#0F1218`
- Border: `border-white/[0.06]`
- Corners: `rounded-[4px]` (sharp, not bubbly)
- Hover: slight lift, border highlight, inner glow

### Buttons
- Sharp corners matching cards
- Primary: blue with glow on hover
- Secondary: dark glass matching cards

### Icons
- Lucide icon set
- Size: 16-20px typically
- Color: match text or primary

## Performance Requirements
- 60fps scrolling always
- GPU acceleration for animations
- No heavy effects on mobile
- Lazy load 3D content
- Respect prefers-reduced-motion
