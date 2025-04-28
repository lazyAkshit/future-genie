// script.js (Akshit's part)
// AI Integration Setup and Chat functionality

// DOM Elements
const chatInterface = document.getElementById('chatInterface');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
const clearChatButton = document.getElementById('clearChatButton');

// Global variables and constants
const apiKey = 'AIzaSyDcYtRhFRat81-Qj5hhBLB_zU_5jsikcvs'; // TODO: Move to secure storage
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain"
};

// AI Response Generation
async function generateAIResponse(userMessage) {
    try {
        const prompt = `You are a career counselor. The user says: "${userMessage}". Respond directly to their specific question or request (e.g., about a career path, salaries, colleges, or how to enter a field) with clear, detailed information. Only suggest new career paths (2-3 options in a numbered list with brief explanations) if the user's input is vague or explicitly asks for career ideas; otherwise, stay focused on their stated interest or question. Keep the tone friendly, encouraging, and professional. Use emojis sparingly to enhance engagement: ✨ for positive encouragement, 💼 for career details, and ❓ for follow-up questions. End with a relevant follow-up question to learn more about their goals, skills, or preferences. Response should be 100-150 words, structured for clarity with line breaks between key points.`;

        const response = await fetch(`${API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.candidates || !data.candidates[0]?.content?.parts) {
            throw new Error('Invalid API response structure');
        }

        const aiResponse = data.candidates[0].content.parts
            .map(part => part.text?.trim() || '')
            .join('');

        return aiResponse || 'No response generated.';
    } catch (error) {
        console.error('Gemini API Error:', error);
        return 'Sorry, I\'m having trouble connecting right now 😔. Could you repeat your question or share more about what you\'re curious about? ❓';
    }
}

// Hide Authentication Modal
function hideAuthModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) authModal.style.display = 'none';
}

// Start Chat
function startChat() {
    hideAuthModal();
    document.getElementById('mainContent').style.display = 'none';
    chatInterface.classList.remove('hidden');
    setTimeout(() => chatInterface.classList.add('show'), 10);
    messageInput.focus();
}

// Go Back to Main Page
function goBack() {
    chatInterface.classList.remove('show');
    setTimeout(() => {
        chatInterface.classList.add('hidden');
        document.getElementById('mainContent').style.display = 'block';
    }, 300);
}

// Send Message
async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user';
    userMessageDiv.innerHTML = `
        <div class="message-content">${message}</div>
    `;
    chatMessages.appendChild(userMessageDiv);

    // Clear input
    messageInput.value = '';

    // Add typing indicator
    const typingIndicator = createTypingIndicator();
    chatMessages.appendChild(typingIndicator);

    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Generate AI response
    let aiResponse = await generateAIResponse(message);
    
    // Process response to preserve line breaks
    aiResponse = aiResponse.replace(/\n/g, '<br>');

    // Remove typing indicator
    typingIndicator.remove();

    // Add AI response
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message bot';
    botMessageDiv.innerHTML = `
        <div class="message-avatar">
            <i data-lucide="sparkles"></i>
        </div>
        <div class="message-content">${aiResponse}</div>
    `;
    chatMessages.appendChild(botMessageDiv);
    
    // Update icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Clear Chat Messages
function clearChat() {
    const messages = chatMessages.querySelectorAll('.message');
    if (messages.length > 1) {
        messages.forEach((message, index) => {
            if (index > 0) message.remove();
        });
    }
}

// Create Typing Indicator
function createTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    return typingDiv;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    clearChatButton.addEventListener('click', clearChat);
});
//email updated
//debuggedgsss