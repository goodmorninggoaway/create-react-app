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

    handleUpdate() {
        [
            {
                menuId: 'dashboards',
                id: 'hello-world',
                content: [
                    {
                        id: 'hello-world-1',
                        title: 'Operational',
                        url: buildUrl(match.url, '/dashboards/hello-world/operational'),
                    },
                    {
                        id: 'hello-world-2',
                        title: 'Executive',
                        url: buildUrl(match.url, '/dashboards/hello-world/executive'),
                    },
                ],
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
