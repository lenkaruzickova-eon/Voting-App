import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import NewPoolPage from "./NewPoolPage";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { SET_AUTHED_USER } from "../actions/authedUser";
import { RECEIVE_USERS } from "../actions/users";
import { RECEIVE_QUESTIONS } from "../actions/questions";

describe("New Pool Page", () => {
  it("New pool page is correctly filled", () => {
    const store = createStore(reducer, middleware);
    store.dispatch({
      type: RECEIVE_USERS,
      users: {
        sarahedo: {
          id: "sarahedo",
          password: "password123",
          name: "Sarah Edo",
          avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
          questions: [],
        },
      },
    });
    store.dispatch({
      type: SET_AUTHED_USER,
      user: {
        userName: "sarahedo",
      },
    });
    store.dispatch({
      type: RECEIVE_QUESTIONS,
      questions: {},
    });
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <NewPoolPage />
        </Provider>
      </MemoryRouter>
    );

    const firstOptionElm = component.getByTestId("new-pool-first");
    const secondOptionElm = component.getByTestId("new-pool-second");
    const submitButton = component.getByTestId("submit-button");

    fireEvent.change(firstOptionElm, { target: { value: "option one" } });
    expect(firstOptionElm.value).toBe("option one");

    fireEvent.change(secondOptionElm, { target: { value: "option two" } });
    expect(secondOptionElm.value).toBe("option two");
    fireEvent.click(submitButton);
  });

  it("New pool page is missing first option and button is disabled", () => {
    const store = createStore(reducer, middleware);
    store.dispatch({
      type: RECEIVE_USERS,
      users: {
        sarahedo: {
          id: "sarahedo",
          password: "password123",
          name: "Sarah Edo",
          avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
          questions: [],
        },
      },
    });
    store.dispatch({
      type: SET_AUTHED_USER,
      user: {
        userName: "sarahedo",
      },
    });
    store.dispatch({
      type: RECEIVE_QUESTIONS,
      questions: {},
    });
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <NewPoolPage />
        </Provider>
      </MemoryRouter>
    );

    const firstOptionElm = component.getByTestId("new-pool-first");
    const secondOptionElm = component.getByTestId("new-pool-second");
    const submitButton = component.getByTestId("submit-button");

    fireEvent.change(firstOptionElm, { target: { value: "" } });
    expect(firstOptionElm.value).toBe("");

    fireEvent.change(secondOptionElm, { target: { value: "option two" } });
    expect(secondOptionElm.value).toBe("option two");

    expect(submitButton).toBeDisabled();
  });

  it("New pool page is missing second option and button is disabled", () => {
    const store = createStore(reducer, middleware);
    store.dispatch({
      type: RECEIVE_USERS,
      users: {
        sarahedo: {
          id: "sarahedo",
          password: "password123",
          name: "Sarah Edo",
          avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
          questions: [],
        },
      },
    });
    store.dispatch({
      type: SET_AUTHED_USER,
      user: {
        userName: "sarahedo",
      },
    });
    store.dispatch({
      type: RECEIVE_QUESTIONS,
      questions: {},
    });
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <NewPoolPage />
        </Provider>
      </MemoryRouter>
    );

    const firstOptionElm = component.getByTestId("new-pool-first");
    const secondOptionElm = component.getByTestId("new-pool-second");
    const submitButton = component.getByTestId("submit-button");

    fireEvent.change(firstOptionElm, { target: { value: "first" } });
    expect(firstOptionElm.value).toBe("first");

    fireEvent.change(secondOptionElm, { target: { value: "" } });
    expect(secondOptionElm.value).toBe("");

    expect(submitButton).toBeDisabled();
  });
});
