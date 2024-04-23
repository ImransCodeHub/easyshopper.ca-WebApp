// import { MongoClient, ServerApiVersion } from "mongodb";
import OpenAI from 'openai';

const existingAssistantId = process.env.OPENAI_ASSISTANT_ID;
const apiKey = process.env.OPENAI_API_KEY;
// const uri = process.env.MONGO_URI;

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event));
  // if (!event.headers || !event.headers.Authorization) {
  //     return {
  //         statusCode: 400,
  //         body: JSON.stringify({ error: 'Authorization header is missing' }),
  //     };
  // }

  // const client = new MongoClient(uri,  {
  //     serverApi: {
  //       version: ServerApiVersion.v1,
  //       strict: true,
  //       deprecationErrors: true,
  //     }
  //   });

  try {
    const message = event.body;
    console.log('Message:', message);
    const assistantData = await retrieveAssistant();
    console.log('Assistant:', assistantData);
    if (!assistantData) {
      await createAssistant();
    }
    const threadData = await CreateThread(assistantData, message);
    console.log('Thread:', threadData);
    await checkRunStatus(threadData.threadId, threadData.runId);
    console.log('Run completed');
    const assistantResponses = await retrieveAssistantResponse(threadData.threadId);
    console.log('Assistant responses:', assistantResponses);
    return {
      statusCode: 200,
      body: JSON.stringify({ assistantResponses }),
    };
  }
  catch (error) {
    console.error('Error creating chatbot session:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error creating chatbot session' }),
    };
  }
};

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
    { assistant_id: assistantData.id }
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
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } while (runStatus !== "completed");
}

async function retrieveAssistantResponse(threadId) {
  const messages = await openai.beta.threads.messages.list(threadId);
  const assistantResponses = messages.data.filter(message => message.role === "assistant");
  return assistantResponses.map(response => response.content);
}
