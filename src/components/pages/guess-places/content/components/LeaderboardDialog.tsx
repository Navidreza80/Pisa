import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy } from "lucide-react";

type LeaderboardDialogProps = {
  showLeaderboard: boolean;
  setShowLeaderboard: (show: boolean) => void;
  highScores: { name: string; score: number }[];
};

export const LeaderboardDialog = ({
  showLeaderboard,
  setShowLeaderboard,
  highScores,
}: LeaderboardDialogProps) => (
  <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
    <DialogContent className="bg-background  border-border rounded-xl max-w-md">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold flex items-center gap-2 justify-end">
          <h1>:جدول امتیازات</h1>
          <Trophy className="text-text" size={24} />
        </DialogTitle>
      </DialogHeader>
      <div className="mt-4 max-h-80 overflow-y-auto">
        {highScores.length > 0 ? (
          <div className="rtl">
            {highScores.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${index === 0 ? "bg-text-secondary/30" : "bg-background"}`}
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant={index < 3 ? "default" : "secondary"}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white"
                  >
                    {index + 1}
                  </Badge>
                  <span className="font-medium">{entry.name}</span>
                </div>
                <span className="font-bold">{entry.score}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            !هنوز امتیازی ثبت نشده است
          </p>
        )}
      </div>
    </DialogContent>
  </Dialog>
);