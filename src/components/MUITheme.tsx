import { createMuiTheme } from '@material-ui/core/styles';

import variables from './variables.css';

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {

            // that the color of the input underline
            light: "#ff79c6",
            main: variables.secondaryColor,
            dark: "#ff0000",
            // contrastText: "#ff0000"

        },
        secondary: {
            main: variables.secondaryColor,
        },
        text: {
            primary: "#f8f8f2",
            secondary: "#6272a4",
            disabled: "#ff0000",
            hint: "#0f0"
        }
    },
    typography: {
        fontSize: 12,
        useNextVariants: true,
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
