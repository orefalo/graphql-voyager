import React from 'react';
import Markdown from '../utils/Markdown';

interface EnumValueProps {
    value: any;
}

export default class EnumValue extends React.Component<EnumValueProps> {
    render() {
        const { value } = this.props;
        return (
            <div className="item">
                <div className="enum-value">{value.name}</div>
                <Markdown
                    className="description-box -enum-value"
                    text={value.description}
                />
                {value.deprecationReason && (
                    <Markdown
                        className="doc-deprecation"
                        text={value.deprecationReason}
                    />
                )}
            </div>
        );
    }
}
