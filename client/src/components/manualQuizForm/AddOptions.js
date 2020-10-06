import React from 'react';

import Add4Choice from './Add4Choice';
import AddFillBlankChoice from './AddFillBlank';
import AddPoolOfChoices from './AddPoolOfChoices';

class AddOptions extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            optionType: '4choice'
        }
    }

    componentWillUnmount() {
        console.log('Gonna unmount this option');
    }

    handleChange = (event) => {
        this.setState({ optionType: event.target.value });
    };

    renderOptions(type) {
        switch (type) {
            case '4choice':
                return <Add4Choice />
            case 'FillBlank':
                return <AddFillBlankChoice />
            case 'PoolofChoices':
                return <AddPoolOfChoices />
            default:
                break;
        }
    }

    render() {
        return <Add4Choice />;
    }
}
export default AddOptions;