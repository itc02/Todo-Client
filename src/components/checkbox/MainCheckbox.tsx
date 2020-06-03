import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { routes } from '../../utils/staticData/enums';
import axios from 'axios';
import { useGlobalState } from '../../utils/globalState/useGlobalState';
import { ActionTypes } from '../../utils/globalState/actions';

interface Props {
  setAllAction: ActionTypes.SET_ALL_TODOS | ActionTypes.SET_ALL_USERS;
  clearAllAction: ActionTypes.CLEAR_TODOS | ActionTypes.CLEAR_USERS;
  route: string;
}

const MainCheckbox:React.FC<Props> = ({ setAllAction, clearAllAction, route  }) => {
  const { dispatch } = useGlobalState();
  const [ itemsId, setItemsId ] = useState<number[]>([]);
  const [ isSetAll, setIsSetAll ] = useState<boolean>(true);

  const setAll = () => {
    if(isSetAll) {
      dispatch({ type: setAllAction, arrayOfIds: itemsId });
    } else {
      dispatch({ type: clearAllAction });
    }
    setIsSetAll(!isSetAll);
  }

  useEffect(() => {
    axios.get(`${routes.server}/${route}`, {
      params: {
        all_todos_ids: true
      }
    }).then(res => {
      console.log(res.data)
      setItemsId(res.data);
    });
  }, []);

  return(
    <Checkbox 
      color='primary'
      onChange={setAll}
    />
  )
}

export default MainCheckbox;
