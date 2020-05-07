'use strict';

/**
 * Add support for Grommet2@latest + styled-components@5 while retaining backward-compatibility with Grommet@2.beta5 + styled-compoments@3
 * The microapp is expected to use an environment variable to specify the compatibility mode:
 *
 *      `REACT_APP_STYLED_COMPONENTS_COMPATIBILITY_MODE=grommet2.beta5` supports Grommet2@beta.5 by configuring an alias in the
 *          bundle that points to the global instance of styled-components v3.x.x.
 *          This is the default mode if this env var is not set.
 *
 *      `REACT_APP_STYLED_COMPONENTS_COMPATIBILITY_MODE=grommet2` supports Grommet2 by configuring an alias in the bundle that
 *          points to the global instance of styled-components most compatible with v5.x.x (at this time 6.x.x is anticipated to be backward-compatible)
 *
 *      `REACT_APP_STYLED_COMPONENTS_COMPATIBILITY_MODE=none` is a hint not to use the global instances and instead include styled-components in the bundle.
 *          In this case, the microapp must also set [`REACT_APP_SC_ATTR`](https://styled-components.com/docs/advanced#avoiding-conflicts-with-thirdparty-styles-and-scripts)
 */
module.exports.getWebpackExternalsForStyledComponents = () => {
  const externals = {};
  let styledComponentsVersion;
  const scCompatibilityMode =
    process.env.REACT_APP_STYLED_COMPONENTS_COMPATIBILITY_MODE ||
    process.env.STYLED_COMPONENTS_COMPATIBILITY_MODE;
  switch (scCompatibilityMode) {
    case 'grommet2.beta5':
      styledComponentsVersion = '3xx';
      break;
    case 'grommet2':
      styledComponentsVersion = '5xx';
      break;
    case 'none':
      styledComponentsVersion = 'bundled';
      break;
    default:
      break;
  }

  // This should rarely be used, but it's a safe way to breakout whenever avoiding the global instance is preferable
  // This will be an undocumented feature.
  if (styledComponentsVersion === 'bundled') {
    console.warn(
      `Including styled-components in your app's bundle. Be sure to set "process.env.REACT_APP_SC_ATTR" to a value unique to your app, such as "data-styled-vmware" if your microapp's ID is "vmware". See https://styled-components.com/docs/advanced#avoiding-conflicts-with-thirdparty-styles-and-scripts for details.`
    );
  } else if (styledComponentsVersion) {
    // This is the core use case: setting to a specific global instance of SC
    externals['styled-components'] = `styled_${styledComponentsVersion}`;
  } else {
    // Backward-compatibility - the shell aliases window.styled_3xx as window.styled.
    console.warn(
      `Defaulting to legacy compatibility mode for grommet2@beta.5 with styled-components@3.x.x`
    );
    externals['styled-components'] = 'styled';
  }

  return externals;
};
