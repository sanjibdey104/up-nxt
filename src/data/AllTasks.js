import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth";
import db from "../firebase";
import firebase from "firebase/app";

export const FetchAllTasks = () => {
  const { currentUser } = useContext(AuthContext);
  const { uid } = currentUser;
  const [tasks, setTasks] = useState([]);
  const [currentTimestamp, setCurrentTimestamp] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .collection(`/users/${uid}/tasks`)
      .onSnapshot((querySnapshot) => {
        let arr = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          key: doc.id,
        }));
        setTasks(arr);
        setCurrentTimestamp(firebase.firestore.Timestamp.now());
      });
    return () => unsubscribe();
  }, [uid]);

  return { tasks, currentTimestamp };
};
