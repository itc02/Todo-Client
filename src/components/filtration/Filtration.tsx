import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { labels } from '../../config/constants';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FilterOptions, Arrow } from './styles';
import FormControl from '@material-ui/core/FormControl';

interface Props {
  filterData: (searchString: string, filterCriteria: string) => void;
  columns: string[];
  filterCriterias: string[];
  defaultFilterCriteria: string;
  defaultFilterLabel: string;
}

const Filtration = ({ filterData, columns, filterCriterias, defaultFilterCriteria, defaultFilterLabel }: Props) => {
  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);

  const [ searchString, setSearchString ] = useState<string>('');
  const [ filterCriteria, setFilterCriteria ] = useState<string>(defaultFilterCriteria);
  const [ filterLabel, setFilterLabel ] = useState<string>(defaultFilterLabel);

  const filter = (event: any) => {
    const newSearchString = event.target.value;
    filterData(newSearchString, filterCriteria);
    setSearchString(newSearchString);
  }

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = (event: any) => {
    const newFilterCriteria = event.target.id;
    if(newFilterCriteria) {
      setFilterCriteria(newFilterCriteria);
      setFilterLabel(columns[filterCriterias.indexOf(newFilterCriteria)]);
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
          label={labels.filter + filterLabel}
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
            <MenuItem onClick={handleClose} key={criteria} id={filterCriterias[index]}>{ criteria }</MenuItem>
          )
        })}
      </Menu>
    </FilterOptions>
  )
}

export default Filtration;
