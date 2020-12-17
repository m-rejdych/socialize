import { useState } from 'react';
import classNames from 'classnames';
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
  Divider,
  TextField,
} from '@material-ui/core';
import {
  ThumbUp,
  ThumbDown,
  ThumbUpOutlined,
  ThumbDownOutlined,
  ChatBubbleOutline,
} from '@material-ui/icons';
import { useReactiveVar } from '@apollo/client';

import Comment from '../Comment';
import { useLikePostMutation } from '../../generated/graphql';
import { userVar } from '../../graphql/reactiveVariables/user';
import { Post as PostType } from '../../graphql/reactiveVariables/feed';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  fontBold: {
    fontWeight: 600,
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
  textUnderline: {
    textDecoration: 'underline',
  },
  inputBackground: {
    backgroundColor: '#FAFAFA',
  },
  inputPadding: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
}));

const Post: React.FC<PostType> = ({
  id,
  author: {
    user: { fullName },
  },
  content,
  createdAt,
  likes,
  dislikes,
  dislikedBy,
  likedBy,
  comments,
}) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const classes = useStyles();
  const user = useReactiveVar(userVar);
  const [likePost] = useLikePostMutation();
  console.log('rerender');

  const isLiked = likedBy?.some(({ id }) => id === user?.profile.id);
  const isDisliked = dislikedBy?.some(({ id }) => id === user?.profile.id);
  const mostLikedComment = comments
    ?.slice()
    .sort((a, b) => (a.likes > b.likes ? -1 : 1))[0];
  const sortedComments = comments
    ?.slice()
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

  const handleLike = async (isLiked: boolean): Promise<void> => {
    await likePost({ variables: { data: { id, isLiked } } });
  };

  const toggleShowAllComments = (): void => {
    setShowAllComments((prev) => !prev);
  };

  return (
    <Card elevation={3} className={classes.card}>
      <CardHeader
        avatar={<Avatar />}
        title={
          <Box>
            <Typography className={classes.fontBold}>{fullName}</Typography>
            <Typography variant="caption" color="textSecondary">
              {format(new Date(createdAt), 'MMMM do')}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography>{content}</Typography>
      </CardContent>
      <CardActions>
        <Button startIcon={<ChatBubbleOutline />}>{comments?.length}</Button>
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
      <CardContent>
        <Divider />
        <Box display="flex" alignItems="flex-start" mt={2}>
          <Avatar />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Write a comment..."
            InputProps={{ className: classes.inputBackground }}
            inputProps={{ className: classes.inputPadding }}
            className={classes.marginLeft}
          />
        </Box>
        {comments && comments.length > 0 && mostLikedComment ? (
          <>
            <Comment id={mostLikedComment.id} />
            <Typography
              variant="body2"
              className={classNames(
                classes.fontBold,
                classes.cursorPointer,
                classes.textUnderline,
                classes.marginTop,
              )}
              color="textSecondary"
              onClick={toggleShowAllComments}
            >
              {showAllComments
                ? 'Hide comments'
                : `View all ${comments.length} comments`}
            </Typography>
            {showAllComments && sortedComments
              ? sortedComments
                  .filter(({ id }) => id !== mostLikedComment.id)
                  .map(({ id }) => <Comment id={id} />)
              : null}
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default Post;
