import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 16px;
  margin-right: 16px; 
`;

export const Title = styled.h1`
  font-family: sans-serif;
`;

export const Border = styled.hr`
  border: 0.5px solid #e0e0e0;
  margin-bottom: 0px;
`;

export const StyledTableCell = styled(TableCell)`
  text-transform: capitalize;
`;

export const StyledPagination = styled.div`
  display: flex;
  justify-content: flex-end;
`;
