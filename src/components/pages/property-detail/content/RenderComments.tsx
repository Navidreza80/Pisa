"use client";

import { Comments } from "@/types/comments";
import SingleComment from "./SingleComment";
import { Dispatch, SetStateAction, useState } from "react";

// Define the props interface for RenderComments
interface RenderCommentsProps {
  comment: Comments;
  setParentId: Dispatch<SetStateAction<number | null>>;
  setRepliedUser: Dispatch<SetStateAction<string | null>>;
  sectionRefs: React.RefObject<{ [key: string]: HTMLDivElement | null }>;
}

export default function RenderComments({
  comment,
  setParentId,
  setRepliedUser,
  sectionRefs,
}: RenderCommentsProps) {
  const [showReply, setShowReply] = useState<boolean>(false);

  const toggleShowReplies = () => {
    setShowReply((prev) => !prev);
  };

  return (
    <>
      {comment.parent_comment ? (
        <>
          <SingleComment
            isReply={false}
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
              showReply={false}
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
          showReply={false}
          isReply={false}
        />
      )}
    </>
  );
}
