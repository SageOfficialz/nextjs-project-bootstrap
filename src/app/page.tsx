"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommandPrompt from "@/components/CommandPrompt";
import QRScanner from "@/components/QRScanner";
import ToolList from "@/components/ToolList";

export interface Tool {
  id: string;
  name: string;
  qrCode: string;
  dateAdded: Date;
}

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "Welcome to Tool Tracking Device",
    "Type 'help' for available commands",
    "---"
  ]);

  const addTool = (qrData: string) => {
    const newTool: Tool = {
      id: Date.now().toString(),
      name: `Tool-${tools.length + 1}`,
      qrCode: qrData,
      dateAdded: new Date()
    };
    setTools(prev => [...prev, newTool]);
    setCommandHistory(prev => [...prev, `✅ Tool added: ${newTool.name} (${qrData})`]);
  };

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    if (cmd === "help") {
      setCommandHistory(prev => [...prev, 
        `> ${command}`,
        "Available commands:",
        "• scan - Open QR code scanner",
        "• track - Show tracked tools",
        "• sage [query] - Ask AI assistant",
        "• clear - Clear command history",
        "• help - Show this help",
        "---"
      ]);
    } else if (cmd === "scan") {
      setShowScanner(true);
      setCommandHistory(prev => [...prev, `> ${command}`, "📷 QR Scanner opened", "---"]);
    } else if (cmd === "track") {
      setCommandHistory(prev => [...prev, 
        `> ${command}`,
        `📦 Total tools tracked: ${tools.length}`,
        ...tools.map(tool => `• ${tool.name}: ${tool.qrCode}`),
        "---"
      ]);
    } else if (cmd.startsWith("sage ")) {
      const query = command.slice(5);
      setCommandHistory(prev => [...prev, `> ${command}`, "🤖 Sage is thinking...", "---"]);
      // This will be handled by the CommandPrompt component
    } else if (cmd === "clear") {
      setCommandHistory([
        "Welcome to Tool Tracking Device",
        "Type 'help' for available commands",
        "---"
      ]);
    } else {
      setCommandHistory(prev => [...prev, 
        `> ${command}`,
        "❌ Unknown command. Type 'help' for available commands",
        "---"
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gray-900 border-green-500">
          <CardHeader>
            <CardTitle className="text-green-400 text-2xl font-mono text-center">
              🔧 TOOL TRACKING DEVICE 🔧
            </CardTitle>
            <p className="text-green-300 text-center font-mono text-sm">
              Command-line interface for tool management with QR scanning and AI assistant
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Command Prompt */}
          <Card className="bg-gray-900 border-green-500">
            <CardHeader>
              <CardTitle className="text-green-400 font-mono">Command Terminal</CardTitle>
            </CardHeader>
            <CardContent>
              <CommandPrompt 
                onCommand={handleCommand}
                commandHistory={commandHistory}
                setCommandHistory={setCommandHistory}
              />
            </CardContent>
          </Card>

          {/* Tool List */}
          <Card className="bg-gray-900 border-green-500">
            <CardHeader>
              <CardTitle className="text-green-400 font-mono">Tracked Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <ToolList tools={tools} setTools={setTools} />
            </CardContent>
          </Card>
        </div>

        {/* QR Scanner Modal */}
        {showScanner && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <Card className="bg-gray-900 border-green-500 w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="text-green-400 font-mono">QR Code Scanner</CardTitle>
              </CardHeader>
              <CardContent>
                <QRScanner 
                  onScan={addTool}
                  onClose={() => setShowScanner(false)}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
