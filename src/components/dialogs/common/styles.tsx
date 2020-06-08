import React from 'react';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Title } from '../../mainTable/styles';
import styled from 'styled-components';


export const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<any>,
  ) => <Slide direction="up" ref={ref} {...props} />
);

export const DialogTitle = styled(Title)`
  text-align: center;
`;