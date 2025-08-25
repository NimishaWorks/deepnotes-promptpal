import { useState, useCallback } from "react";
import { FileText, FilePlus2, Upload, Calendar, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'email';
  uploadDate: Date;
  size: number;
}

interface SourcesPanelProps {
  files: FileItem[];
  onFileSelect: (fileId: string | null) => void;
  selectedFileId: string | null;
  onFilesUpload: (files: FileItem[]) => void;
}

export const SourcesPanel = ({ 
  files, 
  onFileSelect, 
  selectedFileId, 
  onFilesUpload 
}: SourcesPanelProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles: FileItem[] = droppedFiles.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      type: file.name.endsWith('.pdf') ? 'pdf' : file.name.endsWith('.docx') ? 'docx' : 'email',
      uploadDate: new Date(),
      size: file.size
    }));
    
    onFilesUpload([...files, ...newFiles]);
  }, [files, onFilesUpload]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <File className="w-4 h-4 text-destructive" />;
      case 'docx':
        return <FileText className="w-4 h-4 text-primary" />;
      case 'email':
        return <File className="w-4 h-4 text-confidence-medium" />;
      default:
        return <File className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Sources
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {files.length} document{files.length !== 1 ? 's' : ''} uploaded
        </p>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto p-3">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 animate-pulse">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">No documents yet</p>
            <p className="text-xs text-muted-foreground/70">
              Upload PDFs, Word docs, or emails to get started
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => onFileSelect(file.id === selectedFileId ? null : file.id)}
                className={cn(
                  "w-full p-3 rounded-lg text-left transition-smooth hover:bg-accent/50 border",
                  selectedFileId === file.id
                    ? "bg-primary/10 border-primary/30 shadow-soft"
                    : "bg-card border-border/30"
                )}
              >
                <div className="flex items-start gap-3">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        {file.uploadDate.toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add Source Button - Sticky at Bottom */}
      <div 
        className={cn(
          "p-4 border-t border-border/50 bg-card/80 backdrop-blur-sm",
          isDragOver && "bg-primary/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Button 
          className={cn(
            "w-full h-12 gradient-primary text-white font-medium shadow-medium hover:shadow-glow transition-bounce relative overflow-hidden group",
            isDragOver && "scale-105 shadow-glow"
          )}
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <FilePlus2 className="w-5 h-5 mr-2" />
          {isDragOver ? "Drop files here" : "Add Source"}
        </Button>
        
        {isDragOver && (
          <div className="absolute inset-0 border-2 border-dashed border-primary/50 rounded-lg bg-primary/5 flex items-center justify-center">
            <div className="flex flex-col items-center text-primary">
              <Upload className="w-8 h-8 mb-2 animate-bounce" />
              <p className="text-sm font-medium">Drop your documents here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};