import React from "react";
import { Menu } from "@mui/material";

function Header() {
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
  const [messageAnchorEl, setMessageAnchorEl] = React.useState<null | HTMLElement>(null);

  const isNotificationMenuOpen = Boolean(notificationAnchorEl);
  const isMessageMenuOpen = Boolean(messageAnchorEl);

  const handleNotificationMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMessageMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMessageAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleMessageMenuClose = () => {
    setMessageAnchorEl(null);
  };

  return (
    <header className="py-4 sticky top-0 bg-gradient-to-r from-bright-blue via-blue-500 to-blue-400">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="text-white">
          <span className="text-4xl tracking-wider font-bold cursor-pointer">
            Admin
          </span>
        </div>
        <div className="flex items-center space-x-4 text-white">
          <button
            id="notification-button"
            aria-controls={isNotificationMenuOpen ? "notification-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isNotificationMenuOpen ? "true" : undefined}
            onClick={handleNotificationMenuToggle}
          >
            <i className="fas fa-bell"></i> Notifications
          </button>
          <Menu
            id="notification-menu"
            anchorEl={notificationAnchorEl}
            open={isNotificationMenuOpen}
            onClose={handleNotificationMenuClose}
            MenuListProps={{
              "aria-labelledby": "notification-button",
            }}
          >
            <div className="flex justify-start items-center gap-x-2 pl-3 py-2 px-4">
              <img className="h-10 w-10 object-cover rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Profile Picture" />
              <div className="flex flex-col gap-y-0 justify-center items-baseline">
                <span className="text-sm text-gray-400">John liked your post</span>
                <span className="text-xs text-gray-200">1 minute ago</span>
              </div>
            </div>
            <div className="flex justify-start items-center gap-x-2 pl-3 py-2 px-4">
              <img className="h-10 w-10 object-cover rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Profile Picture" />
              <div className="flex flex-col gap-y-0 justify-center items-baseline">
                <span className="text-sm text-gray-400">John liked your post</span>
                <span className="text-xs text-gray-200">1 minute ago</span>
              </div>
            </div>
            <div className="flex justify-start items-center gap-x-2 pl-3 py-2 px-4">
              <img className="h-10 w-10 object-cover rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Profile Picture" />
              <div className="flex flex-col gap-y-0 justify-center items-baseline">
                <span className="text-sm text-gray-400">John liked your post</span>
                <span className="text-xs text-gray-200">1 minute ago</span>
              </div>
            </div>
            <div className="flex justify-center items-center pb-1 text-gray-300 text-sm">
                <a href="#">See more</a>
            </div>
          </Menu>

          <button
            id="message-button"
            aria-controls={isMessageMenuOpen ? "message-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isMessageMenuOpen ? "true" : undefined}
            onClick={handleMessageMenuToggle}
          >
            <i className="fas fa-envelope"></i> Messages
          </button>
          <Menu
            id="message-menu"
            anchorEl={messageAnchorEl}
            open={isMessageMenuOpen}
            onClose={handleMessageMenuClose}
            MenuListProps={{
              "aria-labelledby": "message-button",
            }}
          >
            <div className="flex justify-start items-center gap-x-2 pl-3 py-2 px-4">
              <img className="h-10 w-10 object-cover rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Profile Picture" />
              <div className="flex flex-col gap-y-0 justify-center items-baseline">
                <span className="text-sm text-gray-400">John has messaged you!</span>
                <span className="text-xs text-gray-200">1 minute ago</span>
              </div>
            </div>
            <div className="flex justify-start items-center gap-x-2 pl-3 py-2 px-4">
              <img className="h-10 w-10 object-cover rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Profile Picture" />
              <div className="flex flex-col gap-y-0 justify-center items-baseline">
                <span className="text-sm text-gray-400">John has messaged you!</span>
                <span className="text-xs text-gray-200">1 minute ago</span>
              </div>
            </div>
            <div className="flex justify-start items-center gap-x-2 pl-3 py-2 px-4">
              <img className="h-10 w-10 object-cover rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Profile Picture" />
              <div className="flex flex-col gap-y-0 justify-center items-baseline">
                <span className="text-sm text-gray-400">John has messaged you!</span>
                <span className="text-xs text-gray-200">1 minute ago</span>
              </div>
            </div>
            <div className="flex justify-center items-center pb-1 text-gray-300 text-sm">
                <a href="#">See more</a>
            </div>
          </Menu>
        </div>
      </nav>
    </header>
  );
}

export default Header;
