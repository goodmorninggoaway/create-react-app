import { useEffect } from 'react';
import { addSubject } from '@infosight/shell-api/lib/Search';
import { onShellStateUpdate } from '../user/utils';
import subject from '../search/subject';

const ID = process.env.REACT_APP_MICROAPP_ID;

const SearchExtension = () => {
  useEffect(() => {
    const handleUpdate = () => {
      // Typically, here you would also remove access if the inventory was empty for the current organization
      addSubject({ id: ID, provider: subject });
    };
    handleUpdate();
    return onShellStateUpdate(handleUpdate);
  }, []);

  return null;
};

export default SearchExtension;
