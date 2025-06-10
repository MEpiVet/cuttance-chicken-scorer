// Scoring thresholds based on Heidi's system
const SCORING_THRESHOLDS = {
    housing: {
        max: 20,
        good: { min: 17, max: 20 },
        medium: { min: 11, max: 16 },
        needsImprovement: { min: 8, max: 10 }
    },
    feed: {
        max: 33,
        good: { min: 28, max: 33 },
        medium: { min: 17, max: 27 },
        needsImprovement: { min: 12, max: 16 }
    },
    enrichment: {
        max: 22,
        good: { min: 18, max: 22 },
        medium: { min: 11, max: 17 },
        needsImprovement: { min: 7, max: 10 }
    },
    total: {
        max: 75,
        good: { min: 63, max: 75 },
        medium: { min: 37, max: 62 },
        needsImprovement: { min: 25, max: 36 }
    }
};

// Placeholder questions - Heidi will replace these with her actual questions
const QUESTIONS = {
    housing: [
        {
            question: "How much space do your chickens have in their coop?",
            options: [
                { text: "More than 4 square feet per bird", points: 5 },
                { text: "2-4 square feet per bird", points: 3 },
                { text: "Less than 2 square feet per bird", points: 2 }
            ]
        },
        {
            question: "How often do you clean the chicken coop?",
            options: [
                { text: "Weekly or more often", points: 5 },
                { text: "Every 2-3 weeks", points: 3 },
                { text: "Monthly or less often", points: 2 }
            ]
        },
        {
            question: "Do your chickens have access to an outdoor run?",
            options: [
                { text: "Yes, a large secure run they can access daily", points: 5 },
                { text: "Yes, but it's small or they have limited access", points: 3 },
                { text: "No outdoor access", points: 2 }
            ]
        },
        {
            question: "How is the ventilation in your chicken coop?",
            options: [
                { text: "Excellent - multiple vents, no ammonia smell", points: 5 },
                { text: "Good - some ventilation, occasional smell", points: 3 },
                { text: "Poor - stuffy or strong ammonia smell", points: 1 }
            ]
        }
    ],
    feed: [
        {
            question: "What type of feed do you give your chickens?",
            options: [
                { text: "High-quality layer feed appropriate for their age", points: 8 },
                { text: "Basic chicken feed from the store", points: 5 },
                { text: "Mostly scraps or mixed grains", points: 3 }
            ]
        },
        {
            question: "How often do you provide fresh water?",
            options: [
                { text: "Fresh water available 24/7, changed daily", points: 8 },
                { text: "Fresh water most of the time", points: 5 },
                { text: "Water sometimes runs out or gets dirty", points: 3 }
            ]
        },
        {
            question: "Do you provide grit for your chickens?",
            options: [
                { text: "Yes, always available", points: 8 },
                { text: "Sometimes", points: 5 },
                { text: "No or don't know what grit is", points: 3 }
            ]
        },
        {
            question: "Do you give your chickens treats or supplements?",
            options: [
                { text: "Yes, healthy treats in moderation (vegetables, mealworms)", points: 9 },
                { text: "Occasional treats", points: 6 },
                { text: "No treats or too many unhealthy treats", points: 3 }
            ]
        }
    ],
    enrichment: [
        {
            question: "What enrichment items do your chickens have?",
            options: [
                { text: "Multiple perches, dust bath area, and toys", points: 7 },
                { text: "Some perches or a dust bath area", points: 5 },
                { text: "No special enrichment items", points: 2 }
            ]
        },
        {
            question: "How much time do chickens spend outside the coop?",
            options: [
                { text: "Most of the day when weather permits", points: 8 },
                { text: "A few hours a day", points: 5 },
                { text: "Rarely or never", points: 2 }
            ]
        },
        {
            question: "Do you interact with your chickens?",
            options: [
                { text: "Daily - they're friendly and come when called", points: 7 },
                { text: "Sometimes - when feeding or collecting eggs", points: 4 },
                { text: "Rarely - they're afraid of people", points: 2 }
            ]
        }
    ]
};

// Fun facts about chickens
const FUN_FACTS = [
    "Chickens can remember over 100 different faces of people or animals!",
    "Chickens have full-color vision, just like humans!",
    "Chickens can run up to 9 miles per hour!",
    "Mother hens talk to their chicks while they're still in the eggs!",
    "Chickens have their own unique language with over 30 different sounds!",
    "Chickens love to play and can even be taught tricks!",
    "Chickens dream when they sleep, just like humans do!",
    "The oldest known chicken lived to 16 years old!",
    "Chickens are descendants of dinosaurs - specifically the T-Rex!",
    "Chickens can see ultraviolet light that humans can't see!"
];

// Quiz state
let currentQuestionIndex = 0;
let currentCategory = 'housing';
let answers = {
    housing: [],
    feed: [],
    enrichment: []
};
let allQuestions = [];

// Initialize quiz
function initializeQuiz() {
    // Flatten all questions into a single array with category info
    allQuestions = [];
    Object.keys(QUESTIONS).forEach(category => {
        QUESTIONS[category].forEach((q, index) => {
            allQuestions.push({
                ...q,
                category: category,
                categoryIndex: index
            });
        });
    });
}

