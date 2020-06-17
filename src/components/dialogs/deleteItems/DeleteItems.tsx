import React from 'react';
import { Question } from './styles';
import { DialogStructure } from '../common/DialogStructure';

interface Props {
  open: boolean;
  closeDialog: () => void;
  handleDelete: (isDelete: boolean) => void;
}

export const DeleteItems:React.FC<Props> = ({open, closeDialog, handleDelete}) => {
  const confirm = () => {
    handleDelete(true);
    closeDialog();
  }

  const close = () => {
    handleDelete(false);
    closeDialog();
  }

  return (
    <DialogStructure
      open={open}
      title=''
      close={close}
      isForm={false}
      action='Delete'
      confirm={confirm}
    >
      <Question>Do you really want to delete?</Question>
    </DialogStructure>
  )
}
