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
        const { match } = this.props;
        [
            {
                menuId: 'dashboards',
                id: process.env.REACT_APP_MICROAPP_ID,
                content: [
                    {
                        id: 'hello-world',
                        title: 'Hello World',
                        options: [
                            {
                                id: 'sample-1',
                                title: 'Sample Page 1',
                                url: buildUrl(match.url, '/dashboards/hello-world/page-1'),
                            },
                            {
                                id: 'sample-2',
                                title: 'Sample Page 2',
                                url: buildUrl(match.url, '/dashboards/hello-world/page-2'),
                            },
                        ],
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
