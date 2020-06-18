import React from 'react';
import { StyledActions, StyledActionButton } from './styles';
import Button from '@material-ui/core/Button';

interface Props {
  close: () => void;
  action: string | undefined | null;
  isForm: boolean;
  confirm?: () => void;
  isInvalid?: boolean;
}

const DialogActions:React.FC<Props> = ({close, action, isForm, confirm, isInvalid}) => {
  return (
    <StyledActions>
      <StyledActionButton
        variant='contained'
        color='primary'
        onClick={close}
      >
        Cancel
      </StyledActionButton>
      
      <StyledActionButton 
        type={isForm ? 'submit' : 'button'}
        onClick={!isForm ? confirm : () => {}}
        variant='contained'
        color='secondary'
        disabled={isInvalid}
      >
        { action }
      </StyledActionButton>
    </StyledActions>
  );
}

export default DialogActions;
