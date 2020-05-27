import React from 'react';
import styled from 'styled-components';
import { Title } from '../../mainTable/styles';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const DialogTitle = styled(Title)`
  text-align: center;
`;

export const StyledFormControl = styled(FormControl)`
  margin-top: 20px;
`;

export const CapitalizedSelect = styled(Select)`
  text-transform: capitalize;
`;

export const CapitalizedMenuItem = styled(MenuItem)`
  text-transform: capitalize;
`;

export const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<any>,
  ) => <Slide direction="up" ref={ref} {...props} />
);
