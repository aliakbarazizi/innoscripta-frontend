import { useQuery } from "@tanstack/react-query";
import { ChevronDown, UserCircle } from "@untitled-ui/icons-react";
import { useState } from "react";

import Button from "../../components/core/Button";
import DropDownMenu from "../../components/helper/DropDownMenu";
import DropDownMenuItem from "../../components/helper/DropDownMenuItem";
import { useHeaderContext } from "../../context/HeaderContext";
import LoginModal from "../../pages/login/LoginModal";
import { fetchMeQueryOptions, useLogout } from "../../services/users";
import HeaderNavigationButton from "./HeaderNavigationButton";

export default function Header() {
  const { data: me } = useQuery(fetchMeQueryOptions());

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { component } = useHeaderContext();

  const { mutate } = useLogout();

  const handleLogout = () => {
    mutate();
  };

  return (
    <>
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-md">
        <div className="relative container mx-auto flex items-center gap-4 px-4 lg:px-0">
          <HeaderNavigationButton to="/">Explore</HeaderNavigationButton>
          <HeaderNavigationButton to="/feed">Feed</HeaderNavigationButton>
          <div className="ml-auto flex items-center gap-4">
            {component}
            {me ? (
              <DropDownMenu
                button={
                  <div className="flex cursor-pointer items-center gap-1.5">
                    <ChevronDown className="size-4 text-gray-700" />
                    <span className="hidden text-lg/1.5 font-semibold sm:block">
                      {me.name}
                    </span>
                    <UserCircle className="size-5 text-gray-700" />
                  </div>
                }
              >
                <div className="flex flex-col gap-1.5 border-b border-gray-200 px-3 py-2.5 font-bold">
                  <div>{me.name}</div>
                  <div className="text-gray-500">{me.email}</div>
                </div>
                <DropDownMenuItem onClick={handleLogout}>
                  Logout
                </DropDownMenuItem>
              </DropDownMenu>
            ) : (
              <Button onClick={() => setIsLoginModalOpen(true)}>Login</Button>
            )}
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
