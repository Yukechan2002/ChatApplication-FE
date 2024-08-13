import React, { memo } from "react";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";


import "./Notifications.css"; // Import the CSS file for styling
import { Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducer/misc";

const Notifications = () => {

    const { isNotification } = useSelector((state) => state.misc);
    const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

    const dispatch = useDispatch();

    const closeHandler = () => dispatch(setIsNotification(false));
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  useErrors([{ error, isError }]);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...", { requestId: _id, accept });
  };


  return (
    <div
      className={`modal ${isNotification ? "show" : ""}`}
      tabIndex="-1"
      style={{ display: isNotification ? "block" : "none" }}
    >
      <div className="notifications-overlay">
        <div className="notifications-dialog">
          <button className="close-button" onClick={closeHandler}>
            X
          </button>
          <h3 className="text-center">Notifications</h3>

          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              {data?.allRequests.length > 0 ? (
                data.allRequests.map(({ sender, _id }) => (
                  <NotificationItem
                    sender={sender}
                    _id={_id}
                    handler={friendRequestHandler}
                    key={_id}
                  />
                ))
              ) : (
                <p className="text-center">0 Notifications</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <div className="notification-item">
      <div className="notification-content">
        <img src={avatar} alt={name} className="notification-avatar" />
        <div className="notification-info">
          <p className="notification-text">
            {`${name} sent you a friend request.`}
          </p>
          <div className="notification-buttons">
            <button
              className="btn btn-primary"
              onClick={() => handler({ _id, accept: true })}
            >
              Accept
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handler({ _id, accept: false })}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Notifications;
