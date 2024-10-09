import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ token: "mockToken" }),
  })
);

afterEach(() => {
  jest.clearAllMocks();
});

describe("Login Component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });

  test("renders login form correctly", () => {
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("displays validation error when fields are empty", async () => {
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    expect(await screen.findByText(/email required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password required/i)).toBeInTheDocument();
  });

  test("displays email format error", async () => {
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(await screen.findByText(/email is not valid/i)).toBeInTheDocument();
  });

  test("displays password length error", async () => {
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(await screen.findByText(/password lenght should be atleast 6 char/i)).toBeInTheDocument();
  });

  test("calls fetch with correct parameters and navigates on successful login", async () => {
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "test@example.com",
          password: "123456",
        }),
      });
    });
  });

  test("displays error message on failed login", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));
    
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Wrong password/i)).toBeInTheDocument();
    });
  });
});
