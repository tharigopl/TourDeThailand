import { createContext, useReducer } from 'react';

export const UserContext = createContext({
  users: [],
  addUser: ({ fname, lname, mname, email, phoneno, street,
    unit,
    city,
    state,
    postalcode,
    country,
    dateofbirth,
    cntrytaxresidence,
    fundingsource}) => {},
  setUsers: (users) => {},
  deleteUser: (id) => {},
  updateUser: (id, { fname, lname, mname, email, phoneno, street,
    unit,
    city,
    state,
    postalcode,
    country,
    dateofbirth,
    cntrytaxresidence,
    fundingsource }) => {},
});

function userReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableUserIndex = state.findIndex(
        (user) => user.id === action.payload.id
      );
      const updatableUser = state[updatableUserIndex];
      const updatedItem = { ...updatableUser, ...action.payload.data };
      const updatedUsers = [...state];
      updatedUsers[updatableUserIndex] = updatedItem;
      return updatedUsers;
    case 'DELETE':
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
}

function UsersContextProvider({ children }) {
  const [usersState, dispatch] = useReducer(userReducer, []);

  function addUser(userData) {
    dispatch({ type: 'ADD', payload: userData });
  }

  function setUsers(users) {
    dispatch({ type: 'SET', payload: users });
  }

  function deleteUser(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateUser(id, userData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: userData } });
  }

  const value = {
    users: usersState,
    setUsers: setUsers,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UsersContextProvider;
