let currentMessageElement = null;

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('chat-window').addEventListener('contextmenu', showContextMenu);
document.addEventListener('click', hideContextMenu);

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;
    if (messageText.trim() !== '') {
        const messageElement = createMessageElement(messageText, 'sent');
        document.getElementById('chat-window').appendChild(messageElement);
        messageInput.value = '';
    }
}

function createMessageElement(text, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = text;
    messageElement.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        currentMessageElement = messageElement;
    });
    return messageElement;
}

function showContextMenu(event) {
    event.preventDefault();
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.top = `${event.clientY}px`;
    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.display = 'block';
}

function hideContextMenu() {
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.display = 'none';
}

function copyMessage() {
    if (currentMessageElement) {
        navigator.clipboard.writeText(currentMessageElement.textContent);
    }
}

function deleteMessage() {
    if (currentMessageElement) {
        currentMessageElement.remove();
    }
}

function changeMessage() {
    if (currentMessageElement) {
        const newMessageText = prompt('Edit your message:', currentMessageElement.textContent);
        if (newMessageText !== null) {
            currentMessageElement.textContent = newMessageText;
        }
    }
}
