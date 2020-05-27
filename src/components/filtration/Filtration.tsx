import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { labels } from '../../config/constants';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FilterOptions, Arrow } from './styles';
import FormControl from '@material-ui/core/FormControl';

interface Props {
  filterData: (searchString: string, searchCriteria: string) => void;
  columns: string[];
  searchCriterias: string[];
}

const Filtration = ({ filterData, columns, searchCriterias }: Props) => {
  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);

  const [ searchString, setSearchString ] = useState<string>('');
  const [ searchCriteria, setSearchCriteria ] = useState<string>(searchCriterias[0]);
  const [ searchLabel, setSearchLabel ] = useState<string>(columns[0]);

  const filter = (event: any) => {
    const newSearchString = event.target.value;
    filterData(newSearchString, searchCriteria);
    setSearchString(newSearchString);
  }

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = (event: any) => {
    const newSearchCriteria = event.target.id;
    if(newSearchCriteria) {
      setSearchCriteria(newSearchCriteria);
      setSearchLabel(columns[searchCriterias.indexOf(newSearchCriteria)]);
    }
    setAnchorEl(null);
  }

  return (
    <FilterOptions>
      <FormControl fullWidth>
        <TextField
          value={searchString}
          onChange={filter}
          variant='outlined'
          fullWidth
          label={labels.filter + searchLabel}
          inputProps={{
            style: {
              height: 0
            }
          }}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            endAdornment: <Arrow aria-controls="selectFilterCriteria" onClick={openMenu}/>
          }}
        >
        </TextField>
      </FormControl>
      <Menu 
        id='selectFilterCriteria'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {columns.map((criteria: string, index: number) => {
          return (
            <MenuItem onClick={handleClose} key={criteria} id={searchCriterias[index]}>{ criteria }</MenuItem>
          )
        })}
      </Menu>
    </FilterOptions>
  )
}

export default Filtration;
