import React from 'react';
import { render } from 'react-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './src/components/MUITheme';
import { Voyager } from './src/components';

export default class Demo extends React.Component {
    state = {
        sdl: require('./presets/default.graphql')
    };

    constructor(props) {
        super(props);
    }

    public render() {
        const { sdl } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <Voyager sdl={sdl}>
                </Voyager>
            </MuiThemeProvider>
        );
    }
}

render(<Demo />, document.getElementById('root'));
