import React, { useEffect, useState } from "react";
import styles from "./UserDashboard.module.scss";
import { GetUserRequest } from "@celeb-chat/shared/src/api/Requests/user.requests";
import { APIFetcher } from "utils/APIFetcher";
import { AxiosError } from "axios";
import EditUserModal, {
  getEditUserInitialValues,
} from "./components/EditUserModal/EditUserModal";
import { Formik } from "formik";
import { EditUserSchema } from "@celeb-chat/shared/src/schema";
import { LoadingContainer } from "@/Components";

namespace UserDashboard {
  export type Props = {};
}

function UserDashboard(props: UserDashboard.Props) {
  const [user, setUser] = useState<GetUserRequest.Response | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    APIFetcher.getUser()
      .then(({ data }) => {
        setUser(data);
      })
      .catch(({ response }: AxiosError<GetUserRequest.Error>) => {
        console.log({ err: response });
      });
  }, []);

  return (
    <div className={styles.userDash}>
      <LoadingContainer loading={!user} loadingText="Loading dashboard" />
      <h1 onClick={() => setShowEditModal(true)}>Dashboard</h1>

      {user && (
        <Formik
          initialValues={getEditUserInitialValues(user)}
          validateOnChange={false}
          validationSchema={EditUserSchema}
          onSubmit={() => console.log("submit")}
        >
          {() => (
            <EditUserModal
              show={showEditModal}
              hide={() => setShowEditModal(false)}
            />
          )}
        </Formik>
      )}
    </div>
  );
}

export default UserDashboard;
