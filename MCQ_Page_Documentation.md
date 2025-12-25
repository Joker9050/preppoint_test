# MCQ Page Implementation Documentation

## Overview
The MCQ (Multiple Choice Question) page provides an interactive quiz interface for users to practice questions organized by topics and subtopics. The implementation follows a W3Schools-style layout with a sidebar navigation and main content area.

## Architecture

### File Structure
```
lib/mcqs.js                    # MCQ data and topic structure
components/
├── HeaderMcq.jsx             # Header component with branding (not used in final implementation)
├── SidebarMcq.jsx            # Navigation sidebar for topics/subtopics
├── McqCard.jsx               # Individual question display component
├── Navigation.jsx            # Previous/Next navigation controls
├── Navbar.jsx                # Main website navigation (integrated)
└── Footer.jsx                # Main website footer (integrated)
pages/mcq.js                  # Main MCQ page component
```

### Data Structure

#### MCQ Object Format
```javascript
{
  id: 1,
  topic_id: 1,
  subtopic_id: null,
  question: "What is the output of typeof null?",
  question_code: "",
  question_image: "",
  options: {
    A: { text: "null", code: "", image: "" },
    B: { text: "object", code: "", image: "" },
    C: { text: "undefined", code: "", image: "" },
    D: { text: "number", code: "", image: "" }
  },
  correct_option: "B",
  explanation: "This is a long-standing JavaScript bug. typeof null returns 'object'."
}
```

#### Topic Structure
```javascript
{
  id: 1,
  name: "JavaScript",
  subtopics: [
    { id: 2, name: "Variables" },
    { id: 3, name: "Data Types" }
  ]
}
```

## Components

### HeaderMcq
- **Purpose**: Displays the application branding and title
- **Styling**: Blue background header with white text
- **Height**: Fixed 14 units (h-14)

### SidebarMcq
- **Purpose**: Provides navigation for topics and subtopics
- **Functionality**:
  - Displays topics with expandable subtopics
  - Clicking topic filters questions by topic_id
  - Clicking subtopic filters questions by subtopic_id
- **Styling**: Gray background with blue accent for topic names

### McqCard
- **Purpose**: Displays individual MCQ with options and explanation
- **Features**:
  - Shows question text
  - Renders multiple choice options (A, B, C, D)
  - Toggle explanation visibility
  - Highlights correct answer when explanation is shown
- **State**: `showExplanation` boolean to control explanation display

### Navigation
- **Purpose**: Provides Previous/Next question navigation
- **Props**:
  - `index`: Current question index
  - `total`: Total number of questions
  - `onPrev`: Previous question handler
  - `onNext`: Next question handler
- **Features**: Disables buttons at boundaries

### Main MCQ Page
- **Purpose**: Orchestrates the entire MCQ interface
- **State Management**:
  - `filtered`: Array of filtered questions based on selection
  - `index`: Current question index (0-based)
- **Filtering Logic**:
  - Topic selection: `mcqs.filter(m => m.topic_id === id)`
  - Subtopic selection: `mcqs.filter(m => m.subtopic_id === id)`

## Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Website Navbar (integrated)                     │
├─────────────────────────────────────────────────┤
│ Main Content Area (bg-gray-50)                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Page Title: "MCQ Practice"                 │ │
│ └─────────────────────────────────────────────┘ │
│ ┌─────────────────┬───────────────────────────┐ │
│ │ SidebarMcq      │ Main Question Area        │ │
│ │ (lg:w-80, gray) │ (flex-1, white bg)        │ │
│ │                 │ ┌───────────────────────┐ │ │
│ │ Topics          │ │ Navigation (top)     │ │ │
│ │ ▶ JavaScript    │ └───────────────────────┘ │ │
│ │   Variables     │ ┌───────────────────────┐ │ │
│ │   Data Types    │ │ McqCard               │ │ │
│ │                 │ │ Question + Options    │ │ │
│ │                 │ │ Show Explanation      │ │ │
│ │                 │ └───────────────────────┘ │ │
│ │                 │ ┌───────────────────────┐ │ │
│ │                 │ │ Navigation (bottom)  │ │ │
│ │                 │ └───────────────────────┘ │ │
│ └─────────────────┴───────────────────────────┘ │
└─────────────────────────────────────────────────┤
│ Website Footer (integrated)                     │
└─────────────────────────────────────────────────┘
```

### Responsive Behavior
- **Desktop (lg+)**: Sidebar and main content side-by-side
- **Mobile (<lg)**: Sidebar stacks above main content
- **Container**: Max width 7xl with responsive padding
- **Background**: Gray-50 for main area, white cards for content

## How It Works

### 1. Initial Load
- Page loads with all MCQs displayed (`filtered = mcqs`)
- First question shown (`index = 0`)
- Sidebar shows all available topics

### 2. Topic/Subtopic Selection
- User clicks topic → `handleSelect("topic", topicId)`
- Questions filtered by `topic_id`
- Index resets to 0
- User clicks subtopic → `handleSelect("subtopic", subtopicId)`
- Questions filtered by `subtopic_id`
- Index resets to 0

### 3. Question Navigation
- Previous/Next buttons update `index` state
- Navigation components receive current index and total count
- Buttons disabled at boundaries (first/last question)

### 4. Question Interaction
- User can select radio button options (UI only, no state tracking yet)
- "Show Explanation" toggles explanation visibility
- Correct answer highlighted in green when explanation shown

### 5. Responsive Design
- Layout uses flexbox for responsive behavior
- Sidebar has fixed width (w-72)
- Main content takes remaining space (flex-1)
- Overflow handled with scrollbars

## Future Enhancements

### Planned Features
1. **Answer Tracking**: Store user selections and calculate scores
2. **Progress Tracking**: Show completion status across topics
3. **Results Page**: Display quiz results with detailed analysis
4. **Timer Functionality**: Add time limits for questions/practice sessions
5. **Bookmarking**: Allow users to save favorite questions
6. **Search**: Add search functionality across questions

### Technical Improvements
1. **State Persistence**: Save progress in localStorage/sessionStorage
2. **API Integration**: Replace static data with dynamic API calls
3. **Performance**: Implement virtualization for large question sets
4. **Accessibility**: Add ARIA labels and keyboard navigation
5. **Analytics**: Track user performance and learning patterns

## Integration Notes

### With Existing Project
- Uses Next.js pages router (`pages/mcq.js`)
- Compatible with existing Tailwind CSS setup
- Follows project's component naming conventions
- Integrates with existing authentication (if needed)

### Dependencies
- React (useState for component state)
- Next.js (for routing and page structure)
- Tailwind CSS (for styling)

This implementation provides a solid foundation for an MCQ practice platform with room for expansion and feature additions.
