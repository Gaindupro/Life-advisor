// Problems Database for different age categories
const problemsDatabase = {
    "10-20": [ "School Pressure", "Peer Pressure", "Career Confusion", "Bullying/Harassment", "Social Media Impact", "Family Expectations", "Personal Identity", "Financial Dependence", "Relationship Challenges", "Mental Health Struggles" ],
    "21-30": [ "Job Stress", "Relationship Issues", "Financial Instability", "Unclear Career Direction", "Social Pressure", "Work-Life Balance", "Self-Doubt", "Mental Health Struggles", "Family Planning", "Health Issues" ],
    "31-40": [ "Mid-Career Crisis", "Parenting Stress", "Health Concerns", "Financial Pressure", "Divorce/Separation", "Workplace Competition", "Social Isolation", "Loss of Motivation", "Caring for Aging Parents", "Mental Health Struggles" ],
    "41-50": [ "Career Transition", "Aging and Health", "Empty Nest Syndrome", "Financial Crisis", "Divorce or Separation", "Loss of Loved Ones", "Regret or Unmet Expectations", "Workplace Changes", "Mental Health Struggles", "Social Disconnect" ],
    "51+": [ "Retirement Planning", "Health Decline", "Empty Nest Syndrome", "Loss of Purpose", "Loneliness", "Caregiver Responsibilities", "Financial Insecurity", "Death of Loved Ones", "Memory and Cognitive Decline", "Mental Health Struggles" ]
};

const maritalStatusProblems = {
    "Married": [ "Balancing work and family life", "Managing family finances", "Communication and conflict resolution with spouse", "Raising children", "Dealing with in-laws", "Supporting spouse's goals", "Maintaining intimacy", "Navigating financial responsibilities" ],
    "Single": [ "Social pressure about relationships", "Loneliness", "Building friendships", "Self-growth and career focus", "Family expectations", "Mental health maintenance", "Financial independence" ]
};

const motivationalQuotes = [
    "Believe you can and you're halfway there.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The future depends on what you do today.",
    "Don't watch the clock; do what it does. Keep going.",
    "It always seems impossible until it's done.",
    "Your only limit is your mind.",
    "Push yourself, because no one else is going to do it for you."
];

// Life milestones database
const milestonesDatabase = {
    "10-20": [
        { icon: '🎓', title: 'Finish High School', description: 'Graduate and plan your next move.' },
        { icon: '💻', title: 'Discover Passion', description: 'Explore your talents and interests.' }
    ],
    "21-30": [
        { icon: '💼', title: 'Start Career', description: 'Begin building your dream career.' },
        { icon: '💍', title: 'Personal Relationships', description: 'Nurture meaningful relationships.' }
    ],
    "31-40": [
        { icon: '🏡', title: 'Settle Down', description: 'Focus on family, home, and career stability.' },
        { icon: '🚀', title: 'Achieve Growth', description: 'Advance your career and personal life.' }
    ],
    "41-50": [
        { icon: '🧘‍♂️', title: 'Self-Reflection', description: 'Reflect and adapt to life changes.' },
        { icon: '🌟', title: 'Leadership', description: 'Mentor and lead others.' }
    ],
    "51+": [
        { icon: '🏖️', title: 'Enjoy Retirement', description: 'Focus on hobbies and family.' },
        { icon: '🌎', title: 'Travel and Explore', description: 'Explore new places and cultures.' }
    ]
};

// Event Listener
document.getElementById("biodataForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Show loader
    document.getElementById("loader").style.display = "block";
    document.getElementById("results").style.display = "none";

    // Gather form data
    const name = document.getElementById("name").value.trim();
    const ageCategory = document.getElementById("ageCategory").value;
    const bio = document.getElementById("bio").value.toLowerCase();
    const address = document.getElementById("address").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const profession = document.getElementById("profession").value.trim();
    const schoolOrCampus = document.getElementById("schoolOrCampus").value.trim();
    const parentsDetails = document.getElementById("parentsDetails").value.trim();
    const maritalStatus = document.getElementById("maritalStatus").value;

    // Analyze problems
    let problems = problemsDatabase[ageCategory] || [];
    if (maritalStatusProblems[maritalStatus]) {
        problems = problems.concat(maritalStatusProblems[maritalStatus]);
    }

    // Analyze extra advice
    let extraAdvice = [];
    if (bio.includes("study") || bio.includes("school")) extraAdvice.push("Focus on time management to reduce study stress.");
    if (bio.includes("work") || bio.includes("career")) extraAdvice.push("Build strong skills to succeed in your career.");
    if (bio.includes("health") || bio.includes("exercise")) extraAdvice.push("Keep maintaining your health — it's your true wealth!");
    if (bio.includes("relationship") || bio.includes("love")) extraAdvice.push("Healthy relationships need communication and trust.");
    if (profession.toLowerCase().includes("engineer")) extraAdvice.push("As an engineer, focus on innovation and leadership.");

    // Prepare milestones
    const milestones = milestonesDatabase[ageCategory] || [];

    // Random motivational quote
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

    // Results container
    const resultsDiv = document.getElementById("results");

    // After processing
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        resultsDiv.style.display = "block";

        // Clear previous content
        resultsDiv.innerHTML = "";

        // Greeting
        resultsDiv.innerHTML += `<h2>Hello ${name}!</h2>`;

        // Life Problems
        resultsDiv.innerHTML += `
            <h3>Possible Life Challenges:</h3>
            <ul>${problems.map(problem => `<li>${problem}</li>`).join('')}</ul>
        `;

        // Extra Advice
        if (extraAdvice.length > 0) {
            resultsDiv.innerHTML += `
                <h3>Additional Advice:</h3>
                <ul>${extraAdvice.map(advice => `<li>${advice}</li>`).join('')}</ul>
            `;
        }

        // Milestones
        if (milestones.length > 0) {
            resultsDiv.innerHTML += `<h3>Your Future Milestones:</h3>`;
            const milestonesContainer = document.createElement('div');
            milestonesContainer.classList.add('milestones-container');

            milestones.forEach(milestone => {
                const card = document.createElement('div');
                card.classList.add('milestone-card');
                card.innerHTML = `
                    <div class="icon">${milestone.icon}</div>
                    <h4>${milestone.title}</h4>
                    <p>${milestone.description}</p>
                `;
                milestonesContainer.appendChild(card);
            });

            resultsDiv.appendChild(milestonesContainer);
        }

        // Motivational Quote
        resultsDiv.innerHTML += `<hr><p><em>"${randomQuote}"</em></p>`;

        // Enable Download and Sharing Buttons
        document.getElementById("downloadBtn").style.display = "inline-block";
        document.getElementById("whatsappBtn").style.display = "inline-block";
        document.getElementById("facebookBtn").style.display = "inline-block";

        // Download PDF
        document.getElementById("downloadBtn").onclick = function() {
            html2pdf().from(resultsDiv).save('MyLifeAdvice.pdf');
        };

        // Share on WhatsApp
        document.getElementById("whatsappBtn").onclick = function() {
            const message = `Life Advisor Prediction for ${name}:\nPossible Problems: ${problems.join(", ")}\nAdvice: ${extraAdvice.join(", ")}\nQuote: "${randomQuote}"`;
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, "_blank");
        };

        // Share on Facebook
        document.getElementById("facebookBtn").onclick = function() {
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com&quote=${encodeURIComponent(`Life Advisor Prediction for ${name}: Possible Problems: ${problems.join(", ")}. Quote: "${randomQuote}"`)}`;
            window.open(facebookUrl, "_blank");
        };



    }, 2000); // Loader delay
});
