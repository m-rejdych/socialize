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
import { useReactiveVar, gql } from '@apollo/client';
import { IEmojiData } from 'emoji-picker-react';

import Comment from '../Comment';
import EmojiPicker from '../EmojiPicker';
import Settings from '../Settings';
import {
  useLikePostMutation,
  useCreateCommentMutation,
} from '../../generated/graphql';
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
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  inputBackground: {
    backgroundColor: '#FAFAFA',
  },
  inputPadding: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

const fragment = gql`
  fragment NewComment on Feed {
    id
    content
    createdAt
    likes
    dislikes
    likedBy {
      id
      user {
        id
        fullName
      }
    }
    dislikedBy {
      id
      user {
        id
        fullName
      }
    }
  }
`;

interface Props extends PostType {
  isFeed?: boolean;
  isProfile?: boolean;
}

const Post: React.FC<Props> = ({
  id,
  author: {
    id: profileId,
    user: { fullName },
  },
  content,
  createdAt,
  likes,
  dislikes,
  dislikedBy,
  likedBy,
  comments,
  isFeed,
  isProfile,
}) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [value, setValue] = useState('');
  const classes = useStyles();
  const user = useReactiveVar(userVar);
  const [likePost] = useLikePostMutation();
  const [createComment] = useCreateCommentMutation({
    update(cache, { data }) {
      if (data?.createComment) {
        const { comment, post } = data.createComment;
        cache.modify({
          id: cache.identify(post),
          fields: {
            comments(existingComments = []) {
              const newComment = cache.writeFragment({
                data: comment,
                fragment,
              });

              return [newComment, ...existingComments];
            },
          },
        });
      }
    },
  });

  const isMe = user?.profile.id === profileId;
  const isLiked = likedBy?.some(({ id }) => id === user?.profile.id);
  const isDisliked = dislikedBy?.some(({ id }) => id === user?.profile.id);
  const sortedComments =
    comments?.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)) ||
    [];

  const handleLike = async (isLiked: boolean): Promise<void> => {
    await likePost({ variables: { data: { id, isLiked } } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e);
  };

  const handleSubmit = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (value.trim().length > 0) {
      await createComment({
        variables: { data: { postId: id, content: value } },
      });
      setValue('');
    }
  };

  const handleSelectEmoji = (_: MouseEvent, emojiObject: IEmojiData): void => {
    const { emoji } = emojiObject;
    setValue(`${value}${emoji}`);
  };

  const toggleShowAllComments = (): void => {
    setShowAllComments((prev) => !prev);
  };
  console.log('rerender');

  return (
    <Card elevation={3} className={classes.card}>
      <CardHeader
        avatar={<Avatar />}
        action={
          isMe ? (
            <Settings
              postId={id}
              isProfile={isProfile}
              isFeed={isFeed}
              deletable
            />
          ) : null
        }
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
            multiline
            variant="outlined"
            placeholder="Write a comment..."
            InputProps={{
              className: classes.inputBackground,
              endAdornment: (
                <Box display="flex">
                  <EmojiPicker handleSelect={handleSelectEmoji} />
                  <Button
                    disabled={value.trim().length === 0}
                    color="secondary"
                    onClick={handleSubmit}
                  >
                    Comment
                  </Button>
                </Box>
              ),
            }}
            inputProps={{ className: classes.inputPadding }}
            className={classes.marginLeft}
            value={value}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Box>
        {comments && comments.length > 0 ? (
          <>
            <Comment {...sortedComments[0]} />
            {comments.length > 1 && (
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
            )}
            {showAllComments && sortedComments
              ? sortedComments
                  .slice(1)
                  .map((comment) => <Comment key={comment.id} {...comment} />)
              : null}
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default Post;
