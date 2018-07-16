import { register } from '@infosight/shell-api/lib/Bootstrapper';

register({
  appId: 'vmware',

  /**
   * Lifecycle function that should load the bare minimum needed to determine whether or not to continue
   * @return {Promise<boolean>}
   */
  async shouldLoad() {
    return true;
  },

  /**
   * Lifecycle function that does whatever setup is needed before loading the extensions
   * @return {Promise<boolean>}
   */
  async beforeLoad() {
    const module = await import('./bootstrapper/beforeLoad');
    await module.default();
  },

  /**
   * Lazy-load the extensions as a React component
   * @return {Promise<Promise<React.Component>>}
   */
  async load() {
    const module = await import('./bootstrapper');
    return module.default;
  },
});
