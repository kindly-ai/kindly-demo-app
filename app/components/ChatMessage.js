import React from 'react';
import classNames from 'classnames';

export default class ChatMessage extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     chatmessages: [],
        // };
        // this.sendMessage = this.sendMessage.bind(this);
        // this.messageReceived = this.messageReceived.bind(this);
    }
    componentDidMount() {
        // this.socket = io();
        // this.socket.on('connect', () => {
        // });
        // this.socket.on('chatmessage', this.messageReceived);
        // axios
        // .get('/chatmessages')
        // .then((response) => {
        //     this.setState({
        //         chatmessages: response.data,
        //     });
        // })
        // .catch((error) => {
        //     console.trace(error);
        // })
        // .then(() => {
        //     this.autoScrollToBottom();
        //     this.messageInput.focus();
        // });
    }
    render() {

        let wrapperClassNames = classNames({
            'chatmessage': true,
            'human': !this.props.chatmessage.from_bot,
            'bot': this.props.chatmessage.from_bot,
        });
        let avatar = (
            <img className="avatar" src={require('../images/default_avatar.jpg')} />
        );
        if (this.props.chatmessage.from_bot) {
            avatar = (
                <img className="avatar" src={require('../images/kindly-happy.svg')} />
            );
        }
        return (
            <div key={this.props.chatmessage._id}>
                <div className={wrapperClassNames}>
                    {avatar}
                    <div className="message">
                        {this.props.chatmessage.message}
                    </div>
                </div>
            </div>
        )
    }
}
