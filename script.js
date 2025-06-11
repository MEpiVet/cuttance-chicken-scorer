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

// Survey Questions - Version 2 (simplified for easy editing)
const QUESTIONS = {
    housing: [
        {
            question: "How often do you clean your coop?",
            options: [
                { text: "Daily", points: 3 },
                { text: "Weekly", points: 3 },
                { text: "Monthly", points: 2 },
                { text: "Never", points: 1 }
            ]
        },
        {
            question: "How many chickens do you have?",
            type: "number",
            inputId: "numChickens",
            placeholder: "Enter number of chickens"
        },
        {
            question: "What is the total floor area of your coop in square metres?",
            type: "number",
            inputId: "coopSize",
            placeholder: "Enter size in m²",
            step: "0.1"
        },
        {
            question: "What type of bedding do you have?",
            options: [
                { text: "Hay", points: 2 },
                { text: "Shavings", points: 2 },
                { text: "Nothing", points: 1 }
            ]
        },
        {
            question: "Does your coop have roosting bars?",
            options: [
                { text: "Yes", points: 2 },
                { text: "No", points: 1 }
            ]
        },
        {
            question: "Does your coop leak?",
            options: [
                { text: "No", points: 3 },
                { text: "Sometimes", points: 2 },
                { text: "Yes", points: 1 }
            ]
        },
        {
            question: "What is your coop made out of?",
            options: [
                { text: "Wood", points: 3 },
                { text: "Steel", points: 3 },
                { text: "Tin", points: 2 },
                { text: "Cardboard", points: 1 }
            ]
        },
        {
            question: "Are your chickens confined to a coop?",
            options: [
                { text: "No", points: 3 },
                { text: "Partially", points: 2 },
                { text: "Yes", points: 1 }
            ]
        }
    ],
    feed: [
        {
            question: "How often do you feed your chickens?",
            options: [
                { text: "Daily", points: 3 },
                { text: "Ad lib", points: 3 },
                { text: "Every few days", points: 2 },
                { text: "Weekly", points: 1 }
            ]
        },
        {
            question: "How much food do you give them?",
            options: [
                { text: "Ad lib", points: 3 },
                { text: "Half a bucket", points: 2 },
                { text: "A bucket", points: 2 },
                { text: "A handful", points: 1 }
            ]
        },
        {
            question: "How often do you give your chickens scraps?",
            options: [
                { text: "Every few days", points: 3 },
                { text: "Daily", points: 2 },
                { text: "Weekly", points: 2 },
                { text: "Not often", points: 1 },
                { text: "Never", points: 1 }
            ]
        },
        {
            question: "Do your chickens have access to food from dawn until dusk?",
            options: [
                { text: "Yes", points: 3 },
                { text: "Sometimes", points: 2 },
                { text: "No", points: 1 }
            ]
        },
        {
            question: "How often do you give your chickens grit?",
            options: [
                { text: "Daily", points: 3 },
                { text: "Sometimes", points: 2 },
                { text: "Never", points: 1 }
            ]
        },
        {
            question: "Do you give your chickens a grain mix?",
            options: [
                { text: "No", points: 3 },
                { text: "Sometimes", points: 2 },
                { text: "Yes", points: 1 }
            ]
        },
        {
            question: "How many feeding spots do they have?",
            options: [
                { text: "5+", points: 3 },
                { text: "3-4", points: 2 },
                { text: "1-2", points: 1 }
            ]
        },
        {
            question: "Where do you put your feed?",
            options: [
                { text: "Pecking blocks", points: 3 },
                { text: "Feeders", points: 3 },
                { text: "On the ground", points: 1 }
            ]
        },
        {
            question: "How do your chickens get water?",
            options: [
                { text: "Automatic water trough", points: 3 },
                { text: "Hand trough", points: 2 }
            ]
        },
        {
            question: "How often do you clean your water trough?",
            options: [
                { text: "Weekly", points: 3 },
                { text: "Monthly", points: 2 },
                { text: "3-4 times a year", points: 1 }
            ]
        }
    ],
    enrichment: [
        {
            question: "Do you have nesting boxes for your chickens?",
            options: [
                { text: "Yes", points: 3 },
                { text: "Sometimes", points: 2 },
                { text: "No", points: 1 }
            ]
        },
        {
            question: "Do your chickens have access to a dust bath area?",
            options: [
                { text: "Yes", points: 3 },
                { text: "Sometimes", points: 2 },
                { text: "No", points: 1 }
            ]
        },
        {
            question: "Do you think your chickens have enough space to show their natural behaviours?",
            options: [
                { text: "Yes", points: 3 },
                { text: "Could be improved", points: 2 },
                { text: "No", points: 1 },
                { text: "I don't know", points: 1 }
            ]
        },
        {
            question: "Are there trees in your chicken area that they can access for shade/perching?",
            options: [
                { text: "Yes", points: 3 },
                { text: "Sometimes", points: 2 },
                { text: "No", points: 1 }
            ]
        },
        {
            question: "Do your chickens live with other chickens?",
            options: [
                { text: "Yes", points: 3 },
                { text: "Sometimes", points: 2 },
                { text: "No", points: 1 }
            ]
        },
        {
            question: "How often do your chickens see people?",
            options: [
                { text: "Daily", points: 3 },
                { text: "Weekly", points: 2 },
                { text: "Never", points: 1 }
            ]
        },
        {
            question: "What do you do if you have a sick chicken?",
            options: [
                { text: "Separate and monitor", points: 3 },
                { text: "Check on it now and then", points: 2 },
                { text: "Let it die", points: 1 }
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
    
    // Display options or input
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    if (question.type === 'number') {
        // Create number input
        const inputDiv = document.createElement('div');
        inputDiv.className = 'number-input-container';
        
        const input = document.createElement('input');
        input.type = 'number';
        input.id = question.inputId;
        input.placeholder = question.placeholder;
        if (question.step) input.step = question.step;
        input.onchange = () => handleNumberInput(question.inputId);
        
        // Set previous value if exists
        const previousAnswer = answers[question.category][question.categoryIndex];
        if (previousAnswer !== undefined) {
            input.value = previousAnswer;
        }
        
        inputDiv.appendChild(input);
        optionsContainer.appendChild(inputDiv);
        
    } else {
        // Display multiple choice options
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
    }
    
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

// Handle number input
function handleNumberInput(inputId) {
    const question = allQuestions[currentQuestionIndex];
    const input = document.getElementById(inputId);
    const value = parseFloat(input.value);
    
    if (value && value > 0) {
        // Store the number value
        answers[question.category][question.categoryIndex] = value;
        
        // Enable next button
        document.getElementById('next-btn').disabled = false;
    } else {
        // Disable next button if invalid input
        document.getElementById('next-btn').disabled = true;
    }
}

// Calculate birds per square metre score
function calculateBirdsPerSqMScore() {
    const numChickens = answers.housing[1]; // Position of chicken count question
    const coopSize = answers.housing[2]; // Position of coop size question
    
    if (!numChickens || !coopSize || coopSize <= 0) {
        return 1; // Default low score if missing data
    }
    
    const birdsPerSqM = numChickens / coopSize;
    
    // Scoring based on birds per square metre (lower density = better score)
    if (birdsPerSqM <= 4) {
        return 5; // Excellent density
    } else if (birdsPerSqM <= 6) {
        return 3; // Good density
    } else if (birdsPerSqM <= 8) {
        return 2; // Acceptable density
    } else {
        return 1; // Poor density (overcrowded)
    }
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
        answers[category].forEach((answer, questionIndex) => {
            if (answer !== undefined) {
                const question = QUESTIONS[category][questionIndex];
                if (question.type === 'number') {
                    // Handle number inputs - no direct scoring, will be calculated separately
                    // Skip for now, birds per sq m will be added below
                } else {
                    // Handle multiple choice questions
                    scores[category] += question.options[answer].points;
                }
            }
        });
    });
    
    // Add calculated birds per square metre score to housing
    scores.housing += calculateBirdsPerSqMScore();
    
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
