import { useState } from 'react';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { Box, Popover, IconButton } from '@material-ui/core';
import { InsertEmoticon } from '@material-ui/icons';

interface Props {
  handleSelect: (_: MouseEvent, data: IEmojiData) => void;
}

const EmojiPicker: React.FC<Props> = ({ handleSelect }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <InsertEmoticon color="disabled" />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Picker onEmojiClick={handleSelect} />
      </Popover>
    </Box>
  );
};

export default EmojiPicker;
