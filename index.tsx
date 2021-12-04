import React from 'react';
import { render } from 'react-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './src/components/MUITheme';
import { GraphQLVoyager } from './src';

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
                <GraphQLVoyager sdl={sdl}>
                </GraphQLVoyager>
            </MuiThemeProvider>
        );
    }
}

render(<Demo />, document.getElementById('root'));
