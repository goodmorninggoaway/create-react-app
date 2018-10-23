import React from 'react';
import { AwaitingImplementation } from 'elmer/dist/page';
import classnames from 'classnames/bind';
import style from './SamplePage1.module.scss';

const cx = classnames.bind(style);

const SamplePage1 = ({ className, ...props }) => (
    <div className={cx('severe')}>
        <AwaitingImplementation {...props} />
    </div>
);

export default SamplePage1;
