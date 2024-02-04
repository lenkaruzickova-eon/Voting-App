import { fireEvent } from "@testing-library/react";
import { render } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { RECEIVE_USERS } from "../actions/users";

describe("LoginPage", () => {
  it("Invalid login", () => {
    const store = createStore(reducer, middleware);
    store.dispatch({
      type: RECEIVE_USERS,
      users: {
        sarahedo: {
          id: "sarahedo",
          password: "password123",
          name: "Sarah Edo",
          avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
        },
      },
    });
    var component = render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );
    const passwordElm = component.getByTestId("password-input");
    const usernameElm = component.getByTestId("username-input");
    const loginButton = component.getByTestId("login-button");

    fireEvent.change(passwordElm, { target: { value: "password123xxx" } });
    expect(passwordElm.value).toBe("password123xxx");

    fireEvent.change(usernameElm, { target: { value: "sarahedo" } });
    expect(usernameElm.value).toBe("sarahedo");
    fireEvent.click(loginButton);

    expect(component.getByTestId("invalid-message")).toBeInTheDocument();
  });

  it("matches the snapshot when it is not valid", () => {
    const store = createStore(reducer, middleware);
    store.dispatch({
      type: RECEIVE_USERS,
      users: {
        sarahedo: {
          id: "sarahedo",
          password: "password123",
          name: "Sarah Edo",
          avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
        },
      },
    });
    var component = render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );
    const passwordElm = component.getByTestId("password-input");
    const usernameElm = component.getByTestId("username-input");
    const loginButton = component.getByTestId("login-button");

    fireEvent.change(passwordElm, { target: { value: "password123xxx" } });
    expect(passwordElm.value).toBe("password123xxx");

    fireEvent.change(usernameElm, { target: { value: "sarahedo" } });
    expect(usernameElm.value).toBe("sarahedo");
    fireEvent.click(loginButton);

    expect(component).toMatchSnapshot();
  });
});
