import React, { lazy, Suspense, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Container,
  Tooltip,
  OverlayTrigger,
  Button,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faUsers,
  faBell,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { Backdrop } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducer/auth";
import toast from "react-hot-toast";
import { server } from "../../constants/config";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducer/misc";
import { resetNotificationCount } from "../../redux/reducer/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );

  const { notificationCount } = useSelector((state) => state.chat);
 


  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };
  const handleCloseSearch = () => {
    setIsSearch(false);
  };
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
  };
  const handleCloseNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount())
  };

  const handleCloseNotifications = () => {
    setIsNotification(false);
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const navigateToGroup = () => navigate("/groups");

  return (
    <>
      <Navbar bg="orange" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="d-none d-sm-block ">
            <Link to="/" className="text-white text-decoration-none">
              Dhee Chat
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleMobile}
            className="d-xs-block d-sm-none"
          >
            <FontAwesomeIcon icon={faBars} />
          </Navbar.Toggle>

          <Nav className="me-auto"></Nav>
          <Nav className="navbar-nav ">
            <NavItem title="Search" icon={faSearch} onClick={openSearch} />
            <NavItem title="New Group" icon={faPlus} onClick={openNewGroup} />
            <NavItem
              title="Manage Groups"
              icon={faUsers}
              onClick={navigateToGroup}
            />
            <NavItem
              title="Notification"
              icon={faBell}
              onClick={openNotification}
              value={notificationCount}
            />
            <NavItem
              title="Logout"
              icon={faSignOutAlt}
              onClick={logoutHandler}
            />
          </Nav>
        </Container>
      </Navbar>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog onClose={handleCloseSearch} />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog onClose={handleCloseNotifications} />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog onClose={handleCloseNewGroup} />
        </Suspense>
      )}
    </>
  );
};

const NavItem = ({ title, icon, onClick, value }) => {
  return (
      <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip">{title}</Tooltip>}
    >
      <Button variant="link" className="text-white p-0" onClick={onClick}>
        {value ? (
          <Badge pill variant="danger" className="position-relative">
            <FontAwesomeIcon icon={icon} size="lg" />
            <span className="badge-value">{value}</span>
          </Badge>
        ) : (
          <FontAwesomeIcon icon={icon} size="lg" />
        )}
      </Button>
    </OverlayTrigger>
  );
};
 
export default Header;
