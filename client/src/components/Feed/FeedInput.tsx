import { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { gql } from '@apollo/client';

import { useUserQuery, useCreatePostMutation } from '../../generated/graphql';

const useStyles = makeStyles((theme) => ({
  inputBackground: {
    backgroundColor: '#FAFAFA',
  },
  fullWidth: {
    width: '100%',
  },
}));

const FeedInput: React.FC = () => {
  const [value, setValue] = useState('');
  const { data: userData } = useUserQuery();
  const classes = useStyles();
  const [createPost] = useCreatePostMutation({
    update(cache, { data }) {
      if (data?.createPost) {
        const {
          createPost: { post },
        } = data;
        cache.modify({
          fields: {
            feed(existingPosts = []) {
              const newPost = cache.writeFragment({
                data: post,
                fragment: gql`
                  fragment NewPost on Feed {
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
                `,
              });
              return [newPost, ...existingPosts];
            },
          },
        });
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
    await createPost({ variables: { content: value } });
    setValue('');
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
            <Button type="submit" color="secondary">
              Post
            </Button>
          ),
        }}
        value={value}
        onChange={handleChange}
        onKeyPress={(e) => handleEnter(e)}
      />
    </form>
  );
};

export default FeedInput;
