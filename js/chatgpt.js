const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        userInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1000);
    }
});

function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

function getBotResponse(message) {
    // Simple keyword-based responses
    const responses = {
        greeting: ["Hello! How can I help you?", "Hi there! What’s on your mind?", "Greetings! How may I assist you today?"],
        goodbye: ["Goodbye! Have a great day!", "See you later!", "Take care!"],
        thanks: ["You're welcome!", "No problem!", "Glad to help!"],
    };
    
    // Basic emotion detection through keywords
    if (message.includes("hello") || message.includes("hi")) {
        return getRandomResponse(responses.greeting);
    } else if (message.includes("bye") || message.includes("goodbye")) {
        return getRandomResponse(responses.goodbye);
    } else if (message.includes("thank you") || message.includes("thanks")) {
        return getRandomResponse(responses.thanks);
    } else {
        return "That's interesting! Can you tell me more?";
    }
}

function getRandomResponse(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}