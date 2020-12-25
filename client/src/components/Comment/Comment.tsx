import classNames from 'classnames';
import { formatDistance } from 'date-fns';
import { Box, Typography, Avatar, makeStyles } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { useReactiveVar } from '@apollo/client';

import { useLikeCommentMutation } from '../../generated/graphql';
import { userVar } from '../../graphql/reactiveVariables/user';
import Settings from '../Settings';

const useStyles = makeStyles((theme) => ({
  fontBold: {
    fontWeight: 600,
  },
  flexGrow: {
    flexGrow: 1,
  },
  cursorPointer: {
    cursor: 'pointer',
  },
}));

interface Profile {
  id: string;
  user: {
    id: string;
    fullName: string;
  };
}

interface Props {
  id: string;
  content: string;
  createdAt: Date;
  likes: number;
  dislikes: number;
  author: Profile;
  likedBy?: Profile[] | null;
  dislikedBy?: Profile[] | null;
}

const Comment: React.FC<Props> = ({
  id,
  content,
  createdAt,
  likes,
  dislikes,
  author: {
    id: profileId,
    user: { fullName },
  },
  likedBy,
  dislikedBy,
}) => {
  const classes = useStyles();
  const user = useReactiveVar(userVar);
  const [likeComment] = useLikeCommentMutation();

  const isMe = user?.profile.id === profileId;
  const isLiked = likedBy?.some(({ id }) => id === user?.profile.id);
  const isDisliked = dislikedBy?.some(({ id }) => id === user?.profile.id);

  const handleLikeComment = async (isLiked: boolean): Promise<void> => {
    await likeComment({ variables: { data: { id, isLiked } } });
  };

  return (
    <Box display="flex" alignItems="flex-start" mt={2}>
      <Avatar />
      <Box flexGrow={1} ml={2}>
        <Box display="flex">
          <Typography
            className={classNames(classes.fontBold, classes.flexGrow)}
          >
            {fullName}
          </Typography>
          {isMe && <Settings commentId={id} deletable small />}
        </Box>
        <Typography>{content}</Typography>
        <Box display="flex">
          <Typography
            variant="caption"
            color="textSecondary"
            className={classNames(classes.fontBold, classes.flexGrow)}
          >
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true,
            })}
          </Typography>
          <Box display="flex">
            <Box
              display="flex"
              alignItems="center"
              className={classes.cursorPointer}
              onClick={(): Promise<void> => handleLikeComment(false)}
            >
              <Typography variant="body2">{dislikes}</Typography>
              <ArrowDropDown color={isDisliked ? 'secondary' : 'disabled'} />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              className={classes.cursorPointer}
              onClick={(): Promise<void> => handleLikeComment(true)}
            >
              <Typography variant="body2">{likes}</Typography>
              <ArrowDropUp color={isLiked ? 'primary' : 'disabled'} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
