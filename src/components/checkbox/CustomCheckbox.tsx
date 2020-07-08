import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useGlobalState } from '../../utils/globalState/useGlobalState';
import { ActionTypes } from '../../utils/globalState/actions';

interface Props {
  itemId: number;
  isDisabled?: boolean;
  removeAction: ActionTypes.REMOVE_TODO | ActionTypes.REMOVE_USER;
  addAction: ActionTypes.ADD_TODO | ActionTypes.ADD_USER;
  selectedItems: number[];
  isAllItemsSelected: boolean;
}

const CustomCheckbox: React.FC<Props> = ({ itemId, isDisabled, removeAction, addAction, selectedItems, isAllItemsSelected }) => {
  const { dispatch } = useGlobalState();

  const changeCheckboxState = () => {
    if(selectedItems.includes(itemId)) {
      dispatch({type: removeAction, id: itemId})
    } else {
      dispatch({type: addAction, id: itemId});
    }
  }

  useEffect(() => {
    if(isAllItemsSelected && !selectedItems.includes(itemId)) {
      changeCheckboxState();
    }
  });

  return(
    <Checkbox
      color='primary'
      onChange={changeCheckboxState}
      disabled={isDisabled}
      checked={(isAllItemsSelected || selectedItems.includes(itemId)) && !isDisabled}
    />
  );
}

export default CustomCheckbox;
