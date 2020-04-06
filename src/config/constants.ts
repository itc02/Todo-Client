export const columns: string[] = ['Title', 'State', 'Assigned to', 'End date'];

export const labels = {
  title: 'New title',
  deadline: 'End date',
  assignTo: 'Assign to',
  description: 'New description'
};

export const states = {
  new: 'new',
  inProgress: 'in progress',
  finished: 'finished'
};

export const dateFormats = {
  default: 'MM/DD/YYYY'
};

export const textFields = {
  title: {
    maxLength: 16
  },
  description: {
    maxLength: 256,
    rows: 8
  }
}