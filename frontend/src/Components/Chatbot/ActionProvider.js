const accessToken = localStorage.getItem('token'); // to pass the token to the chatbot API and decode user email to get the thread id from the database

// ActionProvider starter code
class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  handleStartConversation = async (message) => {

    try {
      // const response = await fetch('http://localhost:5000/api/chatbot', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${accessToken}`
      //   },
      //   body: JSON.stringify({ message: message }) //change to message: question?
      // });
      // const url = 'http://localhost:5000/api/chatbot';
      const url = '/api/chatbot';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ message: message })
      };

      console.log("Request URL:", url);
      console.log("Request body:", options.body);

      console.log("Request Options:", options);


      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);

      // Fix the response format - it should be an array of messages and from the array of messages, it should take the laest message and from that message, it should take the text value
      // Doing checks if the value exists in the response
      if (
        // data.assistantResponses &&
        // data.assistantResponses[0] &&
        // data.assistantResponses[0][0] &&
        // data.assistantResponses[0][0].text &&
        data.assistantResponses[0][0].text.value
      ) {
        const botResponse = this.createChatBotMessage(data.assistantResponses[0][0].text.value);
        console.log(botResponse);
        this.addMessageToState(botResponse);
      } else {
        console.error("Error: Invalid response format");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  addMessageToState = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message]
    }));
  };
}

export default ActionProvider;