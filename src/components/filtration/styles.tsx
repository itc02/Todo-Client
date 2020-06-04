import styled from 'styled-components';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export const FilterOptions = styled.div`
  flex-grow: 2;
  display: flex;
  justify-content: flex-start
  align-items: center;
`;

export const Arrow = styled(ArrowDropDownIcon)`
  cursor: pointer;
`;
