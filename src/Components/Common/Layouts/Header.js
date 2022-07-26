import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  // const { userProfile } = useSelector(({ Profile }) => Profile);

  useEffect(() => {
    // if (!userProfile) {
    //   dispatch(GetUserProfile());
    // }

    return () => {};
  }, [dispatch]);

  return <header></header>;
}

export default Header;
