import axios from "axios";
import { storeAuthToken } from "./../utils/Auth";
import { Form, redirect } from "react-router-dom";

export default function LoginPanel(props) {
  return (
    <div className="container">
      <h2>Login in</h2>
      <Form method="post">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            required
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const username = data.get("username");
  const password = data.get("password");
  console.log(data);
  console.log("login parameters: ", username, password);
  const response = await axios.post("http://localhost:8080/api/signUp", {
    username: username,
    password: password,
  });

  if (response.status === 401) {
    return response;
  }

  storeAuthToken(response.data);
  return redirect("/current");
}
