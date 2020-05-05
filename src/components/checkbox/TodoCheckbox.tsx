import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

interface Props {
  itemId: number;
  chosenItems: number[];
  setChosenItems: (items: number[]) => void;
  isDisabled?: boolean;
}

const TodoCheckbox = ({ itemId, chosenItems, setChosenItems, isDisabled }: Props) => {
  const changeCheckboxState = (event: any) => {
    const id = parseInt(event.target.value);
    if(chosenItems.includes(id)) {
      setChosenItems(chosenItems.filter((item: number) => item !== id));
    } else {
      setChosenItems([...chosenItems, id]);
    }
  }

  useEffect(() => {
    chosenItems.length = 0;
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