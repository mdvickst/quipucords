import axios from 'axios';

class ScansService {
  static addScan(data = {}) {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_SCANS_SERVICE}`,
      xsrfCookieName: process.env.REACT_APP_AUTH_TOKEN,
      xsrfHeaderName: process.env.REACT_APP_AUTH_HEADER,
      data: data
    });
  }

  static getScan(id) {
    return this.getScans(id);
  }

  static getScans(id = '', query = {}) {
    return axios({
      url: `${process.env.REACT_APP_SCANS_SERVICE}${id}`,
      params: query
    });
  }

  static updateScan(id, data = {}) {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_SCANS_SERVICE}${id}`,
      xsrfCookieName: process.env.REACT_APP_AUTH_TOKEN,
      xsrfHeaderName: process.env.REACT_APP_AUTH_HEADER,
      data: data
    });
  }

  static updatePartialScan(id, data = {}) {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_SCANS_SERVICE}${id}`,
      xsrfCookieName: process.env.REACT_APP_AUTH_TOKEN,
      xsrfHeaderName: process.env.REACT_APP_AUTH_HEADER
    });
  }

  static deleteScan(id) {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_SCANS_SERVICE}${id}`,
      xsrfCookieName: process.env.REACT_APP_AUTH_TOKEN,
      xsrfHeaderName: process.env.REACT_APP_AUTH_HEADER
    });
  }

  static startScan(id) {
    let apiPath = process.env.REACT_APP_SCAN_JOBS_SERVICE_START_GET.replace('{0}', id);

    return axios({
      method: 'post',
      url: apiPath,
      xsrfCookieName: process.env.REACT_APP_AUTH_TOKEN,
      xsrfHeaderName: process.env.REACT_APP_AUTH_HEADER
    });
  }

  static getScanJobs(id, query = {}) {
    let apiPath = process.env.REACT_APP_SCAN_JOBS_SERVICE_START_GET.replace('{0}', id);
    return axios({
      url: apiPath,
      params: query
    });
  }

  static getScanJob(id) {
    return axios({
      url: `${process.env.REACT_APP_SCAN_JOBS_SERVICE}${id}`
    });
  }

  static getScanResults(id) {
    let apiPath = process.env.REACT_APP_SCAN_JOBS_SERVICE_RESULTS.replace('{0}', id);

    return axios({
      url: apiPath
    });
  }

  static pauseScan(id) {
    let apiPath = process.env.REACT_APP_SCAN_JOBS_SERVICE_PAUSE.replace('{0}', id);

    return axios({
      method: 'put',
      url: apiPath,
      xsrfCookieName: process.env.REACT_APP_AUTH_TOKEN,
      xsrfHeaderName: process.env.REACT_APP_AUTH_HEADER
    });
  }

  static cancelScan(id) {
    let apiPath = process.env.REACT_APP_SCAN_JOBS_SERVICE_CANCEL.replace('{0}', id);

    return axios({
      method: 'put',
      url: apiPath,
      xsrfCookieName: process.env.REACT_APP_AUTH_TOKEN,
      xsrfHeaderName: process.env.REACT_APP_AUTH_HEADER
    });
  }

  static restartScan(id) {
    let apiPath = process.env.REACT_APP_SCAN_JOBS_SERVICE_RESTART.replace('{0}', id);

    return axios({
      method: 'put',
      url: apiPath,
      xsrfCookieName: process.env.REACT_APP_AUTH_TOKEN,
      xsrfHeaderName: process.env.REACT_APP_AUTH_HEADER
    });
  }
}

export default ScansService;
