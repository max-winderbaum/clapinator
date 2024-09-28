import React from 'react';

const style = {
    position: 'fixed',
    left: 0,
    bottom: 0,
    right: 0,
    paddingLeft: 10,
    paddingBottom: 10,
    textAlign: 'left',
    zIndex: 100,
    backgroundColor: 'white',
    fontSize: 16,
};

function About() {
    return (
        <div style={style}>
            <div>Created by <a href="https://maxwinderbaum.com">Max Winderbaum</a></div>
        </div>
    );
}

export default About;