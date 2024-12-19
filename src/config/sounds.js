// Create sound instances for better performance
export const messageSentSound = new Audio('/sounds/message-sent.mp3');
export const messageReceivedSound = new Audio('/sounds/message-received.mp3');

// Configure sound volumes
messageSentSound.volume = 0.3;
messageReceivedSound.volume = 0.2;

// Create sound instance for AI response
export const aiResponseSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
aiResponseSound.volume = 0.2; 