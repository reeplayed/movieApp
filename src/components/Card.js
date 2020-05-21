import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { connect } from 'react-redux';
import {
  setDisplay,
  addToFavourite,
  removeFromFavourite,
  setCurrentPage,
  setTotalPage,
  removeMovie,
  setModalOpen
} from '../actions/movieActions';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import VideoRemoveDialog from './RemoveMovieDialogs';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios, { youtubeAxios } from '../axios';
import { mergeArrays } from './MainPage';
import {key} from '../apiKeys';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '100%',
    background: theme.palette.primary.main,
    border: '1px solid',
    borderRadius: 8,
    borderColor: theme.palette.secondary.main,
  },
  content: {
    background: theme.palette.primary.main,
  },
  image: {
    // borderBottom: '1px solid',
  },
  typography: {
    color: theme.palette.text.main,
    margin: '0 10px 0 4px',
    display: 'inline',
    fontSize: 12,
  },
  icon: {
    height: 16,
  },
  favouriteIcon: {
    margin: '0 0 0 5px',
  },
  iconsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '4px 0 0 0',
  },
  grid: {
    width: 60,
  },
  hoverBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: '0 45px 0 35px',
    background: 'rgba(0,0,0,0)',
    zIndex: 2,
    opacity: 0,
    cursor: 'pointer',
    transition: 'all .4s',
    '&:hover': {
      background: 'rgba(0,0,0,0.7)',
      opacity: 1,
    },
  },
}));

const ImgMediaCard = ({
  movie: { favourite, order, pagination, display, current_page, total_page },
  movie_id,
  title,
  image,
  views,
  likes,
  favouriteBool,
  date_add,
  addToFavourite,
  removeFromFavourite,
  removeMovie,
  setTotalPage,
  setCurrentPage,
  setModalOpen
}) => {
  const classes = useStyles();
 

  const [disabled, setDisabled] = useState(false);

  const addToFavouriteHandler = () => {
    if (!disabled) {
      setDisabled(true);

      axios
        .post('api/add-to-favourite/', { movie_id })
        .then(res => {
          addToFavourite(movie_id);
          setDisabled(false);
        })
        .catch(err => {
          setDisabled(false);
        });
    }
  };

  const removeFromFavouriteHandler = () => {
    if (!disabled) {
      setDisabled(true);

      const withFill = current_page !== total_page ? true : false;

      axios
        .post('api/remove-from-favourite/', {
          movie_id,
          order,
          pagination,
          current_page,
          favourite,
          withFill: withFill,
        })
        .then(({ data }) => {
          if (!favourite) {
            setDisabled(false);
            removeFromFavourite(movie_id);
          } else if (withFill) {
            youtubeAxios
              .get(
                'https://www.googleapis.com/youtube/v3/videos?id=' +
                  data.fill_movie.movie_id +
                  '&key=' +
                  key +
                  '&fields=items(id,snippet(publishedAt,title,thumbnails/medium/url),statistics(viewCount,likeCount))&part=snippet,statistics'
              )
              .then(res => {
                removeMovie(
                  movie_id,
                  mergeArrays([data.fill_movie], res.data.items)[0]
                );
                console.log(data.total_page, 'tadam');
                if (current_page > data.total_page) {
                  setCurrentPage(data.total_page);
                }
                setTotalPage(data.total_page);
              })
              .catch(err => {
                if(err.response.status===403){
                  alert('Sorry, YouTube api query limit exceeded.')
                }
                else{
                  alert(err.response.message);
                }
              });
          } else {
            removeMovie(movie_id);
            setCurrentPage(data.total_page);
            setTotalPage(data.total_page);
          }
        })
        .catch(err => {
          setDisabled(false);
        });
    }
  };


  return (
    <div >
    <Card className={classes.root}>
      <Grid
        container
        className={classes.hoverBackground}
        alignItems="center"
        justify="center"
      >

        <Grid item container xs={12} wrap="nowrap">
          
          <YouTubeIcon 
            color="secondary" 
            fontSize="large"
            onClick={()=>setModalOpen(movie_id)}  
          />
          
          {favouriteBool ? (
            <FavoriteIcon
              onClick={removeFromFavouriteHandler}
              className="icon-anime rem"
              color="secondary"
              fontSize="large"
            />
          ) : (
            <FavoriteBorderIcon
              onClick={addToFavouriteHandler}
              className="icon-anime add"
              color="secondary"
              fontSize="large"
            />
          )}

          <VideoRemoveDialog movie_id={movie_id}>
            <DeleteIcon color="secondary" fontSize="large" />
          </VideoRemoveDialog>
        </Grid>
      </Grid>

      <CardActionArea>
        <Grid container direction="row" spacing={0}>
          <Grid
            item
            xs={display === 'list' ? 12 : display === 'module' ? 3 : null}
          >
            <CardMedia
              className={classes.image}
              component="img"
              alt={title}
              height="140"
              image={image}
              title={title}
            />
          </Grid>
          <Grid xs={display === 'list' ? 12 : display === 'module' ? 9 : null}>
            <CardContent className={classes.content}>
              <Typography
                alt={title}
                className={
                  display === 'list'
                    ? 'truncate-long-texts'
                    : display === 'module'
                    ? 'truncate-long-texts'
                    : null
                }
                gutterBottom
                variant="subtitle2"
                component="h5"
              >
                {title}
              </Typography>

              <div className={classes.iconsWrapper}>
                <div className={classes.iconWrapper}>
                  <ThumbUpIcon className={classes.icon} color="secondary" />
                  <Typography
                    variant="body2"
                    className={classes.typography}
                    component="span"
                  >
                    {likes}
                  </Typography>
                </div>
                <div className={classes.iconWrapper}>
                  <VisibilityIcon className={classes.icon} color="secondary" />

                  <Typography
                    variant="body2"
                    className={classes.typography}
                    component="p"
                  >
                    {views}
                  </Typography>
                </div>
                <div className={classes.iconWrapper}>
                  <DateRangeIcon className={classes.icon} color="secondary" />
                  <Typography
                    variant="body2"
                    className={classes.typography}
                    component="p"
                  >
                    {date_add}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    movie: state.movie,
  };
};
export default connect(mapStateToProps, {
  addToFavourite,
  removeFromFavourite,
  setTotalPage,
  setCurrentPage,
  removeMovie,
  setModalOpen
})(ImgMediaCard);
