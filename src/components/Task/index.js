import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const Task = ({task, onDel}) => {
  return (
    <>
      <ListItem>
        <ListItemText primary={task} />
        <IconButton onClick={onDel}>
          <DeleteOutlinedIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )
}

export default Task;