import 'babel-polyfill';
import React from 'react';
import InfoChart from './';

export default (
  <div>
    <InfoChart
      /* eslint-disable max-len */
      src="http://127.0.0.1:8080/assets/fake-info-chart.js?welcomeMessage=Hello&initFunction=InfoChartInit&id=myIDContainer&width=300px&height=200px"
      /* eslint-enable max-len */
    />
    <InfoChart
      src="/assets/fake-page.html"
      iframe
    />
  </div>
);
