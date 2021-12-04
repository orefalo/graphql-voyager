import React from 'react';
import { render } from 'react-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './components/MUITheme';
import { Voyager } from './components';
//@ts-ignore - handled by webpack
import defaultGraphql from "./default.graphql";

export default class Demo extends React.Component {
    state = {
        sdl: defaultGraphql
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
