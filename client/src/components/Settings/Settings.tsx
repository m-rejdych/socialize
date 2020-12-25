import { useState } from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  makeStyles,
} from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';

import {
  useDeleteCommentMutation,
  useDeletePostMutation,
  Post,
} from '../../generated/graphql';

const useStyles = makeStyles((theme) => ({
  redText: {
    color: theme.palette.error.main,
  },
}));

interface Props {
  deletable?: boolean;
  editable?: boolean;
  postId?: string;
  commentId?: string;
  isFeed?: boolean;
  isProfile?: boolean;
  small?: boolean;
}

const Settings: React.FC<Props> = ({
  deletable,
  editable,
  postId,
  commentId,
  isFeed,
  isProfile,
  small,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [deletePost] = useDeletePostMutation({
    update(cache, { data }) {
      if (data?.deletePost) {
        const { id, profile } = data.deletePost;

        if (isFeed) {
          cache.modify({
            fields: {
              feed(existingPosts = [], { readField }) {
                return existingPosts.filter(
                  (post: Post) => readField('id', post) !== id,
                );
              },
            },
          });
        }

        if (isProfile) {
          cache.modify({
            id: cache.identify(profile),
            fields: {
              posts(existingPosts = [], { readField }) {
                return existingPosts.filter(
                  (post: Post) => readField('id', post) !== id,
                );
              },
            },
          });
        }
      }
    },
  });
  const [deleteComment] = useDeleteCommentMutation({
    update(cache, { data }) {
      if (data?.deleteComment) {
        const { post } = data.deleteComment;
        cache.modify({
          id: cache.identify(post),
          fields: {
            comments(_, { DELETE }) {
              return DELETE;
            },
          },
        });
      }
    },
  });

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleDelete = async (): Promise<void> => {
    if (postId) {
      await deletePost({ variables: { id: postId } });
      handleClose();
    } else if (commentId) {
      await deleteComment({ variables: { id: commentId } });
      handleClose();
    }
  };

  return (
    <Box>
      <IconButton size={small ? 'small' : 'medium'} onClick={handleOpen}>
        <SettingsIcon fontSize={small ? 'small' : 'default'} />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
          {editable && (
            <ListItem button>
              <ListItemText>Edit</ListItemText>
            </ListItem>
          )}
          {deletable && (
            <ListItem button>
              <ListItemText className={classes.redText} onClick={handleDelete}>
                Delete
              </ListItemText>
            </ListItem>
          )}
        </List>
      </Popover>
    </Box>
  );
};

export default Settings;
