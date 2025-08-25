import { useState } from "react";
import { Lightbulb, Network, FileText, TrendingUp, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InsightsPanelProps {
  selectedFileId: string | null;
}

export const InsightsPanel = ({ selectedFileId }: InsightsPanelProps) => {
  const [activeTab, setActiveTab] = useState("highlights");

  const mockHighlights = [
    {
      id: 1,
      title: "Key Financial Metrics",
      content: "Revenue increased by 23% year-over-year, with strong performance in Q3 and Q4.",
      confidence: "high",
      page: 12
    },
    {
      id: 2,
      title: "Market Expansion",
      content: "Company plans to enter 3 new international markets in the next fiscal year.",
      confidence: "medium",
      page: 8
    },
    {
      id: 3,
      title: "Technology Investment",
      content: "Significant R&D investment focused on AI and machine learning capabilities.",
      confidence: "high",
      page: 15
    }
  ];

  const mockTopics = [
    { name: "Financial Performance", connections: 12, importance: "high" },
    { name: "Market Strategy", connections: 8, importance: "medium" },
    { name: "Technology", connections: 6, importance: "high" },
    { name: "Operations", connections: 4, importance: "low" }
  ];

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-confidence-high';
      case 'medium': return 'text-confidence-medium';
      case 'low': return 'text-confidence-low';
      default: return 'text-muted-foreground';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'bg-confidence-high/20 text-confidence-high border-confidence-high/30';
      case 'medium': return 'bg-confidence-medium/20 text-confidence-medium border-confidence-medium/30';
      case 'low': return 'bg-confidence-low/20 text-confidence-low border-confidence-low/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Insights
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          AI-generated analysis and key findings
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {!selectedFileId ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <Eye className="w-8 h-8 text-accent-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">No document selected</p>
            <p className="text-xs text-muted-foreground/70">
              Select a document to see insights and analysis
            </p>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
              <TabsTrigger value="highlights" className="text-xs">Highlights</TabsTrigger>
              <TabsTrigger value="mindmap" className="text-xs">Mind Map</TabsTrigger>
              <TabsTrigger value="reports" className="text-xs">Reports</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden p-4">
              <TabsContent value="highlights" className="h-full overflow-y-auto space-y-4 mt-0">
                {mockHighlights.map((highlight) => (
                  <Card key={highlight.id} className="border-border/50 shadow-soft hover:shadow-medium transition-smooth">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium text-foreground">
                          {highlight.title}
                        </CardTitle>
                        <Badge className={cn("text-xs", getConfidenceColor(highlight.confidence))}>
                          {highlight.confidence}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {highlight.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Page {highlight.page}</span>
                        <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                          View Source
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="mindmap" className="h-full overflow-y-auto space-y-4 mt-0">
                <Card className="border-border/50 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Network className="w-4 h-4 text-primary" />
                      Topic Connections
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/30 hover:bg-accent/20 transition-smooth"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{topic.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {topic.connections} connections
                          </p>
                        </div>
                        <Badge className={cn("text-xs border", getImportanceColor(topic.importance))}>
                          {topic.importance}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border/50 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center h-32 bg-muted/30 rounded-lg border-2 border-dashed border-border">
                      <div className="text-center">
                        <Network className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Interactive mind map</p>
                        <p className="text-xs text-muted-foreground/70">Coming soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="h-full overflow-y-auto space-y-4 mt-0">
                <Card className="border-border/50 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      Export Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start h-auto p-4 bg-card border border-border/50 hover:bg-accent/50 text-foreground transition-smooth">
                      <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 text-primary mt-0.5" />
                        <div className="text-left">
                          <p className="text-sm font-medium">Document Summary</p>
                          <p className="text-xs text-muted-foreground">
                            Complete analysis with key insights and highlights
                          </p>
                        </div>
                      </div>
                    </Button>

                    <Button className="w-full justify-start h-auto p-4 bg-card border border-border/50 hover:bg-accent/50 text-foreground transition-smooth">
                      <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 text-primary mt-0.5" />
                        <div className="text-left">
                          <p className="text-sm font-medium">Q&A Transcript</p>
                          <p className="text-xs text-muted-foreground">
                            Full conversation history with citations
                          </p>
                        </div>
                      </div>
                    </Button>

                    <Button className="w-full justify-start h-auto p-4 bg-card border border-border/50 hover:bg-accent/50 text-foreground transition-smooth">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                        <div className="text-left">
                          <p className="text-sm font-medium">Analytics Report</p>
                          <p className="text-xs text-muted-foreground">
                            Document metrics and analysis statistics
                          </p>
                        </div>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  );
};