// Start the quiz
function startQuiz() {
    initializeQuiz();
    currentQuestionIndex = 0;
    answers = {
        housing: [],
        feed: [],
        enrichment: []
    };
    
    // Show quiz screen
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById('quiz-screen').classList.add('active');
    
    // Display first question
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = allQuestions[currentQuestionIndex];
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `Question ${currentQuestionIndex + 1} of ${allQuestions.length}`;
    
    // Update category indicator
    const categoryNames = {
        housing: '🏠 Housing',
        feed: '🌾 Feed',
        enrichment: '🎮 Enrichment'
    };
    document.getElementById('category-indicator').textContent = categoryNames[question.category];
    
    // Display question
    document.getElementById('question-text').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option.text;
        optionDiv.onclick = () => selectOption(index);
        
        // Check if this option was previously selected
        const previousAnswer = answers[question.category][question.categoryIndex];
        if (previousAnswer === index) {
            optionDiv.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').disabled = answers[question.category][question.categoryIndex] === undefined;
}

// Handle option selection
function selectOption(optionIndex) {
    const question = allQuestions[currentQuestionIndex];
    
    // Store answer
    answers[question.category][question.categoryIndex] = optionIndex;
    
    // Update UI
    document.querySelectorAll('.option').forEach((opt, idx) => {
        opt.classList.toggle('selected', idx === optionIndex);
    });
    
    // Enable next button
    document.getElementById('next-btn').disabled = false;
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestionIndex < allQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // Quiz complete - show results
        showResults();
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Calculate scores and show results
function showResults() {
    // Calculate scores for each category
    const scores = {
        housing: 0,
        feed: 0,
        enrichment: 0
    };
    
    // Calculate category scores
    Object.keys(answers).forEach(category => {
        answers[category].forEach((answerIndex, questionIndex) => {
            if (answerIndex !== undefined) {
                scores[category] += QUESTIONS[category][questionIndex].options[answerIndex].points;
            }
        });
    });
    
    // Calculate total score
    const totalScore = scores.housing + scores.feed + scores.enrichment;
    
    // Show results screen
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById('results-screen').classList.add('active');
    
    // Display total score
    document.getElementById('total-score').textContent = totalScore;
    
    // Determine overall rating
    const overallRating = getRating(totalScore, 'total');
    const ratingElement = document.getElementById('overall-rating');
    ratingElement.textContent = overallRating;
    ratingElement.className = 'rating ' + overallRating.toLowerCase().replace(' ', '-');
    
    // Update score circle color
    const scoreCircle = document.getElementById('score-circle');
    if (overallRating === 'Good') {
        scoreCircle.style.borderColor = 'var(--good-color)';
    } else if (overallRating === 'Medium') {
        scoreCircle.style.borderColor = 'var(--medium-color)';
    } else {
        scoreCircle.style.borderColor = 'var(--needs-improvement-color)';
    }
    
    // Display category scores
    Object.keys(scores).forEach(category => {
        document.getElementById(`${category}-score`).textContent = scores[category];
        const rating = getRating(scores[category], category);
        const ratingElement = document.getElementById(`${category}-rating`);
        ratingElement.textContent = rating;
        ratingElement.className = 'category-rating ' + rating.toLowerCase().replace(' ', '-');
    });
    
    // Generate recommendations
    generateRecommendations(scores);
    
    // Display random fun fact
    const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
    document.getElementById('fun-fact-text').textContent = randomFact;
}

// Get rating based on score and category
function getRating(score, category) {
    const thresholds = SCORING_THRESHOLDS[category];
    
    if (score >= thresholds.good.min) {
        return 'Good';
    } else if (score >= thresholds.medium.min) {
        return 'Medium';
    } else {
        return 'Needs Improvement';
    }
}

// Generate recommendations based on scores
function generateRecommendations(scores) {
    const recommendations = [];
    
    // Check each category
    Object.keys(scores).forEach(category => {
        const rating = getRating(scores[category], category);
        
        if (rating === 'Needs Improvement') {
            if (category === 'housing') {
                recommendations.push('Consider giving your chickens more space and improving coop ventilation');
                recommendations.push('Clean the coop more frequently to keep chickens healthy');
            } else if (category === 'feed') {
                recommendations.push('Upgrade to high-quality layer feed appropriate for your chickens\' age');
                recommendations.push('Ensure fresh water is always available');
            } else if (category === 'enrichment') {
                recommendations.push('Add perches, dust bath areas, and toys to keep chickens entertained');
                recommendations.push('Spend more time interacting with your chickens');
            }
        } else if (rating === 'Medium') {
            if (category === 'housing') {
                recommendations.push('Consider expanding the outdoor run area');
            } else if (category === 'feed') {
                recommendations.push('Add healthy treats like vegetables to their diet');
            } else if (category === 'enrichment') {
                recommendations.push('Try adding new enrichment items to prevent boredom');
            }
        }
    });
    
    // Display recommendations
    const recommendationsContent = document.getElementById('recommendations-content');
    if (recommendations.length === 0) {
        recommendationsContent.innerHTML = '<p>Excellent work! You\'re doing a great job caring for your chickens! Keep up the good work!</p>';
    } else {
        recommendationsContent.innerHTML = '<ul>' + 
            recommendations.map(rec => `<li>${rec}</li>`).join('') + 
            '</ul>';
    }
}

// Print results
function printResults() {
    window.print();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Any initialization code here
});
