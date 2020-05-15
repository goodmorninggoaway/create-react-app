import React from 'react';
import autobind from 'react-autobind';
import { ObjectIcon } from '@infosight/elmer/dist/infrastructure';
import productInterface from '../bootstrapper/productInterface';
import { OBJECTS } from '../inventory/constants';
import { mockInventory } from '../inventory/actionCreators';

class BackendSearchSubject {
  constructor() {
    autobind(this);

    this.id = `${productInterface.id.toLowerCase()}-infrastructure-objects`;
    this.name = productInterface.attributes.name;
    this.topics = Object.values(OBJECTS).map(objectType => ({
      id: objectType,
      singularName: productInterface.getSingularTitle(objectType),
      pluralName: productInterface.getPluralTitle(objectType),
      icon: <ObjectIcon objectType={objectType} />,
    }));
  }

  /**
   * @public
   */
  cancel() {
    // You need to add an AbortController to your fetch request to get canceling to work
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  /**
   * @private
   */
  processResponse({ data, error }) {
    if (error) {
      this.handlers.error(error);
      return;
    }

    if (!data || data.length === 0) {
      this.handlers.noOp();
      return;
    }

    let hasResults = false;

    const hits = data
      .reduce((memo, { type, id }) => {
        if (!productInterface.hasDetailView(type)) {
          return memo;
        }

        const object = productInterface.findObject(type, id);
        if (!object) {
          return memo;
        }

        const { pathname, search } = productInterface.getLinkPropsForView(productInterface.getDetailView(type), { id }, null, window.location).to;
        memo.push({
          id,
          name: object.name,
          topic: object.type,
          url: `${pathname}/${search}`,
        });

        hasResults = true;

        return memo;
      }, [])
      .sort((a, b) => (a.name.toLowerCase() <= b.name.toLowerCase() ? -1 : 1));

    if (hasResults) {
      this.handlers.hits(hits);
    } else {
      this.handlers.noOp();
    }
  }

  /**
   * @public
   */
  search({ query, submit }) {
    this.handlers = submit;
    // You should replace this with an actual call to an API such as:
    // const response = await fetch(`/api/sample/search?query=${query}`);
    const response = {
      data: mockInventory.filter(vm => vm.name.toLowerCase().startsWith(query.toLowerCase()) || vm.id.toLowerCase() === query.toLowerCase()),
    };
    // if you would prefer to do a local UI based search, see portal-vmware-frontend for an example:
    // https://github.hpe.com/infosight/portal-vmware-frontend/tree/master/src/search
    this.processResponse(response);
  }
}

const subject = new BackendSearchSubject();

export default subject;
