import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  CreateMember,
  GetCommunity,
} from "../../../Store/Reducers/PeerBoardReducer";
import { GetUserProfile } from "../../../Store/Reducers/ProfileReducer";
import { COMMUNITYLINK } from "../../../Utilities/Enums";
import { BackGround, Icon, Logo } from "../../../Utilities/Icons";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userProfile } = useSelector(({ Profile }) => Profile);
  const [icon, setIcon] = useState(Logo.BCT_White);
  window.addEventListener(
    "scroll",
    function (event) {
      var top = this.scrollY;
      if (top > 30) {
        setIcon(Logo.BCT_Black);
      } else {
        setIcon(Logo.BCT_White);
      }
    },
    false
  );

  // useEffect(() => {
  //   if (userProfile) {
  //     dispatch(
  //       CreateMember({
  //         email: userProfile?.email,
  //         name: userProfile?.first_name,
  //         last_name: userProfile?.last_name,
  //         bio: "Space X and Tesla Motors CEO and cool guy",
  //         external_id: userProfile?.id,
  //       })
  //     );
  //   }

  //   return () => {};
  // }, [userProfile]);
  useEffect(() => {
    if (!userProfile) {
      dispatch(GetUserProfile());
    }

    return () => {};
  }, [dispatch]);

  return (
    <header
      className={`main-header ${
        location.pathname === "/" ? "header-home" : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <nav className="navbar col-md-12">
            <div className="col-md-2">
              <div className="bct-logo">
                <NavLink navbar-brand="true" to="/">
                  <img
                    alt="myimg"
                    src={Logo.BCT_White}
                    className="normal-logo"
                  />
                  <img
                    alt="myimg"
                    src={Logo.BCT_Black}
                    className="sticky-logo"
                  />
                </NavLink>
              </div>
            </div>
            <div className="col-md-10">
              <div className="navigation collapse navbar-collapse">
                <ul>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/events">
                      Events
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={userProfile ? "/community" : "/login"}
                    >
                      Community
                    </NavLink>
                  </li>
                  {userProfile && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/bcconnect">
                        BC-Connect
                      </NavLink>
                    </li>
                  )}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/videos">
                      Videos
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a href="/user/#feature">Feature</a>
                  </li>

                  {userProfile ? (
                    <li className="nav-item">
                      <div className="dropdown">
                        <a
                          className="dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          More
                          <svg
                            width="14"
                            height="8"
                            viewBox="0 0 14 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 1.5L7.2069 6.5L13 1.5"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <NavLink to="/myevents">My Events</NavLink>
                          <NavLink to="/myplaylist">My Playlist</NavLink>
                          <NavLink to="/payouts">Trxns & Payouts</NavLink>
                        </div>
                      </div>
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
                <ul>
                  {userProfile ? (
                    <li className="nav-item header-profile">
                      <NavLink className="nav-link" to="/profile">
                        <img
                          alt="myimg"
                          src={userProfile?.image || BackGround.Upload}
                        />
                        {userProfile?.first_name}
                      </NavLink>
                    </li>
                  ) : (
                    <></>
                  )}
                  <li className="nav-item header-btn">
                    {userProfile ? (
                      <NavLink to="#!" className="nav-link ">
                        Marketplace <strong>👋</strong>
                      </NavLink>
                    ) : (
                      <NavLink className="nav-link" to="/login">
                        SignIn
                      </NavLink>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
