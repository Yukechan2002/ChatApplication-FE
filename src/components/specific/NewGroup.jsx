import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { setIsNewGroup } from "../../redux/reducer/misc";
import { useInputValidation } from "6pp";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";
import UserItems from "../shared/UserItems";
import "./NewGroup.css";
import { Skeleton } from "@mui/material";
import toast from "react-hot-toast";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  if (!isNewGroup) return null;

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");
    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <div className="new-group-overlay">
      <div className="new-group-dialog">
        <h3 className="text-center">New Group</h3>

        <div className="form-group">
          <label htmlFor="group-name">Group Name</label>
          <input
            type="text"
            id="group-name"
            className="form-control"
            value={groupName.value}
            onChange={groupName.changeHandler}
          />
        </div>

        <p className="members-title">Members</p>
        <div className="members-list">
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((friend) => (
              <UserItems
                user={friend}
                key={friend._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(friend._id)}
              />
            ))
          )}
        </div>

        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={closeHandler}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGroup;
