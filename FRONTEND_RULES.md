Purpose

This document defines the visual design system and UI rules for the entire website.

Claude must strictly follow these rules to ensure:

consistent design

modern UI

reusable components

professional academic website appearance

1. Global Design Principles

The website must look:

Clean
Modern
Academic
Professional
Minimal
Readable

Avoid:

Overly flashy designs
Too many colors
Crowded layouts
Heavy animations

Focus on clarity and structure.

2. Layout System

Use a container-based layout.

Standard container:

max-width: 1200px
margin: auto
padding: 20px

Example layout structure:

SectionContainer
   SectionTitle
   GridLayout
       Cards

3. Grid System

All content sections must use grid layout.

Desktop

4 columns

Tablet

2 columns

Mobile

1 column

Example:

[Card] [Card] [Card] [Card]

[Card] [Card] [Card] [Card]

4. Spacing System

Use consistent spacing.

Section spacing: 80px
Card gap: 24px
Card padding: 20px
Element spacing: 12px

Never use random spacing.

5. Typography System

Headings:

Font weight: bold
Line height: tight

Body text:

Readable
Line height: 1.6

Hierarchy:

H1 → Page title
H2 → Section title
H3 → Card title
Body → Description

6. Color System

Use minimal color palette.

Example palette:

Primary → Deep Blue
Secondary → Light Gray
Accent → Gold
Text → Dark Gray
Background → White

Guidelines:

Primary color for buttons and highlights

Neutral background colors

Avoid bright neon colors

7. Card Design System

All sections use card-based UI.

Card structure:

Card
│
├ Image
├ Title
├ Short Description
├ Optional Date
└ Read More Button

Card styling rules:

Border radius → medium
Shadow → soft
Padding → consistent
Hover → slight lift

Example behavior:

Hover → card moves slightly up
Shadow increases

8. Card Types

Different sections may use different card types.

News Card
Image
Title
Date
Short summary
Read More
Event Card
Image
Event Title
Event Date
Short description
Department Card
Department Image
Department Name
Short description
View Department
Gallery Card
Image only
Title overlay
Placement Card
Company logo
Student name
Package

9. Section Layout Pattern

Every homepage section must follow this structure.

SectionContainer
   SectionTitle
   GridLayout
       Cards
   ReadMoreButton

Example:

News Section

[Card] [Card] [Card] [Card]

Read More →

10. Section Titles

Section titles must include:

Title
Optional subtitle
Divider or spacing

Example:

Latest News
Stay updated with campus announcements

11. Buttons

Buttons must follow consistent style.

Primary button:

Solid background
Rounded corners
Medium padding

Secondary button:

Outline style

Hover effect:

Background darkens slightly

12. Read More Button

Each homepage section must include:

Read More →

Placement:

Center or right aligned
Below card grid

Navigation example:

News → /news
Events → /events
Gallery → /gallery

13. Image Rules

Images must:

Fill card width
Maintain aspect ratio
Be optimized
Use lazy loading

Aspect ratio recommendation:

16:9

14. Hero Section Design

Hero must include:

Large background image
Overlay gradient
Headline
Short tagline
CTA buttons

CTA examples:

Apply Now
Explore Programs
Visit Campus

15. Quick Facts Design

Quick facts must use statistic cards.

Example:

120 Acres
Campus Area

50+
Years of Excellence

95%
Placement Rate

Design:

Icon
Large number
Label

16. Gallery Layout

Gallery must use image grid layout.

Example:

[Image] [Image] [Image] [Image]

[Image] [Image] [Image] [Image]

Hover behavior:

Image zoom
Title overlay

17. Navbar Design Rules

Navbar must:

Sticky
Clean
Minimal
Dropdown menus

Dropdown behavior:

Desktop → hover
Mobile → accordion

18. Footer Design

Footer must contain:

Address
Contact information
Quick links
Social media links

Layout:

Multi-column footer

19. Animation Rules

Animations must be minimal.

Allowed animations:

Card hover
Button hover
Dropdown open
Image zoom

Avoid:

Heavy motion effects
Complex transitions

20. Performance Rules

Always optimize for performance.

Rules:

Lazy load images
Limit homepage API calls
Avoid large images
Reuse components

21. Accessibility Rules

Ensure:

Readable font sizes
Good contrast
Clickable elements large enough
Keyboard navigation

22. Mobile Responsiveness

Design must work perfectly on:

Desktop
Tablet
Mobile

Use responsive grid.

23. UI Consistency Rules

Maintain:

Same card style everywhere
Same grid system
Same spacing
Same typography

Consistency is critical.

24. Hard Rules

Claude must never:

Break card grid layout
Create inconsistent card styles
Add random colors
Change typography randomly
Add unnecessary animations

25. Final Goal

The website must feel like a modern university portal similar to:

Top engineering college websites
Clean academic portals
Professional institutional websites

Focus on:

Content clarity
Strong visual hierarchy
Structured information