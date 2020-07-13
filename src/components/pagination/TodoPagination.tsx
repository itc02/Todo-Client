import React, { useEffect } from 'react';
import { StyledPagination } from './styles';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';
import { pagination } from '../../utils/staticData/constants';
import MenuItem from '@material-ui/core/MenuItem';

interface Props {
  items: any;
  getItems: (per: number, page: number) => void;
  allItemsCount: number;
  page: number;
  per: number;
  setPage: (page: number) => void;
  setPer: (per: number) => void;
  isSorted: boolean;
}

const TodoPagination:React.FC<Props> = ({items, getItems, allItemsCount, per, page, setPage, setPer, isSorted}) => {
  const handlePerChange = (event: any) => {
    const newPer = parseInt(event.target.value);
    setPer(newPer);
    if(!isSorted) {
      getItems(newPer, page);
    }
  }

  const handlePageChange = (_event: any, newPage: any) => {
    setPage(newPage);
    if(!isSorted) {
      getItems(per, newPage);
    }
  }

  const pagesCount = () => {
    return items.length === 0 ? 1 : Math.ceil(allItemsCount / per);
  }

  useEffect(() => {
    if(pagesCount() < page) {
      setPage(pagesCount());
    }
  });

  return (
    <StyledPagination>
      <Select
        value={per}
        onChange={handlePerChange}
      >
        { pagination.rowsOnPage.map(pageNumber => <MenuItem key={pageNumber} value={pageNumber}>{pageNumber}</MenuItem>) }
      </Select>
      <Pagination onChange={handlePageChange} count={pagesCount()} page={page || 1} color='primary'/>
    </StyledPagination>
  );
}

export default TodoPagination;
