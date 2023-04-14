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

  // TODO: Implement loading spinner
  if (!user) {
    return null;
  }

  return (
    <div className={styles.userDash}>
      <h1 onClick={() => setShowEditModal(true)}>Dashboard</h1>

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
    </div>
  );
}

export default UserDashboard;
