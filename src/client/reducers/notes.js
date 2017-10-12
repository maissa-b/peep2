import { map, filter, indexOf } from 'ramda';
import { format } from 'date-fns';
import {
  NOTES_DELETED,
  NOTE_ADDED,
  NOTES_LOADED,
  FILTER_NOTES_LIST,
  SORT_NOTES_LIST,
} from '../actions/notes';

const formatString = 'dddd, MMMM Do YYYY';

const make = note => {
  const updatedNote = {
    ...note,
    typeName: 'note',
    createdAt: note.createdAt
      ? format(note.createdAt, formatString)
      : undefined,
  };
  updatedNote.updatedAt = note.updatedAt
    ? format(note.updatedAt, formatString)
    : format(note.createdAt, formatString);
  return updatedNote;
};

const makeAll = map(n => make(n));

const initialState = {
  data: [],
  sort: { by: '', order: '' },
  filter: '',
};

const notes = (state = initialState, action) => {
  switch (action.type) {
    case NOTE_ADDED:
      return {
        ...state,
        data: [...state.data, make(action.payload)],
      };
    case NOTES_LOADED:
      return { ...state, data: makeAll(action.payload) };
    case FILTER_NOTES_LIST:
      return { ...state, filter: action.filter };
    case SORT_NOTES_LIST: {
      const { by, order } = state.sort;
      const newOrder = by === action.sortBy && order === 'asc' ? 'desc' : 'asc';
      return { ...state, sort: { by: action.sortBy, order: newOrder } };
    }
    case NOTES_DELETED:
      return {
        ...state,
        data: filter(
          note => indexOf(note._id, action.payload._id) === -1,
          state.data,
        ),
      };
    default:
      return state;
  }
};

export default notes;
