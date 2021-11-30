import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import RootSelector from './RootSelector';
import { InputLabel } from '@material-ui/core';

interface SettingsProps {
    schema: any;
    options: any;
    onChange: (any) => void;
}

export default class Settings extends React.Component<SettingsProps> {
    render() {
        let { schema, options, onChange } = this.props;

        return (
            <div className="menu-content">
                <div className="setting-change-root">
                    <RootSelector
                        schema={schema}
                        rootType={options.rootType}
                        onChange={(rootType) => onChange({ rootType })}
                    />
                </div>
                <div className="setting-other-options">
                    <Checkbox
                        id="sort"
                        color="primary"
                        checked={!!options.sortByAlphabet}
                        onChange={(event) =>
                            onChange({ sortByAlphabet: event.target.checked })
                        }
                    />
                    <InputLabel htmlFor="sort" color="primary">Sort by Alphabet</InputLabel>
                    <Checkbox
                        id="skip"
                        color="primary"
                        checked={!!options.skipRelay}
                        onChange={(event) => onChange({ skipRelay: event.target.checked })}
                    />
                    <InputLabel htmlFor="skip" color="primary">Skip Relay</InputLabel>
                    <Checkbox
                        id="deprecated"
                        color="primary"
                        checked={!!options.skipDeprecated}
                        onChange={(event) =>
                            onChange({ skipDeprecated: event.target.checked })
                        }
                    />
                    <InputLabel htmlFor="deprecated" color="primary">Skip deprecated</InputLabel>
                    <Checkbox
                        id="showLeafFields"
                        color="primary"
                        checked={!!options.showLeafFields}
                        onChange={(event) =>
                            onChange({ showLeafFields: event.target.checked })
                        }
                    />
                    <InputLabel htmlFor="showLeafFields" color="primary">Show leaf fields</InputLabel>
                </div>
            </div>
        );
    }
}
