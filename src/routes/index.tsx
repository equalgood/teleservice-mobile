import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../modules/auth/pages/Login";
import LandingPage from "../modules/landing/pages/LandingPage";
import MyDevices from "../modules/devices/pages/MyDevices";
import DeviceInfo from "../modules/devices/pages/DeviceInfo";
import TicketSelection from "../modules/support/pages/TicketSelection";
import TicketDescription from "../modules/support/pages/TicketDescription";
import { useTypedSelector } from "../hooks/useTypedSelector";

const AppRouter = () => {
  const { isLoggedIn } = useTypedSelector((state) => state.authReducer);

  return (
    <Routes>
      {!isLoggedIn ? (
        <React.Fragment>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/devices" element={<MyDevices />} />
          <Route path="/device/:id" element={<DeviceInfo />} />
          <Route path="/tickets" element={<TicketSelection />} />
          <Route path="/ticket/:id" element={<TicketDescription />} />
          <Route path="*" element={<Navigate to="/" />} />
        </React.Fragment>
      )}
    </Routes>
  );
};

export default AppRouter;
