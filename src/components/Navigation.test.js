import * as React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Navigation from "../components/Navigation";
import reducer from "../reducers";
import middleware from "../middleware";
import { SET_AUTHED_USER } from "../actions/authedUser";

describe("Navigation component", () => {
  it("Navigation has logout button", () => {
    const store = createStore(reducer, middleware);
    store.dispatch({
      type: SET_AUTHED_USER,
      user: {},
    });
    const component = render(
      <>
        <MemoryRouter>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </MemoryRouter>
      </>
    );
    const logoutButton = component.getByTestId("logout-button");
    expect(logoutButton).toBeInTheDocument();
  });
});
