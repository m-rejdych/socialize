import classNames from 'classnames';
import { formatDistance } from 'date-fns';
import { Box, Typography, Avatar, makeStyles } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { useReactiveVar } from '@apollo/client';

import {
  useCommentQuery,
  useLikeCommentMutation,
} from '../../generated/graphql';
import { userVar } from '../../graphql/reactiveVariables/user';

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

interface Props {
  id: string;
}

const Comment: React.FC<Props> = ({ id }) => {
  const classes = useStyles();
  const user = useReactiveVar(userVar);
  const { data } = useCommentQuery({ variables: { id } });
  const [likeComment] = useLikeCommentMutation();

  if (data?.comment) {
    const {
      content,
      createdAt,
      likes,
      dislikes,
      author: {
        user: { fullName },
      },
      likedBy,
      dislikedBy,
    } = data.comment;

    const isLiked = likedBy?.some(({ id }) => id === user?.profile.id);
    const isDisliked = dislikedBy?.some(({ id }) => id === user?.profile.id);

    const handleLikeComment = async (isLiked: boolean): Promise<void> => {
      await likeComment({ variables: { data: { id, isLiked } } });
    };

    return (
      <Box display="flex" alignItems="flex-start" mt={2}>
        <Avatar />
        <Box flexGrow={1} ml={2}>
          <Typography className={classes.fontBold}>{fullName}</Typography>
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
  }

  return null;
};

export default Comment;
