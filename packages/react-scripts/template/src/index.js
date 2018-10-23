import './bootstrapper/setPublicPath';
import { register } from '@infosight/shell-api/lib/Bootstrapper';

register({
  appId: process.env.REACT_APP_MICROAPP_ID,

  /**
   * Lifecycle function that should load the bare minimum needed to determine whether or not to continue
   * @return {Promise<boolean>}
   */
  async shouldContinue() {
    return true;
  },

  /**
   * Lifecycle function that does whatever setup is needed before loading the extensions
   * @return {Promise<boolean>}
   */
  async initialize() {
    const module = await import('./bootstrapper/initialize');
    await module.default();
  },

  /**
   * Lazy-load the extensions as a React component
   * @return {Promise<React.Component>}
   */
  async getExtensionContainer() {
    const module = await import('./bootstrapper/Microapp');
    return module.default;
  },
});
