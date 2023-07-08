export const permissionReducer = (permission, action) => {
  switch (action.type) {
    case "Login":
      return action.result;

    case "Logout":
      return {};

    case "Save":
      return action.result;

    case "Clear":
      return {};

    default:
      throw Error("Unhandled permission action");
  }
};
