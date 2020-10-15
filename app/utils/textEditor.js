import React from 'react';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            end: 0
        };
    }

    setFromInput(selectionStart, selectionEnd) {
        this.start = selectionStart;
        this.end = selectionEnd;
    }

    setSelection(idx1, idx2, txt) {
        this.start = idx1;
        this.end = idx2;

        txt.setSelectionRange(idx1, idx2);
    }

    setCursor(idx, txt) {
        this.start = idx || 0;
        this.end = idx || 0;

        txt.setSelectionRange(this.start, this.end);
    }
}
