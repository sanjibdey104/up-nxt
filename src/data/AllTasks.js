import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth";
import db from "../firebase";

export const FetchAllTasks = () => {
  const { currentUser } = useContext(AuthContext);
  const { uid } = currentUser;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection(`/users/${uid}/tasks`)
      .onSnapshot((querySnapshot) => {
        let arr = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          key: doc.id,
        }));
        setTasks(arr);
      });
    return () => unsubscribe();
  }, [uid]);

  return { tasks };
};
