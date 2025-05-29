"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  CalendarDays,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setTourObject } from "@/utils/hooks/react-redux/store/slices/create-tour";
import { useAppDispatch } from "@/utils/hooks/react-redux/store/hook";

interface TodoItem {
  time: string;
  todo: string;
}

interface DayPlan {
  title: string;
  todos: TodoItem[];
}

export default function AddTourStepFive() {
  // Check localStorage for existing data
  const getInitialState = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tourPlan");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  };

  const [dayCount, setDayCount] = useState<number | null>(() => {
    const saved = getInitialState();
    return saved ? saved.dayCount : null;
  });

  const [tempDayCount, setTempDayCount] = useState("");
  const [tourPlan, setTourPlan] = useState<DayPlan[]>(() => {
    const saved = getInitialState();
    return saved ? saved.tourPlan : [];
  });

  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [showDayCountModal, setShowDayCountModal] = useState(false);

  // Initialize modal and days
  useEffect(() => {
    const saved = getInitialState();
    setShowDayCountModal(!saved);

    if (!saved && dayCount && dayCount > 0) {
      initializeTourPlan(dayCount);
    }
  }, []);

  // Save to localStorage whenever tourPlan changes
  useEffect(() => {
    if (dayCount && tourPlan.length > 0) {
      localStorage.setItem("tourPlan", JSON.stringify({ dayCount, tourPlan }));
    }
  }, [tourPlan, dayCount]);

  const initializeTourPlan = (count: number) => {
    setTourPlan(
      Array.from({ length: count }, (_, i) => ({
        title: `روز ${i + 1}`,
        todos: [],
      }))
    );
    setExpandedDay(0);
  };

  // Handlers
  const addTodo = (dayIndex: number) => {
    const updatedPlan = [...tourPlan];
    updatedPlan[dayIndex].todos.push({
      time: "08:00",
      todo: "",
    });
    setTourPlan(updatedPlan);
  };

  const removeTodo = (dayIndex: number, todoIndex: number) => {
    const updatedPlan = [...tourPlan];
    updatedPlan[dayIndex].todos.splice(todoIndex, 1);
    setTourPlan(updatedPlan);
  };

  const handleDayTitleChange = (index: number, value: string) => {
    const updatedPlan = [...tourPlan];
    updatedPlan[index].title = value;
    setTourPlan(updatedPlan);
  };

  const handleTodoChange = (
    dayIndex: number,
    todoIndex: number,
    field: keyof TodoItem,
    value: string
  ) => {
    const updatedPlan = [...tourPlan];
    updatedPlan[dayIndex].todos[todoIndex][field] = value;
    setTourPlan(updatedPlan);
  };

  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  const submitDayCount = () => {
    const count = parseInt(tempDayCount);
    if (count > 0 && count <= 30) {
      setDayCount(count);
      initializeTourPlan(count);
      setShowDayCountModal(false);
    }
  };

  const dispatch = useAppDispatch();

  // Change filters params logic
  const handleChange = (name: string, value: any) => {
    dispatch(setTourObject({ [name]: value }));
  };

  const submitTourPlan = () => {
    handleChange("schedule", tourPlan);
  };

  const resetTourPlan = () => {
    localStorage.removeItem("tourPlan");
    setTourPlan([]);
    setDayCount(null);
    setShowDayCountModal(true);
  };

  if (showDayCountModal) {
    return (
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent
          dir="rtl"
          className="bg-background border-border sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle className="text-text text-right">
              برنامه‌ریزی سفر
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Label htmlFor="dayCount" className="text-text-secondary">
              تعداد روزهای سفر را وارد کنید:
            </Label>
            <div className="relative">
              <Input
                id="dayCount"
                type="number"
                min="1"
                max="30"
                value={tempDayCount}
                onChange={(e) => setTempDayCount(e.target.value)}
                placeholder="مثال: 5"
                className="bg-surface border-border text-text"
              />
            </div>
            <Button
              onClick={submitDayCount}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              تایید و ادامه
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!dayCount || tourPlan.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg">
        <div className="text-center">
          <p className="text-text">در حال بارگذاری برنامه سفر...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mx-auto p-4 max-w-3xl bg-bg min-h-screen">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-text mb-5">برنامه‌ریزی سفر</h1>
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            className="text-red-500 border-red-500 hover:bg-red-500/10 cursor-pointer"
            onClick={resetTourPlan}
          >
            شروع برنامه جدید
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {tourPlan.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className="border border-border rounded-lg overflow-hidden bg-surface transition-all"
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface/50 transition-colors"
              onClick={() => toggleDay(dayIndex)}
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex items-center justify-center w-8 aspect-square rounded-full bg-primary text-white text-primary-foreground">
                  {dayIndex + 1}
                </div>
                <Input
                  className="bg-transparent border-none text-lg font-medium text-text hover:bg-surface focus:bg-surface focus-visible:ring-0"
                  value={day.title}
                  onChange={(e) =>
                    handleDayTitleChange(dayIndex, e.target.value)
                  }
                  placeholder={`عنوان روز ${dayIndex + 1}`}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <button className="text-text-secondary hover:text-primary cursor-pointer">
                {expandedDay === dayIndex ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>

            {expandedDay === dayIndex && (
              <div className="p-4 pt-0 space-y-4" dir="rtl">
                {day.todos.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center bg-surface">
                    <CalendarDays className="h-10 w-10 text-text-secondary mb-2" />
                    <p className="text-text-secondary">
                      فعالیتی برای این روز ثبت نشده است
                    </p>
                    <Button
                      variant="ghost"
                      className="mt-4 text-primary  cursor-pointer"
                      onClick={() => addTodo(dayIndex)}
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      افزودن اولین فعالیت
                    </Button>
                  </div>
                )}

                <div className="space-y-3">
                  {day.todos.map((todo, todoIndex) => (
                    <div
                      key={todoIndex}
                      className="flex items-start gap-3 p-4 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex-1 grid grid-cols-12 gap-3">
                        <div className="col-span-12 sm:col-span-3">
                          <Label className="text-text-secondary pb-3">
                            زمان
                          </Label>
                          <Input
                            type="time"
                            value={todo.time}
                            onChange={(e) =>
                              handleTodoChange(
                                dayIndex,
                                todoIndex,
                                "time",
                                e.target.value
                              )
                            }
                            className="bg-surface border-border text-text"
                          />
                        </div>
                        <div className="col-span-12 sm:col-span-8">
                          <Label className="text-text-secondary pb-3">
                            فعالیت
                          </Label>
                          <Input
                            value={todo.todo}
                            onChange={(e) =>
                              handleTodoChange(
                                dayIndex,
                                todoIndex,
                                "todo",
                                e.target.value
                              )
                            }
                            placeholder="مثال: بازدید از برج میلاد"
                            className="bg-surface border-border text-text"
                          />
                        </div>
                        <div className="col-span-12 sm:col-span-1 flex items-end justify-end sm:justify-start">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTodo(dayIndex, todoIndex)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full border-border text-primary hover:border-primary hover:bg-primary/5 cursor-pointer"
                  onClick={() => addTodo(dayIndex)}
                >
                  <Plus className="h-4 w-4 ml-2" />
                  افزودن فعالیت جدید
                </Button>
              </div>
            )}
          </div>
        ))}

        <div className="sticky bottom-6 bg-background border border-border rounded-lg p-4">
          <Button
            onClick={submitTourPlan}
            className="w-full bg-primary hover:bg-primary/90 h-12 text-lg text-white cursor-pointer"
          >
            ذخیره برنامه سفر
          </Button>
        </div>
      </div>
    </div>
  );
}
