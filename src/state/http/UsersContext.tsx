import React, { PropsWithChildren, useContext, useState } from "react";
import { useAsyncCallback } from "react-async-hook";
import axios from "axios";
import { reformatBody } from "../../core";

const axiosInstance = axios.create({
  baseURL:
    process.env.API_BASE_URL ??
    "https://64fb09dbcb9c00518f7a8dd3.mockapi.io/api/v1",
  headers: {
    Accept: `application/json`,
    "Content-Type": "application/json",
  },
});

const Endpoints = {
  users: "/users",
  user: (userId: string) => `/users/${userId}`,
};

const { users, user } = Endpoints;

const UsersContext = React.createContext<any>({} as any);

export const UsersContextProvider: React.FC<PropsWithChildren<any>> = (
  props,
) => {
  const { children } = props;

  const [splits, setSplits] = useState<any>([]);
  const [newPersonQuery, setNewPersonQuery] = useState("");

  const getUsers = useAsyncCallback(async () => {
    const { data } = await axiosInstance.get(users);
    return data;
  });

  const getUser = useAsyncCallback(async (userId: string) => {
    const { data } = await axiosInstance.get(user(userId));
    return data;
  });

  const addUser = useAsyncCallback(async () => {
    if (newPersonQuery.length < 3) {
      return;
    } else {
      const newUser = {
        name: newPersonQuery,
      };
      const { data } = await axiosInstance.post(users, reformatBody(newUser));
      getUsers.execute();
      setNewPersonQuery("");
      return data;
    }
  });

  const addSplit = () => {
    setSplits([...splits, { price: 0, users: [] }]);
  };

  const setSplitProperty = (key: string, value: any, index: any) => {
    let newSplits = [...splits];
    newSplits[index][key] = value;
    setSplits(newSplits);
  };

  return (
    <UsersContext.Provider
      value={{
        getUsers,
        getUser,
        addUser,
        splits,
        setSplits,
        setNewPersonQuery,
        newPersonQuery,
        addSplit,
        setSplitProperty,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => useContext(UsersContext);
