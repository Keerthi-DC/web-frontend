# PROMPTS.md — Claude Generation Prompts

Use these prompts to generate components and pages quickly.

---

# Generate Homepage

Prompt:

Generate the complete HomePage using the defined project architecture.

Requirements:
- Use HeroSection
- Include all homepage sections in correct order
- Fetch limited API data
- Use card grid layout
- Use reusable components

Sections to generate:

HeroSection  
AboutSection  
QuickFacts  
NewsSection  
EventsSection  
ProgramsSection  
DepartmentsSection  
CampusLifeSection  
ResearchSection  
PlacementSection  
GallerySection  
AlumniSection  

---

# Generate Navbar

Prompt:

Generate the Header component including:

TopBar
Navbar with dropdown menus

Navbar structure must follow the hierarchy defined in CLAUDE.md.

Include:

Academics  
Admissions  
Accreditations  
Campus Life  
About  
Research  
News & Events  

---

# Generate News Section

Prompt:

Generate the NewsSection component.

Requirements:

Fetch data from `/api/news?limit=5`

Display news in a 4-column card grid layout.

Use:

NewsCard component  
SectionContainer  
SectionTitle  
GridLayout  

Include a ReadMoreButton that navigates to `/news`.

---

# Generate Events Section

Prompt:

Generate the EventsSection component.

Requirements:

Fetch data from `/api/events?limit=5`.

Display event cards in a grid layout.

Use EventCard components.

Include ReadMoreButton linking to `/events`.

---

# Generate Gallery Section

Prompt:

Generate the GallerySection component.

Requirements:

Fetch images from `/api/gallery?limit=6`.

Display image grid.

Use GalleryCard component.

Include ReadMoreButton linking to `/gallery`.

---

# Generate Research Section

Prompt:

Generate ResearchSection.

Requirements:

Fetch data from `/api/research?limit=3`.

Display research highlights as cards.

Include ReadMoreButton linking to `/research`.

---

# Generate Placement Section

Prompt:

Generate PlacementSection.

Requirements:

Fetch placement data from `/api/placements?limit=3`.

Display cards showing company, package, and student name.

Include ReadMoreButton linking to `/placements`.

---

# Generate News Page

Prompt:

Generate the NewsPage component.

Requirements:

Fetch all news from `/api/news`.

Display cards using NewsCard.

Include pagination if necessary.

Layout:

Header  
Page Title  
GridLayout  
NewsCard list  
Footer  

---

# Generate Events Page

Prompt:

Generate the EventsPage component.

Requirements:

Fetch events from `/api/events`.

Display event cards in a responsive grid layout.

---

# Generate Gallery Page

Prompt:

Generate GalleryPage.

Requirements:

Fetch gallery images from `/api/gallery`.

Display responsive image grid.

---

# Generate Departments Page

Prompt:

Generate DepartmentsPage.

Requirements:

Fetch data from `/api/departments`.

Display department cards.

---

# Generate Programs Page

Prompt:

Generate ProgramsPage.

Requirements:

Fetch data from `/api/programs`.

Display program cards.

---

# Generate Footer

Prompt:

Generate Footer component.

Include:

Address  
Contact information  
Quick links  
Social media icons  

Use multi-column layout.