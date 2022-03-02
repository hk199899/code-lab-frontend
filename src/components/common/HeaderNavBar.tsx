import React, { FC } from "react";
import { Button, Menu, PageHeader, Typography } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Header } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLogin, showSignUp } from "../../reducers/globalSlice";
import useUserData from "../../hooks/useUserData";
import { AiOutlineUser } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import { appPaths } from "../../utils/path";
import { RootState } from "../../store";
export const HeaderNavBar: FC = () => {
  const dispatch = useDispatch();
  const { isLoggedin, userData } = useUserData();
  const { signout } = useAuth();
  return (
    <Header style={{ backgroundColor: "#FFFFFF" }}>
      <span
        style={{
          fontSize: 16,
          fontWeight: "bold",
          float: "left",
          marginRight: 12,
        }}
      >
        Code lab
      </span>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link to={appPaths.workspaces}>Workspaces</Link>
        </Menu.Item>
        {isLoggedin ? (
          <SubMenu
            icon={<AiOutlineUser />}
            style={{ marginLeft: "auto" }}
            title={`${userData?.username}`}
          >
            <Menu>
              <Menu.Item
                onClick={() => {
                  signout();
                }}
              >
                Sign Out
              </Menu.Item>
            </Menu>
          </SubMenu>
        ) : (
          <>
            <Menu.Item style={{ marginLeft: "auto" }}>
              <Button
                onClick={(e) => {
                  dispatch(showLogin());
                  e.stopPropagation();
                }}
              >
                Sign In
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                type="primary"
                onClick={(e) => {
                  dispatch(showSignUp());
                  e.stopPropagation();
                }}
              >
                Sign up
              </Button>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};
