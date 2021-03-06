import _ from 'lodash';
import helpers from '../../common/helpers';
import { sourcesTypes } from '../constants';

const initialState = {
  persist: {
    selectedSources: [],
    expandedSources: []
  },

  view: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    sources: []
  },

  update: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    sourceId: '',
    delete: false
  }
};

const selectedIndex = function(state, source) {
  return _.findIndex(state.persist.selectedSources, nextSelected => {
    return nextSelected.id === _.get(source, 'id');
  });
};

const expandedIndex = function(state, source) {
  return _.findIndex(state.persist.expandedSources, nextSelected => {
    return nextSelected.id === _.get(source, 'id');
  });
};

const sourcesReducer = function(state = initialState, action) {
  switch (action.type) {
    // Persist
    case sourcesTypes.SELECT_SOURCE:
      // Do nothing if it is already selected
      if (selectedIndex(state, action.source) !== -1) {
        return state;
      }

      return helpers.setStateProp(
        'persist',
        {
          selectedSources: [...state.persist.selectedSources, action.source]
        },
        {
          state,
          reset: false
        }
      );

    case sourcesTypes.DESELECT_SOURCE:
      const index = selectedIndex(state, action.source);

      // Do nothing if it is not already selected
      if (index === -1) {
        return state;
      }

      return helpers.setStateProp(
        'persist',
        {
          selectedSources: [
            ...state.persist.selectedSources.slice(0, index),
            ...state.persist.selectedSources.slice(index + 1)
          ]
        },
        {
          state,
          reset: false
        }
      );

    case sourcesTypes.EXPAND_SOURCE:
      const expandIndex = expandedIndex(state, action.source);
      let newExpansions;

      if (expandIndex === -1) {
        newExpansions = [...state.persist.expandedSources];
      } else {
        newExpansions = [
          ...state.persist.expandedSources.slice(0, expandIndex),
          ...state.persist.expandedSources.slice(expandIndex + 1)
        ];
      }

      if (action.expandType) {
        newExpansions.push({
          id: action.source.id,
          expandType: action.expandType
        });
      }

      return helpers.setStateProp(
        'persist',
        {
          expandedSources: newExpansions
        },
        {
          state,
          reset: false
        }
      );

    // Error/Rejected
    case sourcesTypes.DELETE_SOURCE_REJECTED:
    case sourcesTypes.DELETE_SOURCES_REJECTED:
      return helpers.setStateProp(
        'update',
        {
          error: action.error,
          errorMessage: helpers.getErrorMessageFromResults(action.payload),
          delete: true
        },
        {
          state,
          initialState
        }
      );

    case sourcesTypes.DELETE_SOURCE_PENDING:
    case sourcesTypes.DELETE_SOURCES_PENDING:
      return helpers.setStateProp(
        'update',
        {
          pending: true,
          delete: true
        },
        {
          state,
          initialState
        }
      );

    case sourcesTypes.DELETE_SOURCE_FULFILLED:
    case sourcesTypes.DELETE_SOURCES_FULFILLED:
      return helpers.setStateProp(
        'update',
        {
          fulfilled: true,
          delete: true
        },
        {
          state,
          initialState
        }
      );

    case sourcesTypes.GET_SOURCES_REJECTED:
      return helpers.setStateProp(
        'view',
        {
          error: action.error,
          errorMessage: helpers.getErrorMessageFromResults(action.payload)
        },
        {
          state,
          initialState
        }
      );

    // Loading/Pending
    case sourcesTypes.GET_SOURCES_PENDING:
      return helpers.setStateProp(
        'view',
        {
          pending: true,
          sources: state.view.sources
        },
        {
          state,
          initialState
        }
      );

    // Success/Fulfilled
    case sourcesTypes.GET_SOURCES_FULFILLED:
      // Get resulting sources and update the selected state of each
      const sources = _.get(action, 'payload.data.results', []).map(nextSource => {
        return {
          ...nextSource,
          selected: selectedIndex(state, nextSource) !== -1
        };
      });
      return helpers.setStateProp(
        'view',
        {
          sources: sources,
          fulfilled: true
        },
        {
          state,
          initialState
        }
      );

    default:
      return state;
  }
};

export { initialState, sourcesReducer };

export default sourcesReducer;
