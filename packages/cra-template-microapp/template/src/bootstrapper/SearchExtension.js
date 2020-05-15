import { Component } from 'react';
import autobind from 'react-autobind';
import { addSubject } from '@infosight/shell-api/lib/Search';
import { onShellStateUpdate } from '../user/utils';
import subject from '../search/subject';

const ID = process.env.REACT_APP_MICROAPP_ID;

class SearchExtension extends Component {
  // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.handleUpdate();
    this.unsubscribe = onShellStateUpdate(this.handleUpdate);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleUpdate() {
    // eslint-disable-line class-methods-use-this
    // Typically, here you would also remove access if the inventory was empty for the current organization
    addSubject({ id: ID, provider: subject });
  }

  render() {
    return null;
  }
}

export default SearchExtension;
