# Golf Tracker — Design Specification

## Overview

A personal golf journal and statistics dashboard inspired by the Masters Tournament live scoring UI. No leaderboards, no multiplayer — just a beautiful, data-rich view of one golfer's journey.

## Design System

### Colors

| Token                | Value     | Usage                            |
| -------------------- | --------- | -------------------------------- |
| `--bg-primary`       | `#f5f5f0` | Page background (warm off-white) |
| `--bg-card`          | `#ffffff` | Card surfaces                    |
| `--bg-header`        | `#1a3c27` | Dark green header bar            |
| `--accent-green`     | `#2d7a3e` | Primary brand green              |
| `--accent-light`     | `#e8f5e9` | Light green tint for highlights  |
| `--text-primary`     | `#1a1a1a` | Headings, important text         |
| `--text-secondary`   | `#5c5c5c` | Body text, descriptions          |
| `--text-muted`       | `#888888` | Timestamps, labels               |
| `--border`           | `#e0e0d8` | Card borders, dividers           |
| `--score-eagle`      | `#2d7a3e` | Dark green — eagle or better     |
| `--score-birdie`     | `#4caf50` | Green — birdie                   |
| `--score-par`        | `#ffffff` | White — par                      |
| `--score-bogey`      | `#e8e8e8` | Light gray — bogey               |
| `--score-double`     | `#c8c8c8` | Darker gray — double bogey+      |
| `--score-text-dark`  | `#1a1a1a` | Score text on light bg           |
| `--score-text-light` | `#ffffff` | Score text on dark bg            |

### Typography

| Element       | Font  | Weight | Size | Line Height |
| ------------- | ----- | ------ | ---- | ----------- |
| Page Title    | Inter | 700    | 32px | 1.2         |
| Section Title | Inter | 600    | 20px | 1.3         |
| Card Title    | Inter | 600    | 16px | 1.4         |
| Body          | Inter | 400    | 14px | 1.5         |
| Caption       | Inter | 400    | 12px | 1.4         |
| Score Number  | Inter | 700    | 14px | 1           |
| Hole Number   | Inter | 600    | 11px | 1           |

### Spacing

- Page padding: `24px` mobile, `40px` desktop
- Card padding: `20px`
- Card gap: `16px`
- Section gap: `32px`

### Components

#### Scorecard Table

- Full-width responsive table
- Header row: dark green bg (`#1a3c27`), white text
- Columns: Hole (1–18), Par, Round rows (R1, R2, etc.)
- Hole numbers: centered, small caps
- Par row: light green tint bg, dark text
- Score cells: colored based on relation to par:
  - ≥2 under par: `--score-eagle` bg, white text
  - 1 under par: `--score-birdie` bg, white text
  - Par: white bg, dark text
  - 1 over par: `--score-bogey` bg, dark text
  - ≥2 over par: `--score-double` bg, dark text
- Total column: bold, slightly wider, right border accent
- Hover: subtle scale(1.05) on cell

#### Stat Donut Chart

- SVG-based ring chart
- Stroke width: `12px`
- Inner radius creates donut hole
- Colors match score color tokens
- Center shows count + percentage
- Animated on viewport entry

#### Stat Tab Bar

- Horizontal scrollable on mobile
- Pill-style tabs with rounded borders
- Active tab: green bg, white text
- Inactive: white bg, green border, green text

#### Round Card

- White card with subtle shadow
- Header: course name, date, total score (relative to par)
- Expandable to show full scorecard
- Right side: small inline score trend (sparkline)

#### Profile Header

- Avatar (64px circle, green ring)
- Name + handicap badge
- Mini stats row: Rounds played, Best score, Avg score, Handicap
- Bio / favorite course tagline

## Page Sections

### 1. Profile Header

- Sticky at top
- Left: avatar, name "Vincent Ngo", handicap badge (e.g., "HCP 18.4")
- Center: 4 mini stat blocks with icons
  - 🏌️ 24 Rounds
  - 🏆 +2 Best
  - 📊 +16 Avg
  - ⛳ 8 Courses
- Right (desktop): "Log New Round" CTA button (green pill)

### 2. Latest Round Scorecard

- Section title: "Latest Round — Torrey Pines South"
- Date + course info subtitle
- Full 18-hole scorecard table (see Component: Scorecard Table)
- Round total: prominent display with "+12" or "72" formatting
- Front 9 / Back 9 subtotals
- Below table: key explaining color coding

### 3. Statistics Dashboard

- Section title: "Statistics"
- Tab bar: Scoring Summary | Greens in Regulation | Fairways Hit | Putting | Scoring by Par
- **Scoring Summary (default tab):**
  - Large donut: overall distribution (Eagle, Birdie, Par, Bogey, Double+)
  - 5 small stat cards below with mini donut + count + percentage:
    - Eagles, Birdies, Par, Bogey, Double Bogey+
- **Greens in Regulation:**
  - Large stat: "42%" GIR rate
  - Bar chart by round (last 10 rounds)
- **Fairways Hit:**
  - Large stat: "55%" Fairways
  - Bar chart by round
- **Putting:**
  - "1.8" Putts per GIR
  - "32" Total putts (last round)
  - "2.1" Putts per round avg
- **Scoring by Par:**
  - 3 bars: Par 3 avg, Par 4 avg, Par 5 avg
  - Comparison to handicap expectation

### 4. Round History

- Section title: "Round History"
- Filter: All Courses | dropdown
- Sort: Newest | Best Score | Course A-Z
- Vertical list of Round Cards (see Component: Round Card)
- Load more / pagination

### 5. Courses Played

- Section title: "My Courses"
- Horizontal scrollable cards
- Each card: course image, name, location, times played, best score, avg score

## Interactions

- Scorecard cells: hover reveals strokes gained vs handicap
- Round cards: click expands to inline scorecard
- Stat tabs: smooth crossfade transition
- Donut charts: animate from 0 to value on scroll into view
- "Log New Round" button: opens modal form (future feature)

## Responsive

- Mobile (< 768px):
  - Scorecard: horizontal scroll with fixed first column (hole/par sticky)
  - Stats: stack vertically, tabs become horizontal scroll
  - Round history: full width cards
- Tablet (768–1024px):
  - 2-column stats grid
- Desktop (> 1024px):
  - Full layout, max-width 1200px centered
  - 3-column course cards

## Assets

- Profile avatar: user's GitHub avatar or initials
- Course images: Unsplash golf course photos (use placeholder URLs)
- Icons: Lucide React (Flag, TrendingUp, MapPin, Calendar, Trophy, etc.)
