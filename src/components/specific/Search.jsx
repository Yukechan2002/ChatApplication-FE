import { useInputValidation } from "6pp";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hooks";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducer/misc";
import UserItems from "../shared/UserItems";
import "./Search.css"; // Import the CSS file for styling

const Search = () => {
  const dispatch = useDispatch();

  const { isSearch } = useSelector((state) => state.misc);
  const search = useInputValidation("");
  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );
  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };
  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <div
      className={`modal ${isSearch ? "show" : ""}`}
      tabIndex="-1"
      style={{ display: isSearch ? "block" : "none" }}
    >
      <div className="search-overlay">
        <div className="search-dialog">
          <button className="close-button" onClick={searchCloseHandler}>
            X
          </button>
          <h3 className="text-center">Find People</h3>
          <div className="search-input-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              id="search-input"
              name="search"
              value={search.value}
              onChange={search.changeHandler}
              className="form-control"
              placeholder="Search..."
            />
          </div>
          <div className="search-results-container">
            <ul className="list-group">
              {users.map((user) => (
                <UserItems
                  user={user}
                  key={user._id}
                  handler={addFriendHandler}
                  handlerIsLoading={isLoadingSendFriendRequest}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
