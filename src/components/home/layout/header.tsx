import React, { useCallback, memo } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Badge, Tooltip } from "@mui/material";
import { hasAdminAccess } from "../../../common/services/utilities/jwtUtils";
import { confirmAlert } from "../../../common/services/alertifyService";
import { getUserIdFromToken } from "../../../common/services/utilities/jwtUtils";

function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userId = getUserIdFromToken();

  const handleLogout = useCallback(() => {
    confirmAlert(
      "Question",
      "Are you sure to logout?",
      () => {
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      },
      () => {}
    );
  }, [navigate]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <header className="bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 py-4 sticky top-0 z-10">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="text-white">
          <span
            className="text-4xl tracking-wider font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Connectify
          </span>
        </div>
        <ul className="flex space-x-4 text-xl">
          <li>
            <Tooltip title="Home">
              <NavLink
                to=""
                className="text-white hover:text-purple-300 transition duration-300"
              >
                <i className="fa fa-house"></i>
              </NavLink>
            </Tooltip>
          </li>
          {hasAdminAccess() && (
            <li>
              <Tooltip title="Admin page">
                <NavLink
                  to="/admin"
                  className="text-white hover:text-purple-300 transition duration-300"
                >
                  <i className="fas fa-dashboard"></i>
                </NavLink>
              </Tooltip>
            </li>
          )}
          <li>
            <Tooltip title="Explore">
              <NavLink
                to="/explore"
                className="text-white hover:text-purple-300 transition duration-300"
              >
                <i className="fa fa-bolt"></i>
              </NavLink>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Login">
              <NavLink
                to="/auth/login"
                className="text-white hover:text-purple-300 transition duration-300"
              >
                <i className="fas fa-user"></i>
              </NavLink>
            </Tooltip>
          </li>
          <li>
            <button
              id="basic-button"
              aria-controls={anchorEl ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open}
              onClick={handleClick}
              className="text-white"
            >
              <i className="fas fa-robot"></i>
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => navigate(`/profile/${userId}`)}
                disableRipple
              >
                <span className="text-gray-500">
                  <SettingsIcon sx={{ mr: 1 }} />
                  Profile
                </span>
              </MenuItem>
              <MenuItem onClick={() => navigate("/account/")} disableRipple>
                <span className="text-gray-500">
                  <AccountCircleIcon sx={{ mr: 1 }} />
                  My account
                </span>
              </MenuItem>
              <MenuItem onClick={() => handleLogout()} disableRipple>
                <span className="text-gray-500">
                  <ExitToAppIcon sx={{ mr: 1 }} />
                  Logout
                </span>
              </MenuItem>
            </Menu>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
