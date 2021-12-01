import { createTheme } from '@material-ui/core/styles';

import variables from './variables.css';

export const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            // that the color of the input underline
            light: variables.inputUnderlineColor,
            main: variables.fieldNameColor,
        },
        secondary: {
            main: variables.secondaryColor,
        },
        text: {
            primary: variables.textColor,
            secondary: variables.fieldNameColor,
        }
    },
    typography: {
        fontSize: 12
    },
    overrides: {
        MuiCheckbox: {
            root: {
                width: '30px',
                height: '15px',
                padding: 0,

            },
        },
        MuiIconButton: {
            root: {
                width: variables.iconsSize,
                height: variables.iconSize,
                padding: 0,
            },
        },
        MuiInput: {
            root: {
                marginBottom: '10px',
            },
        },
        MuiTooltip: {
            tooltip: {
                fontSize: variables.baseFontSize - 2,
            },
        },
        MuiSnackbar: {
            anchorOriginBottomLeft: {
                [variables.bigViewport]: {
                    left: '340px',
                    right: '20px',
                    bottom: '20px',
                },
            },
        },
        MuiSnackbarContent: {
            root: {
                width: '50%',
                backgroundColor: variables.alertColor,
            },
        },
    },
});
