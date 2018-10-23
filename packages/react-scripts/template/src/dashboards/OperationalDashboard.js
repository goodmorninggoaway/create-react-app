import React from 'react';
import { AwaitingImplementation } from 'elmer/dist/page/AwaitingImplementation';
import classnames from 'classnames/bind';
import style from './OperationalDashboard.module.scss';

const cx = classnames.bind(style);

const OperationalDashboard = ({ className, ...props }) => (
    <div className={cx('severe')}>
        <AwaitingImplementation {...props} />
    </div>
);

export default OperationalDashboard;
