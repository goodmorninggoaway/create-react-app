import React from 'react';
import { AwaitingImplementation } from 'elmer/dist/page';
import classnames from 'classnames/bind';
import style from './SamplePage1.module.scss';

const cx = classnames.bind(style);

const SamplePage1 = ({ className, ...props }) => (
  <div className={cx('severe')}>
    <h3>
      Why is there an ugly red border? Look at{' '}
      <pre>src/samples/SamplePage1.js</pre> for an example of how to use CSS
      Modules.
    </h3>
    <AwaitingImplementation {...props} />
  </div>
);

export default SamplePage1;
