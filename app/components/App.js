import React from 'react';
import axios from 'axios';
import styles from '../styles/main.scss';
import classNames from 'classnames';
import io from 'socket.io-client';
import ChatMessage from './ChatMessage';
import rand from 'random-key';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let chat_id = localStorage.getItem('chat_id');
    if (!chat_id) {
      chat_id = rand.generate(30);
      localStorage.setItem('chat_id', chat_id);
    }

    this.state = {
      chat_id: chat_id,
      chatmessages: [],
      bot_typing: false,
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.messageReceived = this.messageReceived.bind(this);
    this.typingMessage = this.typingMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }
  componentDidMount() {
    /**
     * Connect to websocket server
     */

    this.socket = io(process.env.APP_HOST);
    this.socket.on('connect', () => {});
    this.socket.on('chatmessage-' + this.state.chat_id, this.messageReceived);

    /**
     * Get chatmessages from server
     */

    axios
      .get(process.env.APP_HOST + '/api/chatmessages' + '?chat_id=' + this.state.chat_id)
      .then((response) => {
        this.setState({
          chatmessages: response.data,
        });
      })
      .catch((error) => {
        console.trace(error);
      })
      .then(() => {
        this.autoScrollToBottom();
        this.messageInput.focus();
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    const message = this.messageInput.value.trim();
    this.sendMessage({
      message: message,
    });
  }
  sendMessage(obj) {
    if (!obj.message) {
      return false;
    }

    axios.post(process.env.APP_HOST + '/api/chatmessage', {
      chat_id: this.state.chat_id,
      message: obj.message,
      exchange_id: obj.exchange_id,
    });

    this.messageInput.value = '';
  }
  messageReceived(chatmessage) {
    if (chatmessage.from_bot) {
      this.typingMessage(chatmessage);
    } else {
      this.showMessage(chatmessage);
    }
  }
  typingMessage(message) {
    this.setState({
      bot_typing: true,
    });

    this.autoScrollToBottom();

    setTimeout(() => {
      this.setState({
        bot_typing: false,
      });
      this.showMessage(message);
    }, 1000);
  }

  showMessage(chatmessage) {
    this.setState(function(state) {
      return {
        chatmessages: state.chatmessages.concat(chatmessage),
      };
    });
    this.autoScrollToBottom();
  }
  quickReply(button) {
    this.sendMessage({
      message: button.value,
      exchange_id: button.exchange_id,
    });
  }
  autoScrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
  render() {
    let typing_indicator = null;
    if (this.state.bot_typing) {
      typing_indicator = (
        <div className="chatmessage bot">
          <img className="avatar" src={require('../images/kindly-happy.svg')} />
          <div className="message">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="chat-demo">
        <div
          className="chat-messages"
          ref={(div) => {
            this.messageList = div;
          }}
        >
          {this.state.chatmessages.map((chatmessage) => {
            return (
              <ChatMessage key={chatmessage._id} chatmessage={chatmessage} quickReply={this.quickReply.bind(this)} />
            );
          })}
          {typing_indicator}
        </div>
        <div className="chat-form">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              ref={(input) => {
                this.messageInput = input;
              }}
              type="text"
              placeholder="Ask me anything"
            />
          </form>
        </div>
      </div>
    );
  }
}
