import React from 'react';

import Add4Choice from './Add4Choice';

class AddOptions extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            optionType: '4choice'
        }
    }

    handleChange = (event) => {
        this.setState({ optionType: event.target.value });
    };

    renderOptions(type) {
        switch (type) {
            case '4choice':
                return <Add4Choice />
            default:
                break;
        }
    }

    render() {
        return <Add4Choice />;
    }
}
export default AddOptions;