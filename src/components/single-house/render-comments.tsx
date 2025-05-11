import { normalizeComments } from "@/utils/helper/remove-duplicate-comments";
import SingleComment from "./single-comment";

const CommentSection = ({ apiComments }: { apiComments: Comment[] }) => {
  // Render a single comment with its replies
  const renderComment = (commentId: string, depth = 0, isReply: boolean) => {
    const comment = comments.byId[commentId];
    const replies = comments.childrenIds[commentId] || [];

    return (
      <div key={commentId} style={{ marginLeft: `${depth * 32}px` }}>
        <SingleComment
          comment={normalizeComments(apiComments)}
          isReply={isReply}
        />

        {replies.map((replyId) => renderComment(replyId, depth + 1, true))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {normalizeComments(apiComments).topLevelIds.map((commentId) =>
        renderComment(commentId)
      )}
    </div>
  );
};

export default CommentSection;
