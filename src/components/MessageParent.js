import Message from "./Message";
import React from "react";
class MessageParent extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.active;
        this.message = props.message;

        this.handleChildClick = this.handleChildClick.bind(this);
    }

    handleChildClick() {
        this.setState({active: false});
    }

    render() {
        return (
            <Message active={this.state.active} handleClick={this.handleChildClick} message={this.props.message} />
        );
    }
}

export default MessageParent;

