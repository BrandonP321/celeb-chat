import React, { useEffect, useState } from "react";
import styles from "./UserDashboard.module.scss";
import { GetUserRequest } from "@celeb-chat/shared/src/api/Requests/user.requests";
import { APIFetcher } from "utils/APIFetcher";
import { Formik } from "formik";
import { EditUserSchema } from "@celeb-chat/shared/src/schema";
import {
  AppHelmet,
  LoadingContainer,
  PageHeader,
  ScrollablePage,
} from "@/Components";
import { Loc } from "@/Loc";
import { EditUserForm } from "./components/EditUserForm/EditUserForm";

namespace UserDashboard {
  export type Props = {};
}

function UserDashboard(props: UserDashboard.Props) {
  const [user, setUser] = useState<GetUserRequest.Response | null>(null);

  useEffect(() => {
    APIFetcher.getUser()
      .then((user) => {
        setUser(user);
      })
      .catch(({ msg }: GetUserRequest.Error) => {
        console.log({ msg });
      });
  }, []);

  return (
    <ScrollablePage className={styles.userDash}>
      <div className={styles.fixedWidthContent}>
        <AppHelmet title={Loc.Web.UserDash.Meta.Title} />
        <LoadingContainer loading={!user} loadingText="Loading dashboard" />

        <PageHeader
          title={Loc.Web.UserDash.Title}
          desc={Loc.Web.UserDash.Blurb}
        />

        {user && <EditUserForm user={user} />}
      </div>

      {/* 
      // @ts-ignore */}
      <stripe-pricing-table
        pricing-table-id="prctbl_1NOCYlIgIBGcrWnu3FoNe8OU"
        publishable-key="pk_test_51NNsxlIgIBGcrWnuTaQUOwpOVCID7AEVhP8YQ07iXttgUe5u6sLEoKNTUMMN94GHZx4Q2WzdN3EMLhPODtJ0zdoV00PqgJEfym"
        // @ts-ignore
      ></stripe-pricing-table>
    </ScrollablePage>
  );
}

export default UserDashboard;
