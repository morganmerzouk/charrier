import {getPopularImages} from 'utils/unsplash';

const images = getPopularImages();

const initialState = {
  availableImages: [],
  selectedImage: null,
  logo: null,
  drawing: null,
  width: 500,
  height: 500,
  text: 'Exemple de texte',
  textRect: [20, 20, 500 - 40, 500 - 40],
  textAttrs: {
    fontSize: 32,
    color: 'white',
    font: 'Georgia',
    bold: false,
    italic: false,
    lineHeight: 1.35,
    x: 150,
    y: 200,
  },
  focused: false,
  editing: false
};

export default function(state = initialState, action) {
  let textAttrs;
  switch (action.type) {
    case 'SET_FONT':
      textAttrs = Object.assign({}, state.textAttrs, { font: action.font });
      return Object.assign({}, state, { textAttrs });
    case 'SET_FONT_SIZE':
      textAttrs = Object.assign({}, state.textAttrs, { fontSize: action.size });
      return Object.assign({}, state, { textAttrs });
    case 'SET_BOLD':
      textAttrs = Object.assign({}, state.textAttrs, { bold: action.bold });
      return Object.assign({}, state, { textAttrs });
    case 'SET_ITALIC':
      textAttrs = Object.assign({}, state.textAttrs, { italic: action.italic });
      return Object.assign({}, state, { textAttrs });
    case 'SET_COLOR':
      textAttrs = Object.assign({}, state.textAttrs, { color: action.color });
      return Object.assign({}, state, { textAttrs });
    case 'SET_FILTER':
      return Object.assign({}, state, { filter: action.filter });
    case 'SELECT_IMAGE':
      return Object.assign({}, state, { selectedImage: action.image });
    case 'UPLOAD_LOGO':
      return Object.assign({}, state, { logo: action.logo });
    case 'SET_WIDTH':
      return Object.assign({}, state, { width: action.width });
    case 'SET_HEIGHT':
      return Object.assign({}, state, { height: action.height });
    case 'SET_TEXT':
      return Object.assign({}, state, { text: action.text });
    case 'SET_TEXT_RECT':
      return Object.assign({}, state, { textRect: action.rect });
    case 'SET_FOCUS':
      return Object.assign({}, state, { focused: action.part });
    case 'SET_EDITING':
      return Object.assign({}, state, { editing: true });
    case 'SET_NO_FOCUS':
      return Object.assign({}, state, { focused: false, editing: false });
    case 'SET_NO_EDITING':
      return Object.assign({}, state, { editing: false });
    case 'CACHE_DRAWING':
      return Object.assign({}, state, { drawing: action.drawing });
    case 'RECEIVE_IMAGES':
      return Object.assign({}, state, { availableImages: action.images });
    default:
      return state;
  }
}
