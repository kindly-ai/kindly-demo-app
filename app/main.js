import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './styles/main.scss';
import classNames from 'classnames';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chatmessages: [],
        };
        this.sendMessage = this.sendMessage.bind(this);
    }
    componentDidMount() {
        axios
        .get('/chatmessages')
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
            message: message
        });
    }
    sendMessage(obj) {
        if ( !obj.message ) {
            return false;
        }

        axios.post(
            '/chatmessage',
            {
                chat_id: "598dcde4b98a0b0010ccaf56",
                message: obj.message,
            }
        );
        this.messageInput.value = "";
    }
    autoScrollToBottom() {
        const scrollHeight          = this.messageList.scrollHeight;
        const height                = this.messageList.clientHeight;
        const maxScrollTop          = scrollHeight - height;
        this.messageList.scrollTop  = maxScrollTop > 0 ? maxScrollTop : 0;
    }
    render() {
        return (
            <div className="chat-demo">
                <div className="chat-messages" ref={(div) => { this.messageList = div; }}>
                    {
                        this.state.chatmessages.map((chatmessage) => {
                            // <Message key={message._id}
                            //         message={message}
                            //         quickReply={this.quickReply.bind(this)} />
                            let wrapperClassNames = classNames({
                                'chatmessage': true,
                                'human': !chatmessage.from_bot,
                                'bot': chatmessage.from_bot,
                            });
                            let avatar = (
                                <img className="avatar" src={require('./images/default_avatar.jpg')} />
                            );
                            if (chatmessage.from_bot) {
                                avatar = (
                                    <img className="avatar" src={require('./images/kindly-happy.svg')} />
                                );
                            }
                            return (
                                <div>
                                    <div className={wrapperClassNames}>
                                        {avatar}
                                        <div className="message">
                                            {chatmessage.message}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="chat-form">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input ref={(input) => { this.messageInput = input; }} type="text" placeholder="Ask me anything" />
                    </form>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
