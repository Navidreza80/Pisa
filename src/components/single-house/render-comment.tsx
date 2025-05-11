"use client";

import { Comments } from "@/types/comments";
import SingleComment from "./single-comment";
import { useState } from "react";

export default function RenderComments({
  comment,
  setParentId,
  setRepliedUser,
  sectionRefs,
}: {
  comment: Comments;
}) {
  const [showReply, setShowReply] = useState(false);
  const toggleShowReplies = () => {
    setShowReply((prev) => !prev);
  };
  return (
    <>
      {comment.parent_comment ? (
        <>
          <SingleComment
            setRepliedUser={setRepliedUser}
            sectionRefs={sectionRefs}
            toggleShowReplies={toggleShowReplies}
            isParent
            setParentId={setParentId}
            showReply={showReply}
            comment={comment.parent_comment}
          />
          {showReply && (
            <SingleComment
              setParentId={setParentId}
              setRepliedUser={setRepliedUser}
              isReply
              isParent={false}
              comment={comment}
            />
          )}
        </>
      ) : (
        <SingleComment
          setRepliedUser={setRepliedUser}
          sectionRefs={sectionRefs}
          setParentId={setParentId}
          isParent={false}
          comment={comment}
          isReply={false}
        />
      )}
    </>
  );
}
