import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import About from './About';
import copy from 'copy-to-clipboard';
import queryString from 'query-string';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const emoji = queryString.parse(window.location.search).emoji || `👏`;

function App() {
  const [textToClapinate, setTextToClapinate] = useState('Clap in a tor');
  const [notifyOpen, setNotifyOpen] = React.useState(false);
  const inputEl = useRef(null);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.querySelector('input').focus();
    }
  }, [inputEl]);

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

  const clapinatedText = textToClapinate.trim().concat(' ').split(/\s+/).join(` ${emoji} `);
  const handleCopy = (event) => {
    copy(clapinatedText);
    showCopySuccess();
    event.preventDefault();
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
    borderRadius: 4,
  };

  return (
    <div className="App">
      <form onSubmit={handleCopy}>
        <TextField autoFocus ref={inputEl} value={textToClapinate} onFocus={handleFocus} onChange={handleTextInput} id="outlined-basic" label="Text to Clapinate" variant="outlined" />
        <Button onClick={handleCopy} style={buttonStyle} size="large" variant="contained" color="primary">Copy</Button>
      </form>
      <div style={textStyle}>
        {clapinatedText}
      </div>
      <Snackbar
        style={snackbarStyle}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
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
      <About />
    </div>
  );
}

export default App;
