import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './styles/main.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.sendMessage = this.sendMessage.bind(this);
    }
    componentDidMount() {
        this.autoScrollToBottom();
        this.messageInput.focus();
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
            '/message',
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
                    <div>
                        <div className="chatmessage human">
                            <img className="avatar" src={require('./images/default_avatar.jpg')} />
                            <div className="message">
                                Hva kan du gjøre?
                            </div>
                        </div>
                        <div className="chatmessage bot">
                            <img className="avatar" src={require('./images/kindly-happy.svg')} />
                            <div className="message">
                                Jeg kan hjelpe deg med spørsmål du har om Convertelligence, produktene våre og kundeservice! Jeg er nyansatt og under opplæring så jeg kan ikke svare på alt enda, men jeg lærer nye ting hver dag, og hvis jeg ikke kan svaret selv kan jeg prøve å sende deg i retning av noen som kan mer🤓
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="chatmessage human">
                            <img className="avatar" src={require('./images/default_avatar.jpg')} />
                            <div className="message">
                                Hva kan du gjøre?
                            </div>
                        </div>
                        <div className="chatmessage bot">
                            <img className="avatar" src={require('./images/kindly-happy.svg')} />
                            <div className="message">
                                Jeg kan hjelpe deg med spørsmål du har om Convertelligence, produktene våre og kundeservice! Jeg er nyansatt og under opplæring så jeg kan ikke svare på alt enda, men jeg lærer nye ting hver dag, og hvis jeg ikke kan svaret selv kan jeg prøve å sende deg i retning av noen som kan mer🤓
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="chatmessage human">
                            <img className="avatar" src={require('./images/default_avatar.jpg')} />
                            <div className="message">
                                Hva kan du gjøre?
                            </div>
                        </div>
                        <div className="chatmessage bot">
                            <img className="avatar" src={require('./images/kindly-happy.svg')} />
                            <div className="message">
                                Jeg kan hjelpe deg med spørsmål du har om Convertelligence, produktene våre og kundeservice! Jeg er nyansatt og under opplæring så jeg kan ikke svare på alt enda, men jeg lærer nye ting hver dag, og hvis jeg ikke kan svaret selv kan jeg prøve å sende deg i retning av noen som kan mer🤓
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="chatmessage human">
                            <img className="avatar" src={require('./images/default_avatar.jpg')} />
                            <div className="message">
                                Hva kan du gjøre?
                            </div>
                        </div>
                        <div className="chatmessage bot">
                            <img className="avatar" src={require('./images/kindly-happy.svg')} />
                            <div className="message">
                                Jeg kan hjelpe deg med spørsmål du har om Convertelligence, produktene våre og kundeservice! Jeg er nyansatt og under opplæring så jeg kan ikke svare på alt enda, men jeg lærer nye ting hver dag, og hvis jeg ikke kan svaret selv kan jeg prøve å sende deg i retning av noen som kan mer🤓
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="chatmessage human">
                            <img className="avatar" src={require('./images/default_avatar.jpg')} />
                            <div className="message">
                                Hva kan du gjøre?
                            </div>
                        </div>
                        <div className="chatmessage bot">
                            <img className="avatar" src={require('./images/kindly-happy.svg')} />
                            <div className="message">
                                Jeg kan hjelpe deg med spørsmål du har om Convertelligence, produktene våre og kundeservice! Jeg er nyansatt og under opplæring så jeg kan ikke svare på alt enda, men jeg lærer nye ting hver dag, og hvis jeg ikke kan svaret selv kan jeg prøve å sende deg i retning av noen som kan mer🤓
                            </div>
                        </div>
                    </div>
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
