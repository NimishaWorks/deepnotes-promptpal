import { useState } from "react";
import { SourcesPanel } from "./SourcesPanel";
import { ChatPanel } from "./ChatPanel";
import { InsightsPanel } from "./InsightsPanel";
import { Header } from "./Header";

export const MainLayout = () => {
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sources Panel - Left Sidebar */}
        <div className="w-80 border-r border-border bg-card/50 backdrop-blur-sm">
          <SourcesPanel 
            files={uploadedFiles}
            selectedFileIds={selectedFileIds}
            onFileSelectionChange={setSelectedFileIds}
            onFilesUpload={setUploadedFiles}
          />
        </div>

        {/* Chat Panel - Center */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatPanel selectedFileIds={selectedFileIds} />
        </div>

        {/* Insights Panel - Right Sidebar */}
        <div className="w-80 border-l border-border bg-card/50 backdrop-blur-sm">
          <InsightsPanel selectedFileIds={selectedFileIds} />
        </div>
      </div>
    </div>
  );
};