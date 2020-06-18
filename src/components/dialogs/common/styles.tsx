import React from 'react';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Title } from '../../mainTable/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';


export const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<any>,
  ) => <Slide direction="up" ref={ref} {...props} />
);

export const DialogTitle = styled(Title)`
  text-align: center;
`;

export const StyledActions = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const StyledActionButton = styled(Button)`
  margin-left: 0.625rem;
`;
