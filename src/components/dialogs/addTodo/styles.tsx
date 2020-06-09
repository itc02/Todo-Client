import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const StyledFormControl = styled(FormControl)`
  margin-top: 20px;
`;

export const CapitalizedSelect = styled(Select)`
  text-transform: capitalize;
`;

export const CapitalizedMenuItem = styled(MenuItem)`
  text-transform: capitalize;
`;
