import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useGlobalState } from '../../utils/globalState/useGlobalState';
import { ActionTypes } from '../../utils/globalState/actions';

interface Props {
  itemId: number;
  isDisabled?: boolean;
  removeAction: ActionTypes.REMOVE_TODO | ActionTypes.REMOVE_USER;
  addAction: ActionTypes.ADD_TODO | ActionTypes.ADD_USER;
  selectedItems: number[];
}

const UnitCheckbox: React.FC<Props> = ({ itemId, isDisabled, removeAction, addAction, selectedItems }) => {
  const { dispatch } = useGlobalState();

  const changeCheckboxState = (event: any) => {
    const id = parseInt(event.target.value);
    if(selectedItems.includes(id)) {
      dispatch({type: removeAction, id})
    } else {
      dispatch({type: addAction, id});
    }
  }
  return(
    <Checkbox
      color='primary'
      onChange={changeCheckboxState}
      value={itemId}
      disabled={isDisabled || false}
      checked={selectedItems.includes(itemId) && !isDisabled}
    />
  );
}

export default UnitCheckbox;
