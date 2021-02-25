import React from 'react';
import Task from '../../components/Task';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Chip from '@material-ui/core/Chip';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: 50,
    },
    paper: {
      height: 700,
      width: 250,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    control: {
      padding: theme.spacing(2),
    },
    button: {
      fontWeight: '600',
    }
  }),
);


const Board = () => {
  const classes = useStyles();
  const [task, setTask] = React.useState('')
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.tasks)
  const posts = useSelector(state => state.music.posts)
  const onAdd = () => {
    if (task.trim().length)
      dispatch({ type: "ADD_TASK", task })
    setTask('')
  }
  const onDel = (idx) => {
    dispatch({ type: "DELETE_TASK", idx })
  }
  const onFetchPosts = () => {
    dispatch({ type: "FETCH_POSTS" })
  }
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          <Grid item>
            <Paper className={classes.paper}>
              <List component="nav" aria-label="mailbox folders">
                {tasks.map((task, idx) => <Task key={idx * Math.random()} onDel={() => onDel(idx)} task={task} />)}
              </List>
              <Paper  >
                <TextField value={task} onChange={e => setTask(e.target.value)} fullWidth id="outlined-basic" label="Task name" variant="standard" />
                <Button onClick={onAdd} color="primary" fullWidth className={classes.button} size="large" >ADD</Button>
              </Paper>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Chip
                icon={<MusicNoteIcon />}
                label="Top 10 posts"
                clickable
                onClick={onFetchPosts}
                color="primary"
              />
              <List>
                {posts.map(post => {
                  return (
                    <ListItem key={post.id}>
                      <ListItemText primary={post.title} />
                    </ListItem>)
                })}
              </List>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  )
}

export default Board;