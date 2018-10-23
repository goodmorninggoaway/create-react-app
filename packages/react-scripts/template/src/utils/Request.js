import URI from 'urijs';
import axios from './axios';

/**
 * Fluent interface to encapsulate application-specific REST request logic
 * HTTP-based methods proxy to [axios](https://github.com/mzabriskie/axios#request-method-aliases) to execute the
 * request. The others are backed by [URIjs](https://medialize.github.io/URI.js) to build URI, which is used by the
 * HTTP methods.
 *
 * Example:
 *  const promise = new Request().pod().genericQuery('folders).post();
 */
export default class Request {
  constructor() {
    this.uri = new URI('/');
  }

  uriAddQuery(q) {
    this.uri.addQuery(q);
    return this;
  }

  /**
   * Get the URIjs instance. Note that this will break the method chain.
   * @return {URI}
   */
  uriBuilder() {
    return this.uri;
  }

  // give this any number of string args and it will append each one to the current uri
  urlSegments(...args) {
    for (let i = 0; i < args.length; i += 1) {
      // segment only appends if you use exactly one string argument
      // so to prevent something unexpected happening, we only accept string args
      if (typeof args[i] !== 'string') {
        throw new Error('urlSegments() only accepts string arguments');
      }
      this.uri.segment(args[i]);
    }
    return this;
  }

  query(queries) {
    this.uri.addQuery(queries);
    return this;
  }

  // request calls

  get(...args) {
    return axios.get(this.uri.valueOf(), ...args);
  }

  delete(...args) {
    return axios.delete(this.uri.valueOf(), ...args);
  }

  put(...args) {
    return axios.put(this.uri.valueOf(), ...args);
  }

  post(...args) {
    return axios.post(this.uri.valueOf(), ...args);
  }
}
