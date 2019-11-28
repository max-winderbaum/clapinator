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
            <div>Created by Max Winderbaum</div>
            <a href="https://maxwinderbaum.com">site</a> | <a href="https://www.linkedin.com/in/maxwinderbaum/">linkedin</a> | <a href="https://blog.maxwinderbaum.com/">blog</a>
        </div>
    );
}

export default About;