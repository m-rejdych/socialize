import { useState } from 'react';
import { TextField, Button, makeStyles, Box } from '@material-ui/core';
import { gql } from '@apollo/client';
import { IEmojiData } from 'emoji-picker-react';

import { useUserQuery, useCreatePostMutation } from '../../generated/graphql';
import EmojiPicker from '../EmojiPicker';

const useStyles = makeStyles((theme) => ({
  inputBackground: {
    backgroundColor: '#FAFAFA',
  },
  fullWidth: {
    width: '100%',
  },
}));

const fragment = gql`
  fragment NewPost on Posts {
    id
    content
    createdAt
    likes
    dislikes
    author {
      id
      user {
        id
        fullName
      }
    }
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

interface Props {
  isFeed?: boolean;
  isProfile?: boolean;
}

const PostInput: React.FC<Props> = ({ isFeed, isProfile }) => {
  const [value, setValue] = useState('');
  const { data: userData } = useUserQuery();
  const classes = useStyles();
  const [createPost] = useCreatePostMutation({
    update(cache, { data }) {
      if (data?.createPost) {
        const {
          createPost: { post, profile },
        } = data;

        if (isFeed) {
          cache.modify({
            fields: {
              feed(existingPosts = []) {
                const newPost = cache.writeFragment({
                  data: post,
                  fragment,
                });

                return [newPost, ...existingPosts];
              },
            },
          });
        } else if (isProfile) {
          cache.modify({
            id: cache.identify(profile),
            fields: {
              posts(existingPosts = []) {
                const newPost = cache.writeFragment({
                  data: post,
                  fragment,
                });

                return [newPost, ...existingPosts];
              },
            },
          });
        }
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) handleCreatePost(e);
  };

  const handleCreatePost = async (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLDivElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (value.trim().length > 0) {
      await createPost({ variables: { content: value } });
      setValue('');
    }
  };

  const handleSelectEmoji = (_: MouseEvent, emojiObject: IEmojiData): void => {
    const { emoji } = emojiObject;
    setValue(`${value}${emoji}`);
  };

  return (
    <form className={classes.fullWidth} onSubmit={handleCreatePost}>
      <TextField
        fullWidth
        multiline
        placeholder={`What's new, ${userData?.user.firstName || ''}?`}
        variant="outlined"
        InputProps={{
          className: classes.inputBackground,
          endAdornment: (
            <Box display="flex">
              <EmojiPicker handleSelect={handleSelectEmoji} />
              <Button
                disabled={value.trim().length === 0}
                type="submit"
                color="secondary"
              >
                Post
              </Button>
            </Box>
          ),
        }}
        value={value}
        onChange={handleChange}
        onKeyPress={(e) => handleEnter(e)}
      />
    </form>
  );
};

export default PostInput;
