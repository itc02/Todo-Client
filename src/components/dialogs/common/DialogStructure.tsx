import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Transition, DialogTitle } from './styles';
import DialogActions from './DialogActions';

interface Props {
  open: boolean;
  title: string;
  close: () => void;
  isForm: boolean;
  action?: string;
  confirm?: () => void;
  isInvalid?: boolean;
}

export const DialogStructure:React.FC<Props> = ({ open, title, close, isForm, action, confirm, isInvalid, children }) => {
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
        {!isForm && 
          <DialogActions
            close={close}
            action={action}
            isForm={false}
            confirm={confirm}
            isInvalid={isInvalid}
          />
        }
      </DialogContent>
    </Dialog>
  )
}