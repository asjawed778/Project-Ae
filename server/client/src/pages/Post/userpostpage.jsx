import { useDispatch, useSelector } from "react-redux";
import { getUserPost } from "../../services/operations/postApi";
import { useEffect } from "react";
import Post from "./Post";

export default function userpostpage() {
  const dispatch = useDispatch();
  const { userPosts, page } = useSelector((state) => state.userposts);

  console.log("userPosts", userPosts);
  useEffect(() => {
    dispatch(getUserPost());
  }, [dispatch]);

  return (
    <>
      {userPosts && (
        <div>
          {userPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
