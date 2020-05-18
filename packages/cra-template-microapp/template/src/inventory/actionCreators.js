import { actionsFor } from '@infosight/elmer/dist/utils/redux';
import { FETCH_INVENTORY, OBJECTS, RESET } from './constants';

const ROOT = '__ROOT';
const buildObjectIndex = (...objectTypes) => objectTypes.reduce((memo, name) => ({ ...memo, [name]: {} }), {});
const PARENT_RELATIONSHIP = 1;
const ASSOCIATIVE_RELATIONSHIP = 2;

export const processInventory = data => {
  const index = buildObjectIndex(...Object.values(OBJECTS));
  const topology = buildObjectIndex(...Object.values(OBJECTS), ROOT);

  const addObjectToIndex = (id, type, name) => {
    if (index[type]) {
      if (!index[type][id]) {
        index[type][id] = { id, type, name };
      } else if (name && !index[type][id].name) {
        index[type][id].name = name.toString();
      }

      return index[type][id];
    }

    return undefined;
  };

  const addOwnerRelation = (owner, ownee) => {
    topology[owner.type][owner.id] = topology[owner.type][owner.id] || {};
    topology[owner.type][owner.id].children = topology[owner.type][owner.id].children || {};
    topology[owner.type][owner.id].children[ownee.type] = topology[owner.type][owner.id].children[ownee.type] || [];
    if (!topology[owner.type][owner.id].children[ownee.type].includes(ownee.id)) {
      topology[owner.type][owner.id].children[ownee.type].push(ownee.id);
    }

    topology[ownee.type][ownee.id] = topology[ownee.type][ownee.id] || {};
    topology[ownee.type][ownee.id].parent = owner;
  };

  const addAssociativeRelation = (a, b) => {
    topology[a.type][a.id] = topology[a.type][a.id] || {};
    topology[a.type][a.id].associates = topology[a.type][a.id].associates || {};
    topology[a.type][a.id].associates[b.type] = topology[a.type][a.id].associates[b.type] || [];
    if (!topology[a.type][a.id].associates[b.type].includes(b.id)) {
      topology[a.type][a.id].associates[b.type].push(b.id);
    }
  };

  data.forEach(item => {
    let { relativeId, relativeType } = item;
    const { id, type, name, relation } = item;

    // object and relative are returned IFF they are in the list of possible OBJECTS
    const object = addObjectToIndex(id, type, name);
    // We can have bad data where the type has a value, but the ID does not.
    // When there is any bad data, make the root node the relative
    const relative = relativeId && relativeType ? addObjectToIndex(relativeId, relativeType) : { id: ROOT, type: ROOT };

    switch (relation) {
      case PARENT_RELATIONSHIP:
        // Assumption: Ownership (parent-child) relations only exist within a product family. Other relationships are associative.
        if (object && relative) {
          addOwnerRelation(relative, object);
        }
        break;
      case ASSOCIATIVE_RELATIONSHIP: {
        // We care about any associative relationship, so use item instead of object.
        const left = object || item;
        const right = relative || {
          id: relativeId,
          type: relativeType,
        };

        if (relative) {
          // Both objects are in this family; add relationship in both directions to simplify lookups
          addAssociativeRelation(left, right);
          addAssociativeRelation(right, left);
        } else if (relativeType && relativeId) {
          // Only add the relationship on this side since topology lookups from the relative's perspective will use it's store state
          addAssociativeRelation(left, right);
        }
        break;
      }
      default:
        break;
    }
  });

  return { index, topology };
};

// Used for the mock search
export const mockInventory = [
  {
    id: '10000001',
    name: 'Sample Host 1',
    relation: 1,
    relativeId: null,
    relativeType: null,
    type: 'SAMPLE.HOST',
  },
  {
    id: '10000002',
    name: 'Sample Host 2',
    relation: 1,
    relativeId: null,
    relativeType: null,
    type: 'SAMPLE.HOST',
  },
  {
    id: '10000003',
    name: 'Sample VM 1',
    relation: 1,
    relativeId: '10000001',
    relativeType: 'SAMPLE.HOST',
    type: 'SAMPLE.VM',
  },
  {
    id: '10000004',
    name: 'Sample VM 2',
    relation: 1,
    relativeId: '10000001',
    relativeType: 'SAMPLE.HOST',
    type: 'SAMPLE.VM',
  },
  {
    id: '10000005',
    name: 'Sample VM 3',
    relation: 1,
    relativeId: '10000002',
    relativeType: 'SAMPLE.HOST',
    type: 'SAMPLE.VM',
  },
];

export const fetchInventory = () => async dispatch => {
  const { dispatchStart, dispatchSuccess, dispatchError } = actionsFor(FETCH_INVENTORY, dispatch);
  dispatchStart();

  try {
    // TODO: replace this with a real inventory call
    // const response = await fetch('/api/sample/inventory');
    const response = {
      data: mockInventory,
    };

    dispatchSuccess(processInventory(response.data));
  } catch (e) {
    dispatchError(e);
  }
};

export const reset = () => ({ type: RESET });
