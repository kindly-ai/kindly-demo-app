import React from 'react';
import classNames from 'classnames';
import Button from './Button';

export default class ChatMessage extends React.Component {
    constructor(props) {
        super(props);
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
        let buttons = null;
        if (this.props.chatmessage.buttons.length > 0) {
            buttons = (
                <div className="buttons">
                    {
                        this.props.chatmessage.buttons.map((button) => {
                            // <a key={button.id} href="#" className="button">
                            //     {button.label}
                            // </a>
                            return (
                                <Button key={button.id}
                                        button={button}
                                        quickReply={this.props.quickReply} />
                            )
                        })
                    }
                </div>
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
                {buttons}
            </div>
        )
    }
}
