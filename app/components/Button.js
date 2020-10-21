import React from 'react';
import ReactDOM from 'react-dom';
// import renderHTML from 'react-render-html'

export default class Button extends React.Component {
  constructor(props) {
    super(props);

    // this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    if (['link', 'EXTERNAL_LINK'].includes(this.props.button.type)) {
      window.open(this.props.button.value, '_blank');
    }

    if (['phone', 'PHONE'].includes(this.props.button.type)) {
      window.open('tel:' + this.props.button.value, '_self');
    }

    if (['quick_reply', 'QUICK_REPLY'].includes(this.props.button.type)) {
      this.props.quickReply({
        value: this.props.button.value,
        exchange_id: this.props.button.exchange_id,
      });
    }

    if (this.props.button.type == 'email') {
      window.location.href = 'mailto:' + this.props.button.value;
    }

    event.preventDefault();
    return false;
  }

  render() {
    return (
      <a key={this.props.button.id} href="#" className="button" onClick={this.onClick.bind(this)}>
        {this.props.button.label}
      </a>
    );
  }
}
