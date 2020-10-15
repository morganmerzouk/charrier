import React from 'react';
import {connect} from 'react-redux';
import {setFont, setFontSize, setColor, setBold, setItalic, setWidth, setHeight} from 'actions';

import Card from 'components/Card';
import TextPropertiesPicker from 'components/TextPropertiesPicker';
import SizePicker from 'components/SizePicker';
import DownloadButton from 'components/DownloadButton';
import Upload from 'components/Upload';

const RightSidebar = ({ drawing, textAttrs, onFontChange, onFontSizeChange, onColorChange, onBoldChange, onItalicChange, width, onWidthSelect, height, onHeightSelect }) => {
  return <div className="Sidebar">
    <Card title="Format">
      <SizePicker width={width} onWidthSelect={onWidthSelect} height={height} onHeightSelect={onHeightSelect} />
    </Card>
    <Card title="Logo">
      <Upload />
    </Card>
    <Card title="Texte">
      <TextPropertiesPicker
        textAttrs={textAttrs}
        onFontChange={onFontChange}
        onFontSizeChange={onFontSizeChange}
        onColorChange={onColorChange}
        onBoldChange={onBoldChange}
        onItalicChange={onItalicChange} />
    </Card>
    <DownloadButton drawing={drawing} />
  </div>;
};

const mapStateToProps = (state) => ({
  textAttrs: state.textAttrs,
  filter: state.filter,
  width: state.width,
  height: state.height,
  drawing: state.drawing
});

const mapDispatchToProps = (dispatch) => ({
  onFontChange(font) {
    dispatch(setFont(font));
  },

  onFontSizeChange(size) {
    dispatch(setFontSize(size));
  },

  onColorChange(color) {
    dispatch(setColor(color));
  },

  onBoldChange(bold) {
    dispatch(setBold(bold));
  },

  onItalicChange(italic) {
    dispatch(setItalic(italic));
  },

  onHeightSelect(height) {
    dispatch(setHeight(parseInt(height)));
  },

  onWidthSelect(width) {
    dispatch(setWidth(parseInt(width)));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
