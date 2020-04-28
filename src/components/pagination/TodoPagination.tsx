import React from 'react';
import { StyledPagination } from './styles';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';
import { pagination } from '../../config/constants';
import MenuItem from '@material-ui/core/MenuItem';

interface Props {
  items: any;
  getItems: (per: number, page: number) => void;
  allItemsCount: number;
  page: number;
  per: number;
  setPage: (page: number) => void;
  setPer: (per: number) => void;
}

export const TodoPagination = ({items, getItems, allItemsCount, per, page, setPage, setPer}: Props) => {

  const handlePerChange = (event: any) => {
    const newPer = parseInt(event.target.value);
    setPer(newPer);
    getItems(newPer, page);
  }

  const handlePageChange = (event: any, newPage: any) => {
    setPage(newPage);
    getItems(per, newPage);
  }

  const pagesCount = () => {
    return items.length === 0 ? 1 : Math.ceil(allItemsCount / per);
  }

  return (
    <StyledPagination>
      <Select
        value={per}
        onChange={handlePerChange}
      >
        { pagination.rowsOnPage.map(pageNumber => <MenuItem key={pageNumber} value={pageNumber}>{pageNumber}</MenuItem> ) }
      </Select>
      <Pagination onChange={handlePageChange} count={pagesCount()} page={page} color='primary'/>
    </StyledPagination>
  );
}