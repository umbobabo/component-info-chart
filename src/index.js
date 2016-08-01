import React from 'react';
import promisescript from 'promisescript';
import querystring from 'query-string';

export default class InfoChart extends React.Component {
  componentWillMount() {
    const queryString = this.props.src.split('?')[1];
    this.config = querystring.parse(queryString);
  }
  componentDidMount() {
    // TODO: add check to load the script only once
    this.loadExternalScript().then(() => {
      /* eslint-disable no-undef */
      window[this.config.initFunction](this.config);
      /* eslint-enable no-undef */
    }).catch((errorLoadingExternalScript) => {
      throw new Error(`An error occured loading ${ this.props.src }`, errorLoadingExternalScript.message);
    });
  }
  loadExternalScript() {
    return promisescript({
      url: this.props.src,
      type: 'script',
    });
  }
  render() {
    return (
      <div className="info-chart"
        id={this.config.id}
        style={{
          width: this.config.width,
          height: this.config.height,
        }}
      >
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  InfoChart.propTypes = {
    src: React.PropTypes.string,
  };
}
