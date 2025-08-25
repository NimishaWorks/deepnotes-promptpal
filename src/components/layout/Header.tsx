import { Brain, FileText } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-16 bg-card/80 backdrop-blur-md border-b border-border/50 flex items-center justify-between px-6 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 gradient-primary rounded-xl shadow-glow">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            DeepNotes
          </h1>
          <p className="text-xs text-muted-foreground -mt-1">
            Your intelligent research assistant
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>Ready to analyze your documents</span>
        </div>
      </div>
    </header>
  );
};