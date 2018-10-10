import { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { withRouter } from 'react-router-dom';
import { addMenu, removeMenu } from '@infosight/shell-api/lib/PrimaryNav';
import { buildUrl } from 'elmer/dist/utils/url';

class PrimaryNavExtension extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.handleUpdate();
  }

  /**
   * Rename this function to a more suitable name
   * @param match
   * @returns {{id: string, title: string, url: *}[]}
   */
  getMicroApp({ match }) {
    return [
      {
        id: 'menu-id',
        title: 'menu-title',
        url: buildUrl(match.url, 'microapp-sub-route'),
      },
    ];
  }

  handleUpdate() {
    const externals = { match: this.props.match };

    [
      {
        menuId: 'menu-id',
        id: 'menu-id',
        content: this.getMicroApp(externals),
      },
    ].forEach(extension => {
      if (extension.content) {
        addMenu(extension);
      } else {
        removeMenu(extension);
      }
    });
  }

  render() {
    return null;
  }
}

PrimaryNavExtension.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(PrimaryNavExtension);
