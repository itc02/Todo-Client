import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { labels } from '../../utils/staticData/enums';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FilterOptions, Arrow } from './styles';
import FormControl from '@material-ui/core/FormControl';

interface Props {
  filterData: (searchString: string, filterCriterion: string) => void;
  columns: string[];
  filterCriteria: string[];
  defaultFilterCriterion: string;
  defaultFilterLabel: string;
}

const Filtration = ({ filterData, columns, filterCriteria, defaultFilterCriterion, defaultFilterLabel }: Props) => {
  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);

  const [ searchString, setSearchString ] = useState<string>('');
  const [ filterCriterion, setFilterCriterion ] = useState<string>(defaultFilterCriterion);
  const [ filterLabel, setFilterLabel ] = useState<string>(defaultFilterLabel);

  const filter = (event: any) => {
    const newSearchString = event.target.value;
    filterData(newSearchString, filterCriterion);
    setSearchString(newSearchString);
  }

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = (event: any) => {
    const newFilterCriterion = event.target.id;
    if(newFilterCriterion) {
      setFilterCriterion(newFilterCriterion);
      setFilterLabel(newFilterCriterion === 'all' ? 'All' : columns[filterCriteria.indexOf(newFilterCriterion)]);
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
            endAdornment: <Arrow aria-controls="selectFilterCriterion" onClick={openMenu}/>
          }}
        >
        </TextField>
      </FormControl>
      <Menu 
        id='selectFilterCriterion'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {columns.map((criterion: string, index: number) => {
          return (
            <MenuItem onClick={handleClose} key={criterion} id={filterCriteria[index]}>{ criterion }</MenuItem>
          )
        })}
        <MenuItem onClick={handleClose} key='all' id='all'>All</MenuItem>
      </Menu>
    </FilterOptions>
  )
}

export default Filtration;
