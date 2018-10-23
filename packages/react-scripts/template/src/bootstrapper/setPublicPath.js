import { getPublicPath } from '@infosight/shell-api/lib/Bootstrapper';

__webpack_public_path__ = getPublicPath(process.env.REACT_APP_MICROAPP_ID); // eslint-disable-line no-undef
