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
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useQuery } from '@apollo/client';
import { GET_ALL_CHARACTERS, GET_ALL_EPISODES } from '../../graphql/rickAndMorty';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    accordions: {
      justifyContent: 'flex-start',
    },
    accordionDetails: {
      display: 'flex',
      flexDirection: 'column',
    },
    characterAccordion: {
      overflow: 'auto',
      maxHeight: 'calc(100% - 65px)'
    },
    character: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 5,
    },
    characterName: {
      fontWeight: 500,
      marginLeft: 10,
    },
    episodesAccordion: {
      overflow: 'auto',
      maxHeight: 'calc(100% - 65px)'
    },
    episode: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 10,
    },
    episodeName: {
      fontWeight: 'bold',
    }
  }),
);


const Board = () => {
  const classes = useStyles();
  const [task, setTask] = React.useState('')
  const [expanded, setExpanded] = React.useState('panel1')
  const [characters, setCharacters] = React.useState([])
  const [episodes, setEpisodes] = React.useState([])
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.tasks)
  const posts = useSelector(state => state.music.posts)
  const ramCharactersData = useQuery(GET_ALL_CHARACTERS)
  const ramEpisodesData = useQuery(GET_ALL_EPISODES)
  React.useEffect(() => {
    if (ramCharactersData.data && ramCharactersData.data.characters)
      setCharacters(ramCharactersData.data.characters.results)
  }, [ramCharactersData.data])
  React.useEffect(() => {
    if (ramEpisodesData.data && ramEpisodesData.data.episodes)
      setEpisodes(ramEpisodesData.data.episodes.results)
  }, [ramEpisodesData.data])
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
  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
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
            <Paper className={classNames(classes.paper, classes.accordions)}>
              {ramCharactersData.loading ?
                <CircularProgress /> :
                <>
                  <Accordion className={classes.characterAccordion} expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>Characters</Typography>
                      <Typography className={classes.secondaryHeading}></Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                      {characters.map(character => {
                        return (
                          <Box className={classes.character}>
                            <Avatar alt={character.name} src={character.image} />
                            <Typography className={classes.characterName}>
                              {character.name}
                            </Typography>
                          </Box>
                        )
                      })}
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className={classes.episodesAccordion} expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography className={classes.heading}>Episodes</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                      {episodes.map(episode => {
                        return (
                          <Box className={classes.episode}>
                            <Typography className={classes.episodeName}>
                              {episode.name}
                            </Typography>
                            <Typography>
                              {episode.air_date}
                            </Typography>
                          </Box>
                        )
                      })}
                    </AccordionDetails>
                  </Accordion>
                </>
              }
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  )
}

export default Board;