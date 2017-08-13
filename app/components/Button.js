import React from 'react'
import ReactDOM from 'react-dom'
// import renderHTML from 'react-render-html'

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        // this.onClick = this.onClick.bind(this);
    }

    onClick(event) {

        if (this.props.button.type == "link" ) {
            window.open(this.props.button.value, "_blank")
        }

        if (this.props.button.type == "phone" ) {
            window.open("tel:" + this.props.button.value, "_self")
        }

        if (this.props.button.type == "quick_reply" ) {
            this.props.quickReply({
                value: this.props.button.value,
                exchange_id: this.props.button.exchange_id,
            })
        }

        if (this.props.button.type == "email" ) {
            window.location.href = "mailto:" + this.props.button.value
        }

        event.preventDefault()
        return false
    }

    render() {
        return (
            <a key={this.props.button.id} href="#" className="button" onClick={this.onClick.bind(this)}>
                {this.props.button.label}
            </a>
        )
    }
}
