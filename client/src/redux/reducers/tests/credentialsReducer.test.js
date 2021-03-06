import { credentialsTypes } from '../../constants/index';
import credentialsReducer from '../credentialsReducer';

const initialState = {
  persist: {
    selectedCredentials: [],
    expandedCredentials: []
  },

  view: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    credentials: []
  },

  update: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    credential: null,
    credentialType: '',
    show: false,
    add: false,
    edit: false,
    delete: false
  }
};

describe('CredentialsReducer', function() {
  it('should return the initial state', () => {
    expect(credentialsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SELECT_CREDENTIAL and DESELECT_CREDENTIAL', () => {
    let dispatched = {
      type: credentialsTypes.SELECT_CREDENTIAL,
      credential: { name: 'selected', id: 1 }
    };

    let resultState = credentialsReducer(undefined, dispatched);

    expect(resultState.persist.selectedCredentials).toHaveLength(1);
    expect(resultState.view).toEqual(initialState.view);
    expect(resultState.update).toEqual(initialState.update);

    dispatched.type = credentialsTypes.DESELECT_CREDENTIAL;
    resultState = credentialsReducer(resultState, dispatched);

    expect(resultState.persist.selectedCredentials).toHaveLength(0);
    expect(resultState.view).toEqual(initialState.view);
    expect(resultState.update).toEqual(initialState.update);
  });

  it('should handle CREATE_CREDENTIAL_SHOW', () => {
    let dispatched = {
      type: credentialsTypes.CREATE_CREDENTIAL_SHOW
    };

    let resultState = credentialsReducer(undefined, dispatched);

    expect(resultState.update.show).toBeTruthy();
    expect(resultState.update.add).toBeTruthy();
    expect(resultState.update.edit).toBeFalsy();
    expect(resultState.update.delete).toBeFalsy();

    expect(resultState.persist).toEqual(initialState.persist);
    expect(resultState.view).toEqual(initialState.view);

    dispatched = {
      type: credentialsTypes.UPDATE_CREDENTIAL_HIDE
    };
    resultState = credentialsReducer(resultState, dispatched);

    expect(resultState.update.show).toBeFalsy();
    expect(resultState.persist).toEqual(initialState.persist);
    expect(resultState.view).toEqual(initialState.view);
  });

  it('should handle EDIT_CREDENTIAL_SHOW', () => {
    let dispatched = {
      type: credentialsTypes.EDIT_CREDENTIAL_SHOW
    };

    let resultState = credentialsReducer(undefined, dispatched);

    expect(resultState.update.show).toBeTruthy();
    expect(resultState.update.add).toBeFalsy();
    expect(resultState.update.edit).toBeTruthy();
    expect(resultState.update.delete).toBeFalsy();

    expect(resultState.persist).toEqual(initialState.persist);
    expect(resultState.view).toEqual(initialState.view);

    dispatched = {
      type: credentialsTypes.UPDATE_CREDENTIAL_HIDE
    };
    resultState = credentialsReducer(resultState, dispatched);

    expect(resultState.update.show).toBeFalsy();
    expect(resultState.persist).toEqual(initialState.persist);
    expect(resultState.view).toEqual(initialState.view);
  });

  it('should handle ADD_CREDENTIAL_REJECTED', () => {
    let dispatched = {
      type: credentialsTypes.ADD_CREDENTIAL_REJECTED,
      error: true,
      payload: {
        message: 'BACKUP MESSAGE',
        response: {
          data: {
            detail: 'ADD ERROR'
          }
        }
      }
    };

    let resultState = credentialsReducer(undefined, dispatched);

    expect(resultState.update.error).toBeTruthy();
    expect(resultState.update.errorMessage).toEqual('ADD ERROR');
    expect(resultState.update.add).toBeTruthy();
    expect(resultState.update.pending).toBeFalsy();

    expect(resultState.persist).toEqual(initialState.persist);
    expect(resultState.view).toEqual(initialState.view);
  });

  it('should handle DELETE_CREDENTIAL_REJECTED', () => {
    let dispatched = {
      type: credentialsTypes.DELETE_CREDENTIAL_REJECTED,
      error: true,
      payload: {
        message: 'BACKUP MESSAGE',
        response: {
          data: {
            detail: 'DELETE ERROR'
          }
        }
      }
    };

    let resultState = credentialsReducer(undefined, dispatched);

    expect(resultState.update.error).toBeTruthy();
    expect(resultState.update.errorMessage).toEqual('DELETE ERROR');
    expect(resultState.update.delete).toBeTruthy();
    expect(resultState.update.pending).toBeFalsy();

    expect(resultState.persist).toEqual(initialState.persist);
    expect(resultState.view).toEqual(initialState.view);
  });

  it('should handle UPDATE_CREDENTIAL_REJECTED', () => {
    let dispatched = {
      type: credentialsTypes.UPDATE_CREDENTIAL_REJECTED,
      error: true,
      payload: {
        message: 'BACKUP MESSAGE',
        response: {
          data: {
            detail: 'UPDATE ERROR'
          }
        }
      }
    };

    let resultState = credentialsReducer(undefined, dispatched);

    expect(resultState.update.error).toBeTruthy();
    expect(resultState.update.errorMessage).toEqual('UPDATE ERROR');
    expect(resultState.update.edit).toBeTruthy();
    expect(resultState.update.pending).toBeFalsy();

    expect(resultState.persist).toEqual(initialState.persist);
    expect(resultState.view).toEqual(initialState.view);
  });

  it('should handle GET_CREDENTIALS_REJECTED', () => {
    let dispatched = {
      type: credentialsTypes.GET_CREDENTIALS_REJECTED,
      error: true,
      payload: {
        message: 'BACKUP MESSAGE',
        response: {
          data: {
            detail: 'GET ERROR'
          }
        }
      }
    };

    let resultState = credentialsReducer(undefined, dispatched);

    expect(resultState.view.error).toBeTruthy();
    expect(resultState.view.errorMessage).toEqual('GET ERROR');

    expect(resultState.persist).toEqual(initialState.persist);
    expect(resultState.update).toEqual(initialState.update);
  });

  it('should handle GET_CREDENTIALS_PENDING', () => {
    let dispatched = {
      type: credentialsTypes.GET_CREDENTIALS_PENDING
    };

    let resultState = credentialsReducer(undefined, dispatched);

    expect(resultState.view.pending).toBeTruthy();

    expect(resultState.persist).toEqual(initialState.persist);
    expect(resultState.update).toEqual(initialState.update);
  });

  it('should handle GET_CREDENTIALS_FULFILLED', () => {
    let dispatched = {
      type: credentialsTypes.GET_CREDENTIALS_FULFILLED,
      payload: {
        data: {
          results: [
            {
              name: '1',
              id: 1
            },
            {
              name: '2',
              id: 2
            },
            {
              name: '3',
              id: 3
            },
            {
              name: '4',
              id: 4
            }
          ]
        }
      }
    };

    let resultState = credentialsReducer(undefined, dispatched);

    expect(resultState.view.fulfilled).toBeTruthy();
    expect(resultState.view.credentials).toHaveLength(4);

    expect(resultState.persist).toEqual(initialState.persist);
    expect(resultState.update).toEqual(initialState.update);
  });

  it('should maintain selections on new data', () => {
    let dispatched = {
      type: credentialsTypes.GET_CREDENTIALS_FULFILLED,
      error: true,
      payload: {
        data: {
          results: [
            {
              name: '1',
              id: 1
            },
            {
              name: '2',
              id: 2
            },
            {
              name: '3',
              id: 3
            },
            {
              name: '4',
              id: 4
            }
          ]
        }
      }
    };

    let resultState = credentialsReducer(undefined, dispatched);

    expect(resultState.view.fulfilled).toBeTruthy();
    expect(resultState.view.credentials).toHaveLength(4);

    dispatched = {
      type: credentialsTypes.SELECT_CREDENTIAL,
      credential: { name: '1', id: 1 }
    };

    resultState = credentialsReducer(resultState, dispatched);

    expect(resultState.persist.selectedCredentials).toHaveLength(1);

    dispatched = {
      type: credentialsTypes.SELECT_CREDENTIAL,
      credential: { name: '2', id: 2 }
    };

    resultState = credentialsReducer(resultState, dispatched);

    expect(resultState.persist.selectedCredentials).toHaveLength(2);

    dispatched = {
      type: credentialsTypes.GET_CREDENTIALS_FULFILLED,
      error: true,
      payload: {
        data: {
          results: [
            {
              name: '1',
              id: 1
            },
            {
              name: '5',
              id: 5
            },
            {
              name: '6',
              id: 6
            },
            {
              name: '7',
              id: 7
            }
          ]
        }
      }
    };

    resultState = credentialsReducer(resultState, dispatched);
    expect(resultState.persist.selectedCredentials).toHaveLength(2);
  });
});
