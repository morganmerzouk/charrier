export const setFont = (font) => ({
  type: 'SET_FONT',
  font
});

export const setFontSize = (size) => ({
  type: 'SET_FONT_SIZE',
  size
});

export const setBold = (bold) => ({
  type: 'SET_BOLD',
  bold
});

export const setItalic = (italic) => ({
  type: 'SET_ITALIC',
  italic
});

export const setColor = (color) => ({
  type: 'SET_COLOR',
  color
});

export const selectImage = (image) => ({
  type: 'SELECT_IMAGE',
  image
});

export const uploadLogo = (logo) => ({
  type: 'UPLOAD_LOGO',
  logo
});

export const setHeight = (height) => ({
  type: 'SET_HEIGHT',
  height
});

export const setWidth = (width) => ({
  type: 'SET_WIDTH',
  width
});

export const setText = (text) => ({
  type: 'SET_TEXT',
  text
});

export const setTextRect = (rect) => ({
  type: 'SET_TEXT_RECT',
  rect
});

export const setFocus = (part) => ({
  type: 'SET_FOCUS',
  part
});

export const setEditing = () => ({
  type: 'SET_EDITING'
});

export const setNoFocus = () => ({
  type: 'SET_NO_FOCUS'
});

export const setNoEditing = () => ({
  type: 'SET_NO_EDITING'
});

export const cacheDrawing = (drawing) => ({
  type: 'CACHE_DRAWING',
  drawing
});