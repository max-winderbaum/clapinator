import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import About from './About';
import copy from 'copy-to-clipboard';
import textToEmoji from 'node-emoji';
import queryString from 'query-string';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const query= queryString.parse(window.location.search);

let emoji = `👏`;
const emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
const queryEmoji = query.emoji;
if (queryEmoji) {
  if (queryEmoji.match(emojiRegex)) {
    emoji = queryEmoji;
  }
  else {
    const searchEmoji = textToEmoji.search(queryEmoji)[0];
    if (searchEmoji) {
      emoji = searchEmoji.emoji;
    }
    // Unknown emoji specified in query -- possibly custom! If it starts/finishes with `:`, pass it through as a raw
    // string, since user may want to paste output into Slack (where the custom emoji is presumably supported).
    // Otherwise, default to 👏.
    if (/:.+:/.test(queryEmoji)) {
      emoji = queryEmoji;
    }
  }
}

const queryText = query.message;

function App() {
  const [textToClapinate, setTextToClapinate] = useState(queryText || 'Clap in a tor');
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
