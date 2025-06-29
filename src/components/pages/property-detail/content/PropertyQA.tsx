"use client";

import Button from "@/components/common/button";
import formatToPersianDate from "@/utils/helper/format-date";
import { getPropertyQA } from "@/utils/service/property-qa/get";
import postQuestion from "@/utils/service/property-qa/post";
import postAnswer from "@/utils/service/property-qa/post-answer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns-jalali";
import {
  AlertCircle,
  AlertCircleIcon,
  CheckCircle2Icon,
  MessageCircle,
  MessageCircleQuestionIcon,
  Reply,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface Question {
  id: number;
  houseId: number;
  question: string;
  answer: string | null;
  createdAt: string;
  answeredAt?: string;
  userId: number;
}

interface CreateQuestionDto {
  houseId: string;
  question: string;
}

interface CreateAnswerDto {
  questionId: number;
  answer: string;
}

const PropertyQA = ({ houseId }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [answerInput, setAnswerInput] = useState("");

  // Fetch questions
  const {
    data: questions,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Question[]>({
    queryKey: ["QUESTIONS", houseId],
    queryFn: () => getPropertyQA(houseId),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  // Create question mutation with optimistic updates
  const questionMutation = useMutation({
    mutationKey: ["CREATE_QUESTION"],
    mutationFn: (data: CreateQuestionDto) => {
      toast.promise(postQuestion(data), {
        pending: "در حال پردازش...",
        success: "پرسش شما با موفقیت ثبت شد",
        error: "خطا در ثبت پریش",
      });
    },
    onSuccess: () => refetch(),
  });

  // Create answer mutation with optimistic updates
  const answerMutation = useMutation({
    mutationKey: ["ANSWER_QUESTION"],
    mutationFn: (data: CreateAnswerDto) => {
      toast.promise(postAnswer(data), {
        pending: "در حال پردازش...",
        success: "پاسخ شما با موفقیت ثبت شد",
        error: "خطا در ثبت پریش",
      });
    },
    onSuccess: () => refetch(),
  });

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) return;
    questionMutation.mutate({
      houseId: houseId,
      question: newQuestion,
    });
    setNewQuestion("");
  };

  const handleSubmitAnswer = (questionId: number) => {
    if (!answerInput.trim()) return;
    answerMutation.mutate({ questionId, answer: answerInput });
    setAnswerInput("");
    setActiveQuestion(null);
  };

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorDisplay message={error.message} />;

  return (
    <div className="rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text">پرسش و پاسخ</h2>
        <div className="text-sm text-text-secondary">
          {questions?.length || 0} پرسش
        </div>
      </div>

      {/* Question Form */}
      <div className="mb-8 rounded-lg">
        <label
          htmlFor="new-question"
          className="block text-sm font-medium text-text mb-2"
        >
          پرسش خود را مطرح کنید
        </label>
        <div className="flex flex-col gap-3">
          <textarea
            id="new-question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="مثلاً: آیا این ملک پارکینگ دارد؟"
            className="w-full min-h-[100px] p-4 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all placeholder:text-text-secondary"
            rows={3}
          />
          <div className="flex justify-end">
            <Button
              handleClick={handleSubmitQuestion}
              disabled={questionMutation.isPending || !newQuestion.trim()}
              className="px-6 py-2 rounded-lg disabled:opacity-50 mx-auto disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              {questionMutation.isPending ? "در حال ارسال..." : "ثبت پرسش"}
            </Button>
          </div>
          {questionMutation.isError && (
            <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircleIcon className="w-4 h-4" />
              {questionMutation.error.message}
            </div>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions?.length === 0 ? (
          <EmptyState />
        ) : (
          questions?.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              isActive={activeQuestion === question.id}
              answerInput={answerInput}
              onAnswerChange={setAnswerInput}
              onSubmitAnswer={() => handleSubmitAnswer(question.id)}
              onCancelAnswer={() => setActiveQuestion(null)}
              onActivateAnswer={() => setActiveQuestion(question.id)}
              isLoading={answerMutation.isPending}
              error={answerMutation.error}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Sub-components for better organization
const LoadingSkeleton = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 animate-pulse"
      >
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
        <div className="h-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
      </div>
    ))}
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-600 dark:text-red-400 flex items-start gap-2">
    <AlertCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
    <div>
      <h3 className="font-medium">خطا در دریافت پرسش‌ها</h3>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-8 flex flex-col items-center">
    <MessageCircleQuestionIcon className="w-12 h-12 text-text mb-3" />
    <h3 className="text-gray-500 dark:text-gray-400 font-medium">
      هنوز پرسشی ثبت نشده است
    </h3>
    <p className="text-text-secondary text-sm mt-1">
      اولین نفری باشید که سوال می‌پرسید
    </p>
  </div>
);

interface QuestionItemProps {
  question: Question;
  isActive: boolean;
  answerInput: string;
  onAnswerChange: (value: string) => void;
  onSubmitAnswer: () => void;
  onCancelAnswer: () => void;
  onActivateAnswer: () => void;
  isLoading: boolean;
  error?: Error;
}

const QuestionItem = ({
  question,
  isActive,
  answerInput,
  onAnswerChange,
  onSubmitAnswer,
  onCancelAnswer,
  onActivateAnswer,
  isLoading,
  error,
}: QuestionItemProps) => (
  <div className="rounded-lg p-4">
    <div className="flex items-start gap-3">
      <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
        <MessageCircle />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2">
          <h3 className="font-medium text-text break-words">
            {question.question}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {formatToPersianDate(question.createdAt)}
          </span>
        </div>

        {question.answer ? (
          <div className="mt-3 bg-surface rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2Icon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-700 dark:text-gray-300 break-words">
                  {question.answer}
                </p>
                {question.answeredAt && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    پاسخ داده شده در{" "}
                    {format(new Date(question.answeredAt), "yyyy/MM/dd")}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            {isActive ? (
              <div className="space-y-3">
                <textarea
                  value={answerInput}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  placeholder="پاسخ خود را بنویسید..."
                  className="w-full min-h-[100px] p-4 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-all"
                  rows={3}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={onCancelAnswer}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    انصراف
                  </button>
                  <button
                    onClick={onSubmitAnswer}
                    disabled={isLoading || !answerInput.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm"
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    ارسال پاسخ
                  </button>
                </div>
                {error && (
                  <div className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {error.message}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onActivateAnswer}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center gap-1.5"
              >
                <Reply />
                پاسخ به این پرسش
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

// Icons
const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => (
  <div
    className={`animate-spin rounded-full border-2 border-current border-t-transparent ${
      size === "sm" ? "h-4 w-4 border-1" : size === "md" ? "h-5 w-5" : "h-6 w-6"
    }`}
  />
);

export default PropertyQA;
