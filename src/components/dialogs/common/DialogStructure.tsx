import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Transition, DialogTitle } from './styles';
import Button from '@material-ui/core/Button';

interface Props {
  open: boolean;
  title: string;
  action: string;
  isInvalid: boolean;
  close: () => void;
  confirm: () => void;
}

export const DialogStructure:React.FC<Props> = ({ open, title, action, isInvalid, close, confirm, children }) => {
  const [ isOpen, setOpen ] = useState<boolean>(open);

  useEffect(() => {
    setOpen(open);
  }, [ open ]);

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={close}
      fullWidth
    >
      {
        title && <DialogTitle>{title}</DialogTitle>
      }
      <DialogContent>
        { children }
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' onClick={close}>
          Cancel
        </Button>
        <Button variant='contained' color='secondary' onClick={confirm} disabled={isInvalid}>
          { action }
        </Button>
      </DialogActions>
    </Dialog>
  )
}