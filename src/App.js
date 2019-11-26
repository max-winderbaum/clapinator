import React, { useState } from 'react';
import './App.css';
import copy from 'copy-to-clipboard';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

function App() {
  const [textToClapinate, setTextToClapinate] = useState('Clap in a tor');
  const [notifyOpen, setNotifyOpen] = React.useState(false);

  const showCopySuccess = () => {
    setNotifyOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotifyOpen(false);
  };

  const handleTextInput = (event) => {
    setTextToClapinate(event.target.value);
  };
  const handleFocus = (event) => event.target.select();

  const clapinatedText = textToClapinate.trim().concat(' ').split(/\s/).join(` 👏 `);
  const handleCopy = () => {
    copy(clapinatedText);
    showCopySuccess();
  };

  const textStyle = {
    margin: '0 auto',
    marginTop: 10,
    maxWidth: 500,
    minHeight: 200,
    fontSize: 40,
    padding: 30,
  };

  const buttonStyle = {
    marginTop: 7,
    marginLeft: 20,
  };

  const snackbarStyle = {
    backgroundColor: 'green',
    borderRadius: 10,
  };

  return (
    <div className="App">
      <div>
        <TextField value={textToClapinate} onFocus={handleFocus} onChange={handleTextInput} id="outlined-basic" label="Text to Clapinate" variant="outlined" />
        <Button onClick={handleCopy} style={buttonStyle} size="large" variant="contained" color="primary">Copy</Button>
      </div>
      <div style={textStyle}>
        {clapinatedText}
      </div>
      <Snackbar
        style={snackbarStyle}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={notifyOpen}
        onClose={handleClose}
        autoHideDuration={2000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      >
        <SnackbarContent message={<span id="message-id">Copied to clipboard!</span>} style={snackbarStyle}></SnackbarContent>
      </Snackbar>
    </div>
  );
}

export default App;
