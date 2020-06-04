import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

export const Options = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  margin-right: 16px; 
`;

export const Title = styled.h1`
  font-family: sans-serif;
  margin-right: 15px;
`;

export const Border = styled.hr`
  border: 0.5px solid #e0e0e0;
  margin-bottom: 0px;
`;

export const StyledTableCell = styled(TableCell)`
  text-transform: capitalize;
`;

export const MarginedButton = styled(Button)`
  margin-left: 20px;
`;

export const Arrow = styled.i`
  opacity: 0;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    opacity: 1;
  }
`;
