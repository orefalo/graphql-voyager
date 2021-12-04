import React from 'react';
import classNames from 'classnames';

import './LoadingAnimation.css';

interface LoadingAnimationProps {
    loading: boolean;
}

export default class LoadingAnimation extends React.Component<
    LoadingAnimationProps
> {
    render() {
        const { loading } = this.props;
        return (
            <div className={classNames({ 'loading-box': true, visible: loading })}>
                <h1> Rendering... </h1>
            </div>
        );
    }
}
