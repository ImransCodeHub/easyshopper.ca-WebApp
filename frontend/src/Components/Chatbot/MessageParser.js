// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      //Testing logs
      console.log(message)
      console.log(this.state)
      console.log(this.actionProvider)
      
      this.actionProvider.handleStartConversation(message);
    }
  }
  
  export default MessageParser;