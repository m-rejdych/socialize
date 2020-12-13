import { format } from 'date-fns';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Typography,
  makeStyles,
  Avatar,
  Button,
} from '@material-ui/core';
import {
  ThumbUp,
  ThumbDown,
  ThumbUpOutlined,
  ThumbDownOutlined,
} from '@material-ui/icons';
import { useReactiveVar } from '@apollo/client';

import { usePostQuery, useLikePostMutation } from '../../generated/graphql';
import { userVar } from '../../graphql/reactiveVariables/user';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  displayFlex: {
    display: 'flex',
  },
}));

interface Props {
  id: string;
}

const Post: React.FC<Props> = ({ id }) => {
  const classes = useStyles();
  const user = useReactiveVar(userVar);
  const { data } = usePostQuery({ variables: { id } });
  const [likePost] = useLikePostMutation();

  if (data?.post) {
    const {
      content,
      author: {
        user: { fullName },
      },
      createdAt,
      likes,
      dislikes,
      likedBy,
      dislikedBy,
      // comments,
    } = data.post;

    const isLiked = likedBy?.some(({ id }) => id === user?.profile.id);
    const isDisliked = dislikedBy?.some(({ id }) => id === user?.profile.id);

    const handleLike = async (isLiked: boolean): Promise<void> => {
      await likePost({ variables: { data: { id, isLiked } } });
    };

    return (
      <Card elevation={3} className={classes.card}>
        <CardHeader
          avatar={<Avatar />}
          title={
            <Box>
              <Typography>{fullName}</Typography>
              <Typography variant="caption" color="textSecondary">
                {format(new Date(createdAt), 'MMMM do')}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Typography>{content}</Typography>
          <CardActions className={classes.displayFlex}>
            <Button
              startIcon={
                isLiked ? (
                  <ThumbUp htmlColor="#FFF" />
                ) : (
                  <ThumbUpOutlined color="primary" />
                )
              }
              variant={isLiked ? 'contained' : 'text'}
              color={isLiked ? 'primary' : 'default'}
              className={classes.marginRight}
              onClick={(): Promise<void> => handleLike(true)}
            >
              {likes}
            </Button>
            <Button
              startIcon={
                isDisliked ? (
                  <ThumbDown htmlColor="#FFF" />
                ) : (
                  <ThumbDownOutlined color="secondary" />
                )
              }
              variant={isDisliked ? 'contained' : 'text'}
              color={isDisliked ? 'secondary' : 'default'}
              onClick={(): Promise<void> => handleLike(false)}
            >
              {dislikes}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default Post;
