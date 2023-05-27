import React, { useCallback, useState } from "react";
import styles from "./UserActionsCard.module.scss";
import { useAppDispatch, useUser } from "@/Hooks";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/Components";
import { APIFetcher } from "utils/APIFetcher";
import { Actions } from "@/Slices";

export namespace UserActionsCard {
  export type Props = {};
}

export function UserActionsCard(props: UserActionsCard.Props) {
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const signout = useCallback(async () => {
    setIsLoggingOut(true);

    await APIFetcher.signout().catch();

    dispatch(Actions.User.signout());
    setIsLoggingOut(false);
    navigate("/");
  }, [navigate, dispatch]);

  return (
    <div className={styles.card}>
      <Link to="/user/dashboard" className={styles.name}>
        {user?.username}
      </Link>
      <Button
        classes={{ root: styles.signoutBtn }}
        onClick={signout}
        loading={isLoggingOut}
        loadingText="Logging out"
      >
        Logout
      </Button>
    </div>
  );
}
