import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  citations?: Array<{
    text: string;
    source: string;
    page?: number;
  }>;
  confidence?: 'high' | 'medium' | 'low';
  timestamp: Date;
}

interface ChatPanelProps {
  selectedFileId: string | null;
}

export const ChatPanel = ({ selectedFileId }: ChatPanelProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        type: 'ai',
        content: selectedFileId 
          ? `Based on the uploaded document, here's what I found regarding "${inputValue}". The document contains relevant information that directly addresses your question with specific details and context.`
          : "I'd be happy to help you analyze documents! Please upload a PDF, Word document, or email file first, then ask me anything about its content.",
        citations: selectedFileId ? [
          { text: "Section 2.1", source: "Document Analysis", page: 15 },
          { text: "Executive Summary", source: "Key Findings", page: 3 }
        ] : undefined,
        confidence: selectedFileId ? 'high' : undefined,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-confidence-high text-white';
      case 'medium': return 'bg-confidence-medium text-white';
      case 'low': return 'bg-confidence-low text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-border/50 bg-card/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Chat with DeepNotes</h2>
            <p className="text-sm text-muted-foreground">
              {selectedFileId 
                ? "Ask questions about your uploaded document"
                : "Upload a document to start asking questions"
              }
            </p>
          </div>
          <Bot className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-6 shadow-glow animate-pulse">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Ready to analyze your documents
            </h3>
            <p className="text-muted-foreground max-w-md">
              Upload PDFs, Word documents, or emails, then ask me anything about their content. 
              I'll provide detailed answers with citations and confidence scores.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  message.type === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.type === 'ai' && (
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 shadow-soft">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl p-4 transition-smooth",
                    message.type === 'user'
                      ? "bg-primary text-primary-foreground ml-12 shadow-soft"
                      : "bg-card border border-border/50 shadow-soft"
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  
                  {message.citations && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-muted-foreground font-medium">Sources:</p>
                      {message.citations.map((citation, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-citation/10 rounded-lg border border-citation/20"
                        >
                          <ExternalLink className="w-3 h-3 text-citation" />
                          <span className="text-xs text-citation-foreground font-medium">
                            {citation.text}
                          </span>
                          {citation.page && (
                            <span className="text-xs text-muted-foreground">
                              (Page {citation.page})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {message.confidence && (
                    <div className="mt-3 flex items-center gap-2">
                      <Shield className="w-3 h-3 text-muted-foreground" />
                      <Badge className={cn("text-xs", getConfidenceColor(message.confidence))}>
                        {message.confidence.charAt(0).toUpperCase() + message.confidence.slice(1)} Confidence
                      </Badge>
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 shadow-soft">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-card border border-border/50 rounded-xl p-4 shadow-soft">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                    </div>
                    <span className="text-sm text-muted-foreground">Analyzing...</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50 bg-card/50">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask DeepNotes anything about your documents..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 h-12 bg-background border-border/50 focus:border-primary/50 transition-smooth"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="h-12 px-6 gradient-primary text-white shadow-medium hover:shadow-glow transition-bounce"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};