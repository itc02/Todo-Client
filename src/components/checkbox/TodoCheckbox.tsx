import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

interface Props {
  itemId: number;
  selectedItems: number[];
  setSelectedItems: (items: number[]) => void;
  isDisabled?: boolean;
}

const TodoCheckbox: React.FC<Props> = ({ itemId, selectedItems, setSelectedItems, isDisabled }) => {
  const changeCheckboxState = (event: any) => {
    const id = parseInt(event.target.value);
    if(selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item: number) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  useEffect(() => {
    selectedItems.length = 0;
  }, []);
  
  return(
    <Checkbox
      color='primary'
      onChange={changeCheckboxState}
      value={itemId}
      disabled={isDisabled || false}
    />
  );
}

export default TodoCheckbox;