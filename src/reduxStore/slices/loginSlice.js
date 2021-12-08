import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  verifyUser: { success: false },
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    auth: (state) => {
      // console.log("redux");
      // const requestOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     username: data.username,
      //     password: data.password,
      //   }),
      // };
      // fetch("/api/login", requestOptions)
      //   .then((response) => {
      //     if (!response.ok) throw new Error(response.status);
      //     else return response.json();
      //   })
      //   .then((data) => {
      //     //Set redux user status amd navigate to dashboard
      //     console.log(data);
      //     console.log("data from redux yee");
      //     // state.userData = data;
      //   })
      //   .catch((error) => {
      //     console.log("error: " + error);
      //     this.setState({ requestFailed: true });
      //   });
      // state.value = state.value + 1;
    },
    verifyUser: (state, action) => {
      state.verifyUser = action.payload;
    },
  },
});

export const { auth, verifyUser } = loginSlice.actions;

export default loginSlice.reducer;
