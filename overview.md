# Chicken Husbandry Assessment Tool - Project Overview

## Project Description
A simple, educational web application for assessing chicken husbandry practices. This tool was created for Heidi's science project to help chicken owners evaluate their care practices across three key areas: Housing, Feed, and Enrichment.

## Purpose
- Provide an interactive questionnaire for chicken owners
- Generate instant scores and feedback
- Educational tool to promote good chicken care practices
- Simple enough for a young scientist to understand and modify

## Technical Stack
- **Frontend**: HTML, CSS, JavaScript (vanilla - no frameworks)
- **Hosting**: Netlify (free, static site hosting)
- **Database**: None needed - all logic client-side
- **Build Tools**: None - keeps it simple

## Scoring System

### Categories and Point Distribution

#### Housing (Maximum: 20 points)
- **Good**: 17-20 points
- **Medium**: 11-16 points
- **Needs Improvement**: 8-10 points

#### Feed (Maximum: 33 points)
- **Good**: 28-33 points
- **Medium**: 17-27 points
- **Needs Improvement**: 12-16 points

#### Enrichment (Maximum: 22 points)
- **Good**: 18-22 points
- **Medium**: 11-17 points
- **Needs Improvement**: 7-10 points

#### Total Score (Maximum: 75 points)
- **Good**: 63-75 points (84-100%)
- **Medium**: 37-62 points (49-83%)
- **Needs Improvement**: 25-36 points (33-48%)

## File Structure
```
Chickens_Heidi/
├── overview.md          # This file
├── index.html          # Main application page
├── style.css           # Styling (colors, layout, fun chicken theme)
├── script.js           # Quiz logic and scoring calculations
├── images/             # Chicken graphics and icons (optional)
│   ├── chicken-good.png
│   ├── chicken-medium.png
│   └── chicken-needs-improvement.png
├── netlify.toml        # Netlify configuration (optional)
└── README.md           # Simple instructions for Heidi
```

## Application Features

### 1. Question Interface
- Clean, single-page design
- Questions organized by category (Housing, Feed, Enrichment)
- Multiple choice format with radio buttons
- Progress indicator showing completion
- Fun, colorful design with chicken graphics

### 2. Scoring Logic
```javascript
// Example structure for questions (placeholders)
const questions = {
  housing: [
    {
      question: "How much space does each chicken have?",
      options: [
        { text: "More than 4 sq ft per bird", points: 5 },
        { text: "2-4 sq ft per bird", points: 3 },
        { text: "Less than 2 sq ft per bird", points: 1 }
      ]
    },
    // Add more housing questions here
  ],
  feed: [
    // Feed questions here
  ],
  enrichment: [
    // Enrichment questions here
  ]
};
```

### 3. Results Display
- Overall score with percentage
- Category breakdown with individual scores
- Visual rating (Good/Medium/Needs Improvement)
- Specific recommendations based on weak areas
- Option to print or save results

### 4. Educational Components
- Tips appear after each section
- Links to resources about chicken care
- Fun facts about chickens
- Suggestions for improvement in weak areas

## User Flow
1. Welcome screen with brief instructions
2. Questions presented one category at a time
3. Real-time score calculation (hidden from user during quiz)
4. Results page with detailed breakdown
5. Option to retake quiz or print certificate

## Deployment Instructions

### Netlify Deployment
This is already done but this is what you could do for future websites/apps

1. Create a free Netlify account
2. Drag and drop the project folder to Netlify
3. Site automatically deploys with a URL like: https://chickens-heidi.netlify.app
4. Optional: Connect to GitHub for automatic updates

### Local Testing
1. Open index.html in any web browser
2. No server required - works directly from file system
3. Test all questions and scoring logic
4. Verify results display correctly

## Customization Guide for Heidi

### Adding/Modifying Questions
1. Open `script.js`
2. Find the `questions` object
3. Add new questions following the template:
```javascript
{
  question: "Your question here?",
  options: [
    { text: "Best answer", points: 5 },
    { text: "Medium answer", points: 3 },
    { text: "Poor answer", points: 1 }
  ]
}
```

### Changing Scoring Thresholds
1. Find the `scoringThresholds` object in `script.js`
2. Modify the numbers to adjust when someone gets "Good" vs "Medium" ratings

### Styling Changes
1. Open `style.css`
2. Change colors in the `:root` section
3. Modify fonts, sizes, or add new chicken graphics

## Future Enhancement Ideas
- Add more question types (checkboxes, text input)
- Create a backend to save results
- Add more detailed analytics
- Multiple language support
- Share results on social media
- Gamification elements (badges, achievements)

## Resources
- [Basic HTML/CSS/JS Tutorial](https://www.w3schools.com/)

## Contact
Created for Heidi's Science Project
[Date: June 2024]
