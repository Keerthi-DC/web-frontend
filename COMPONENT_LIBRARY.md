Purpose

This document defines the reusable UI components used across the website.

Claude must always reuse these components instead of creating new UI patterns.

Benefits:

consistent design

faster development

reusable UI system

maintainable frontend

1. Core Layout Components
1.1 SectionContainer

Wraps every section.

Structure:

SectionContainer
   SectionTitle
   SectionContent

Responsibilities:

maintain consistent width

provide section spacing

Standard styles:

max-width: 1200px
margin: auto
padding: 80px 20px

Example usage:

<SectionContainer>
   <SectionTitle title="Latest News" />
   <GridLayout>
       <Card />
   </GridLayout>
</SectionContainer>

2. SectionTitle Component

Used for all section headings.

Structure:

Title
Optional subtitle
Divider

Example:

Latest News
Stay updated with campus announcements

Props:

title
subtitle
align (left | center)

Example:

<SectionTitle
   title="Upcoming Events"
   subtitle="Join exciting campus activities"
/>

3. GridLayout Component

Handles responsive grid layout.

Breakpoints:

Desktop → 4 columns
Tablet → 2 columns
Mobile → 1 column

Example:

<GridLayout>
   <Card />
   <Card />
   <Card />
</GridLayout>

Grid gap:

24px

4. Card Component (Base)

All content uses card-based design.

Base card structure:

Card
│
├ CardImage
├ CardBody
│     ├ CardTitle
│     ├ CardDescription
│     └ CardMeta
│
└ CardFooter
      └ ReadMoreButton

Common card features:

border-radius
shadow
hover lift
image top
consistent padding

Hover behavior:

translateY(-5px)
increase shadow

5. Card Variants
5.1 NewsCard

Used in:

News Section
News Page

Structure:

Image
Title
Date
Short summary
Read More

Example:

<NewsCard
   title="Technowave 2026 Announced"
   date="12 Mar 2026"
   image="/images/event.jpg"
/>

5.2 EventCard

Used in:

Events Section
Events Page

Structure:

Event Image
Event Title
Event Date
Short Description

Example:

<EventCard
   title="Tech Fest"
   date="20 Mar 2026"
/>

5.3 DepartmentCard

Used in:

Departments Section
Departments Page

Structure:

Department Image
Department Name
Short description
View Department

Example:

<DepartmentCard
   name="Computer Science"
   description="Leading department in AI research"
/>

5.4 ProgramCard

Used in:

Programs Section
Programs Page

Structure:

Program Title
Duration
Description
Apply button

5.5 GalleryCard

Used in:

Gallery Section
Gallery Page

Structure:

Image
Overlay title

Hover behavior:

Image zoom
Title overlay fade

5.6 PlacementCard

Used in:

Placements Section
Placements Page

Structure:

Company logo
Student name
Package

Example:

<PlacementCard
   company="Amazon"
   package="45 LPA"
   student="Rahul"
/>

6. StatisticCard

Used in Quick Facts.

Structure:

Icon
Large Number
Label

Example:

120 Acres
Campus Area

Example component:

<StatisticCard
   number="95%"
   label="Placement Rate"
/>

7. ReadMoreButton

Used in all sections.

Example:

Read More →

Navigation example:

News → /news
Events → /events
Gallery → /gallery

Example component:

<ReadMoreButton link="/news" />

8. HeroBanner Component

Used at top of homepage.

Structure:

Background Image
Overlay Gradient
Headline
Tagline
CTA Buttons

Example:

Welcome to BIET

Empowering future engineers

Buttons:

Apply Now
Explore Programs
Visit Campus

9. Navbar Component

Contains:

Logo
Main navigation
Dropdown menus
Mobile menu

Dropdown structure:

Academics
   Programs
   Departments
   Faculty

10. TopBar Component

Small header above navbar.

Links:

Students
Staff
Parents
Visitors
Alumni
Career

11. Footer Component

Footer contains:

Address
Contact
Quick links
Social links

Layout:

4 column footer grid

12. Section Templates

Claude should use these templates.

News Section Template
SectionContainer
   SectionTitle
   GridLayout
      NewsCard x5
   ReadMoreButton
Events Section Template
SectionContainer
   SectionTitle
   GridLayout
      EventCard x5
   ReadMoreButton
Gallery Section Template
SectionContainer
   SectionTitle
   GridLayout
      GalleryCard x6
   ReadMoreButton
Research Section Template
SectionContainer
   SectionTitle
   GridLayout
      Card x3
   ReadMoreButton

13. API Data Mapping

Each card consumes API data.

Example mapping:

/api/news → NewsCard
/api/events → EventCard
/api/gallery → GalleryCard
/api/placements → PlacementCard
/api/departments → DepartmentCard
/api/programs → ProgramCard

Homepage API rule:

limit=5

Example:

/api/news?limit=5

14. Page Layout Template

Example page:

News Page

Header

Page Title

GridLayout
   NewsCard
   NewsCard
   NewsCard

Pagination

Footer

15. Hard Rules

Claude must always:

Reuse existing components
Maintain grid layout
Use card-based design
Keep consistent spacing

Claude must never:

Create random UI components
Break design consistency
Use inconsistent card styles

16. Final System Overview

Your frontend system now includes:

CLAUDE.md
→ Structure + APIs + Routing

FRONTEND_RULES.md
→ UI design system

COMPONENT_LIBRARY.md
→ Reusable components

Together these files allow Claude to:

generate full frontend pages

reuse components automatically

keep consistent UI

integrate APIs properly