import React from 'react';
import promisescript from 'promisescript';
import querystring from 'query-string';
import Loading from '@economist/component-loading';

export default class InfoChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentWillMount() {
    const queryString = this.props.src.split('?')[1];
    this.config = querystring.parse(queryString);
  }
  componentDidMount() {
    this.loadExternalScript()
    .catch((errorLoadingExternalScript) => {
      throw new Error(`An error occured loading ${ this.props.src }`, errorLoadingExternalScript.message);
    });
  }
  ensureScriptHasLoaded() {
    if (!this.script) {
      this.script = promisescript({
        url: this.props.src,
        type: 'script',
      }).catch((event) => {
        /* eslint-disable no-console */
        console.error('An error loading or executing Piano has occured: ', event.message);
        /* eslint-enable no-console */
        throw event;
      });
    }
    return this.script;
  }
  initInfoChart() {
    /* eslint-disable no-undef */
    window[this.config.initFunction](this.config).then(() => {
      this.setState({
        loading: false,
      });
    });
    /* eslint-enable no-undef */
  }
  loadExternalScript() {
    return this.ensureScriptHasLoaded().then(() => {
      this.initInfoChart();
    }).catch((errorLoadingExternalScript) => {
      /* eslint-disable no-console */
      console.log(errorLoadingExternalScript.stack);
      /* eslint-enable no-console */
    });
  }
  render() {
    let innerWrapper = null;
    if (this.props.iframe) {
      innerWrapper = (<iframe src={this.props.src} />);
    } else {
      innerWrapper = (this.state.loading) ? <Loading /> : null;
    }
    const stateClassname = (this.state.loading) ? 'info-chart--loading' : 'info-chart--loaded';
    return (
      <div className={`info-chart ${ stateClassname }`}
        id={this.config.id}
        style={{
          width: this.config.width,
          height: this.config.height,
        }}
      >
        {innerWrapper}
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  InfoChart.propTypes = {
    src: React.PropTypes.string,
    iframe: React.PropTypes.bool,
  };
}
