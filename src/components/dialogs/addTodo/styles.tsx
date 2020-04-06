import React from 'react';
import styled from 'styled-components';
import { Title } from '../../mainTable/styles';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

export const DialogTitle = styled(Title)`
	text-align: center;
`;

export const inputStyle = {
	marginTop: '25px'
} as React.CSSProperties;

export const capitalize = {
	textTransform: 'capitalize'
} as React.CSSProperties;

export const Transition = React.forwardRef(
	(
		props: TransitionProps & { children?: React.ReactElement<any, any> },
		ref: React.Ref<unknown>,
	) => <Slide direction="up" ref={ref} {...props} />
);