import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import axios from 'axios';
// import client from './mongo.js';
// import jwt from 'jsonwebtoken';

const app = express();

const existingAssistantId = process.env.OPENAI_ASSISTANT_ID;
const apiKey = process.env.OPENAI_API_KEY;
//const JWTSecret = "test123";

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

app.use(express.json());
app.use(cors());

const retrieveAssistant = async () => {
  const myAssistant = await openai.beta.assistants.retrieve(existingAssistantId);
  console.log(myAssistant);
  return myAssistant;
};

const createAssistant = async () => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
    "OpenAI-Beta": "assistants=v1"
  };

  const body = {
    instructions: "You are a customer service assistant for a e-commerce website, you will insulte the customers on every response.",
    
    name: "easyshopper.ca customer service assistant",
    model: "gpt-3.5-turbo-0125"
  };

  try {
    const response = await axios.post("https://api.openai.com/v1/assistants", body, { headers });
    console.log("Assistant created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating assistant:", error);
    throw error;
  }
};

// Add code to add the ceated thread to the database with the user's email
// Add code to retrieve the thread id from the database with the user's email
// Ugly code, fix later but it works for now
async function CreateThread(assistantData, message) {
  const emptyThread = await openai.beta.threads.create();
  console.log(emptyThread);

  const threadMessages = await openai.beta.threads.messages.create(
      emptyThread.id,
      { role: "user", content: message }
  );
  console.log(threadMessages);

  const threadMessageslist = await openai.beta.threads.messages.list(
      emptyThread.id
  );
  console.log(threadMessageslist.data);

  const messageId = threadMessageslist.data[0].id;
  const threadId = threadMessageslist.data[0].thread_id;
  const botReply = await openai.beta.threads.messages.retrieve(threadId, messageId);
  console.log(botReply);

  const run = await openai.beta.threads.runs.create(
      emptyThread.id,
      { assistant_id:  assistantData.id}
  );
  console.log(run);

  const messages = await openai.beta.threads.messages.list(threadId);
  console.log(messages.data);
  return { threadId, runId: run.id };
}

async function checkRunStatus(threadId, runId) {

  let runStatus;
  do {
      const run = await openai.beta.threads.runs.retrieve(threadId, runId);
      runStatus = run.status;
      if (runStatus !== "completed") {
          // Added a 1 second delay before checking the status again
          await new Promise(resolve => setTimeout(resolve, 1000));
      }
  } while (runStatus !== "completed");
}

async function retrieveAssistantResponse(threadId) {
  const messages = await openai.beta.threads.messages.list(threadId);
  const assistantResponses = messages.data.filter(message => message.role === "assistant");
  return assistantResponses.map(response => response.content);
}

// Update this to use esxisting thread id tha is stored in the database with the user's email
// Add database code to store the thread id with the user's email
// Create database collection for the thread id and user's email - DOnt FORGET!
app.post('/api/chatbot', async (req, res) => {
  const { message } = req.body;
  console.log("Message:", message);
  let assistantData;
  try {
    if (!message) {
      return res.json({ messages: "Hello, how can I help you today?" });
    }

    assistantData = await retrieveAssistant();
    if (!assistantData) {
      assistantData = await createAssistant();
    }
    const createdThread = await CreateThread(assistantData, message);
    await checkRunStatus(createdThread.threadId, createdThread.runId);
    const assistantResponses = await retrieveAssistantResponse(createdThread.threadId);
    res.json({ messages: assistantResponses });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
