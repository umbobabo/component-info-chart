/* eslint-disable no-unused-vars */
/* global document, InfoChartInit */
function InfoChartInit(config) {
  /* eslint-enable no-unused-vars */
  const containerID = config.id;
  if (document.querySelector(`#${ containerID }`)) {
    document.querySelector(`#${ containerID }`).innerHTML = config.welcomeMessage;
  } else {
    throw new Error(`Container #${ containerID } doesnt't exist on the page.`);
  }
}
