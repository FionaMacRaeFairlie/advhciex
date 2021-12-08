import React, { useEffect } from "react";
import LandingPage from "../LandingPage/LandingPage";
import AppRoutes from "../../routes/Router";
import { getHostels } from "../../reduxStore/slices/hostelSlice";
import { useDispatch } from "react-redux";
import "../../styles/index.scss";
import { useGetAuthorizationQuery } from "../../reduxStore/RTKfetch/apiSlice";
export default function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getHostels());
  // });
  // React.useEffect(() => {
  //   fetch("/api/hostels")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);
  // const { data, error, isLoading, isSuccess } = useGetAuthorizationQuery({});

  return (
    //<div className="container-fluid">
    <AppRoutes></AppRoutes>
    // </div>
  );
}
