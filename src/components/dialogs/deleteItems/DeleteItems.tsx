import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { buttons } from '../../../utils/staticData/enums';
import { Transition } from '../addTodo/styles';
import Button from '@material-ui/core/Button';
import { Question } from './styles';

interface Props {
  open: boolean;
  closeDialog: () => void;
  handleDelete: (isDelete: boolean) => void;
}

export const DeleteItems:React.FC<Props> = ({open, closeDialog, handleDelete}) => {
  const [ isOpen, setOpen ] = useState<boolean>(open);

  const confirm = () => {
    handleDelete(true);
    closeDialog();
  }

  const close = () => {
    handleDelete(false);
    closeDialog();
  }

  useEffect(() => {
    setOpen(open);
  }, [ open ]);

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDialog}
    >
      <DialogContent>
      <Question>Do you really want to delete?</Question>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} variant='contained' color='secondary'>
          {buttons.cancel}
        </Button>
        <Button onClick={confirm} variant='contained' color='primary'>
          {buttons.delete}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
