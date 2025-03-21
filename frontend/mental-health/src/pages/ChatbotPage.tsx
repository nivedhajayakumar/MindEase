// Frontend: ChatBot.tsx (React + TypeScript)
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! I'm Cheery. How can I help you today? 😊", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    try {
      // Send to backend
      const response = await axios.post('/api/chat', { message: inputMessage });
      
      // Add bot response
      const botMessage: Message = {
        id: messages.length + 2,
        text: response.data.reply,
        isUser: false
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble understanding. Can you try again?",
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <BotAvatar>🤖</BotAvatar>
        <h3>Cheery - Your Mental Health Friend</h3>
      </ChatHeader>

      <ChatMessages>
        {messages.map((message) => (
          <MessageBubble key={message.id} isUser={message.isUser}>
            {message.text}
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>

      <ChatInput>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message here..."
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </ChatInput>
    </ChatContainer>
  );
};

// Styled components
const ChatContainer = styled.div`
  width: 400px;
  height: 600px;
  background: #f5f7fb;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
`;

const ChatHeader = styled.div`
  background: #4a90e2;
  color: white;
  padding: 1rem;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BotAvatar = styled.div`
  font-size: 24px;
  background: white;
  color: #4a90e2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 20px;
  background: ${({ isUser }) => (isUser ? '#4a90e2' : 'white')};
  color: ${({ isUser }) => (isUser ? 'white' : '#333')};
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatInput = styled.div`
  display: flex;
  padding: 1rem;
  gap: 0.5rem;
  border-top: 1px solid #ddd;

  input {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;

    &:focus {
      border-color: #4a90e2;
    }
  }
`;

const SendButton = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #357abd;
  }
`;

export default ChatBot;