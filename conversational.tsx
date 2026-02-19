import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  HelpCircle, ChevronUp, Sparkles, Copy, GripVertical, Send,
  Loader2, RotateCcw, ChevronDown, ChevronRight, CheckCircle2,
  AlertCircle, Ticket, Brain, MessageSquare, Tag, Maximize2, Bot
} from "lucide-react";

function TooltipIcon() {
  return <HelpCircle className="h-4 w-4 text-muted-foreground inline ml-1" />;
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <ChevronUp className="h-4 w-4 text-muted-foreground" />
      <span className="font-semibold text-base">{title}</span>
    </div>
  );
}

function JsonEditor({ value, onChange, placeholder, readOnly = false }) {
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    try { if (val.trim()) JSON.parse(val); setError(""); } catch { setError("Invalid JSON"); }
  };
  const formatJson = () => {
    try { onChange(JSON.stringify(JSON.parse(value), null, 2)); setError(""); } catch { setError("Cannot format — invalid JSON"); }
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border-b rounded-t-md">
        <span className="text-xs font-mono text-slate-500">JSON</span>
        <div className="flex items-center gap-2">
          {error && <span className="text-xs text-red-500">{error}</span>}
          {!readOnly && <button onClick={formatJson} className="text-xs text-slate-500 hover:text-slate-800">Format</button>}
          <Copy className="h-3.5 w-3.5 text-slate-400 cursor-pointer hover:text-slate-700" />
        </div>
      </div>
      <textarea
        value={value} onChange={handleChange} readOnly={readOnly} placeholder={placeholder} spellCheck={false}
        className={`flex-1 font-mono text-xs p-3 resize-none outline-none rounded-b-md border border-t-0 ${readOnly ? "bg-slate-50 text-slate-700" : "bg-white"} ${error ? "border-red-300" : "border-slate-200"}`}
      />
    </div>
  );
}

// Inline agent output card that lives inside a chat bubble
function AgentOutputCard({ output }) {
  const [open, setOpen] = useState(false);
  const [traceOpen, setTraceOpen] = useState(null);

  return (
    <div className="mt-2 border border-slate-200 rounded-xl overflow-hidden bg-white text-slate-800">
      {/* Summary bar */}
      <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-1.5">
          <Ticket className="h-3.5 w-3.5 text-purple-500" />
          <span className="text-xs font-semibold text-purple-700">{output.ticketId}</span>
        </div>
        <Badge className={`text-[10px] px-1.5 py-0 ${output.priority === "high" ? "bg-red-100 text-red-600 border-red-200" : "bg-amber-100 text-amber-600 border-amber-200"}`} variant="outline">
          {output.priority}
        </Badge>
        <Badge className="text-[10px] px-1.5 py-0 bg-slate-100 text-slate-600 border-slate-200" variant="outline">
          {output.sentiment}
        </Badge>
        <div className="ml-auto flex gap-1">
          {output.tags.map(t => (
            <span key={t} className="text-[10px] bg-purple-50 text-purple-600 border border-purple-200 rounded-full px-2 py-0">{t}</span>
          ))}
        </div>
      </div>

      {/* Toggle details */}
      <button
        className="w-full flex items-center gap-1.5 px-3 py-2 text-xs text-slate-500 hover:bg-slate-50 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        <span>{open ? "Hide" : "View"} model response &amp; trace</span>
      </button>

      {open && (
        <div className="border-t border-slate-100">
          {/* Model response */}
          <div className="px-3 py-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 mb-2">
              <Brain className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-600">Model response</span>
            </div>
            <p className="text-xs text-slate-600 font-mono bg-slate-50 rounded-md p-2 leading-relaxed">{output.modelResponse}</p>
          </div>

          {/* Agent trace */}
          <div className="px-3 py-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Tag className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-600">Agent trace</span>
            </div>
            <div className="space-y-1.5">
              {output.trace.map((step, i) => (
                <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center gap-2 px-2.5 py-2 bg-slate-50 hover:bg-slate-100 text-left transition-colors"
                    onClick={() => setTraceOpen(traceOpen === i ? null : i)}
                  >
                    {step.status === "success"
                      ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                      : <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />}
                    <span className="text-xs">{step.label}</span>
                    {traceOpen === i ? <ChevronDown className="h-3 w-3 ml-auto text-slate-400" /> : <ChevronRight className="h-3 w-3 ml-auto text-slate-400" />}
                  </button>
                  {traceOpen === i && (
                    <pre className="text-[11px] font-mono text-slate-600 px-3 py-2 bg-white border-t border-slate-100 whitespace-pre-wrap">{step.detail}</pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const MOCK_OUTPUT = {
  ticketId: "TKT-00421",
  priority: "high",
  sentiment: "negative",
  tags: ["billing", "refund"],
  modelResponse: `Intent detected: billing_dispute (confidence: 0.94)\nSentiment: Negative\nPriority: High\nCalling zendesk_create_ticket...\nTicket TKT-00421 created.\nInternal message dispatched to team.`,
  trace: [
    { label: "Analyze message — intent & sentiment", status: "success", detail: '{\n  "intent": "billing_dispute",\n  "sentiment": "negative",\n  "confidence": 0.94\n}' },
    { label: "Call zendesk_create_ticket", status: "success", detail: '{\n  "ticket_id": "TKT-00421",\n  "priority": "high",\n  "tags": ["billing", "refund"]\n}' },
    { label: "Generate internal team message", status: "success", detail: '"New ticket TKT-00421 created: Billing dispute from CUST-8821. Priority: High."' },
  ]
};

function ChatTab() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm the Zendesk agent. Send me a customer message and I'll analyze it, detect intent & sentiment, and create a support ticket." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(m => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages(m => [...m, {
        role: "assistant",
        text: `I've analyzed your message and created a support ticket. Here's a summary of what I found and the actions taken:`,
        output: MOCK_OUTPUT
      }]);
      setLoading(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }, 1600);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-white text-[11px] font-bold shrink-0 mr-2 mt-0.5">A</div>
            )}
            <div className={`max-w-[80%] ${m.role === "user" ? "max-w-[65%]" : ""}`}>
              <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-slate-900 text-white rounded-br-sm"
                  : "bg-slate-100 text-slate-800 rounded-bl-sm"
              }`}>
                {m.text}
              </div>
              {m.output && <AgentOutputCard output={m.output} />}
            </div>
            {m.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0 ml-2 mt-0.5">U</div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-white text-[11px] font-bold shrink-0 mr-2">A</div>
            <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
              {[0, 150, 300].map(d => (
                <span key={d} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-6 pt-3 pb-4 border-t shrink-0 space-y-2.5">
        {/* Action buttons above input */}
        <div className="flex gap-2">
          <Button size="sm" onClick={sendMessage} disabled={!input.trim() || loading}
            className="bg-slate-900 hover:bg-slate-700 text-white">
            <Send className="h-4 w-4" />
          </Button>

        </div>

        {/* Input row */}
        <div className="flex gap-2 items-end">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Type a customer message to test the agent..."
            className="resize-none text-sm min-h-[40px] max-h-28 select-text"
            rows={1}
          />

        </div>
        <p className="text-xs text-muted-foreground">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}

export default function App() {
  const [agentName, setAgentName] = useState("Zendesk agent");
  const [description, setDescription] = useState("Ticket assignment agent");
  const [agentType, setAgentType] = useState("celigo");
  const [model, setModel] = useState("gpt-5");
  const [instructions, setInstructions] = useState(
    "Analyze a customer message, detect intent and sentiment, and automatically create Zendesk support tickets\nAnalyze the message to extract issue summary, sentiment, priority, and tags.\nIf it's a support issue, call zendesk_create_ticket with structured details.\nGenerate a short message for our internal team about the ticket including the ticket id"
  );
  const [activeTab, setActiveTab] = useState("agent-output");
  const [agentOutputSubTab, setAgentOutputSubTab] = useState("model-response");
  const [splitPct, setSplitPct] = useState(50);
  const [inputJson, setInputJson] = useState(`{\n  "customer_message": "I've been charged twice for my subscription this month and I need an immediate refund.",\n  "customer_id": "CUST-8821",\n  "channel": "email"\n}`);
  const [mockJson, setMockJson] = useState(`{\n  "ticket_id": "TKT-00421",\n  "status": "created",\n  "priority": "high"\n}`);

  const containerRef = useRef(null);
  const dragging = useRef(false);
  const onMouseDown = useCallback(() => { dragging.current = true; }, []);
  const onMouseMove = useCallback((e) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((e.clientX - rect.left - 48) / (rect.width - 48)) * 100, 20), 80);
    setSplitPct(pct);
  }, []);
  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  return (
    <div ref={containerRef} className="flex h-screen bg-background text-sm font-sans overflow-hidden select-none"
      onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>

      {/* Sidebar */}
      <div className="w-12 bg-slate-900 flex flex-col items-center py-3 gap-4 shrink-0">
        <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">C</div>
        <Badge variant="outline" className="text-[10px] px-1 py-0 text-slate-300 border-slate-600">Prod</Badge>
        <Separator className="bg-slate-700 w-8" />
        <div className="flex flex-col gap-3 mt-2">
          {[...Array(5)].map((_, i) => <div key={i} className="w-6 h-6 rounded bg-slate-700 opacity-60" />)}
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-1 overflow-hidden">

          {/* Left Panel */}
          <div className="flex flex-col overflow-hidden" style={{ width: `${splitPct}%` }}>
            <div className="px-6 pt-5 pb-3 shrink-0">
              <h1 className="text-lg font-semibold">Create AI agent</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Integration name / Flow name</p>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-5">
              <div className="border rounded-lg p-4 space-y-4">
                <SectionHeader title="General" />
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Name your agent <span className="text-red-500">*</span> <TooltipIcon /></Label>
                  <Input value={agentName} onChange={e => setAgentName(e.target.value)} className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Description <TooltipIcon /></Label>
                  <div className="relative">
                    <Input value={description} onChange={e => setDescription(e.target.value)} className="h-9 text-sm pr-9" />
                    <Sparkles className="absolute right-2.5 top-2.5 h-4 w-4 text-purple-400" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Type <span className="text-red-500">*</span> <TooltipIcon /></Label>
                  <RadioGroup value={agentType} onValueChange={setAgentType} className="grid grid-cols-2 gap-3">
                    <div className={`flex items-center gap-2 border rounded-md px-3 py-2.5 cursor-pointer ${agentType === "celigo" ? "border-purple-500 bg-purple-50" : ""}`}>
                      <RadioGroupItem value="celigo" id="celigo" />
                      <Label htmlFor="celigo" className="cursor-pointer text-sm">Celigo AI</Label>
                    </div>
                    <div className={`flex items-center gap-2 border rounded-md px-3 py-2.5 cursor-pointer ${agentType === "byok" ? "border-purple-500 bg-purple-50" : ""}`}>
                      <RadioGroupItem value="byok" id="byok" />
                      <Label htmlFor="byok" className="cursor-pointer text-sm">Bring your own key</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">AI model selection <span className="text-red-500">*</span> <TooltipIcon /></Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-5">GPT-5</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="claude-sonnet">Claude Sonnet 4</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Instructions <span className="text-red-500">*</span></Label>
                  <p className="text-xs text-muted-foreground">Describe the specific task you want the AI agent to perform.</p>
                  <Textarea value={instructions} onChange={e => setInstructions(e.target.value)} className="text-sm min-h-[140px] resize-none" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{"{ }"}</span>
                    <span className="text-xs text-muted-foreground">Characters: {instructions.length}</span>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <SectionHeader title="Output format" />
              </div>
            </div>
          </div>

          {/* Drag Handle */}
          <div onMouseDown={onMouseDown} className="w-3 flex items-center justify-center cursor-col-resize hover:bg-slate-100 transition-colors shrink-0 group">
            <GripVertical className="h-5 w-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </div>

          {/* Right Panel */}
          <div className="flex flex-col overflow-hidden border-l" style={{ width: `${100 - splitPct}%` }}>
            <div className="shrink-0">
              <div className="px-6 pt-4 border-b flex items-end justify-between">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-transparent p-0 h-auto gap-0">
                    {[
                      { id: "input", label: "Input" },
                      { id: "agent-output", label: "Agent output" },
                      { id: "mock-response", label: "Mock response" },
                      { id: "chat-with-agent", label: "Chat with agent" },
                    ].map(tab => (
                      <TabsTrigger key={tab.id} value={tab.id}
                        className="bg-transparent px-4 pb-3 rounded-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-slate-900 data-[state=active]:shadow-none whitespace-nowrap">
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <button className="mb-3 p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
              {(activeTab === "agent-output" || activeTab === "chat-with-agent") && (
                <div className="flex gap-2 px-6 py-3 border-b">
                  <Button size="sm" className="bg-slate-900 hover:bg-slate-700 text-white">Test agent</Button>
                  <Button size="sm" variant="outline">Compare models</Button>
                </div>
              )}

            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
              {activeTab === "agent-output" && (
                <div className="flex flex-col h-full">
                  {/* Agent output sub-tabs */}
                  <div className="px-6 border-b shrink-0">
                    <Tabs value={agentOutputSubTab} onValueChange={setAgentOutputSubTab}>
                      <TabsList className="bg-transparent p-0 h-auto gap-0">
                        {[
                          { id: "model-response", label: "Model response" },
                          { id: "agent-trace", label: "Agent trace" },
                        ].map(tab => (
                          <TabsTrigger key={tab.id} value={tab.id}
                            className="bg-transparent px-4 pb-3 rounded-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-slate-900 data-[state=active]:shadow-none whitespace-nowrap">
                            {tab.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                  {/* Empty state */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <Bot className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">Click 'Test agent' to run the agent and view results.</p>
                  </div>
                </div>
              )}

              {activeTab === "input" && (
                <div className="flex flex-col h-full">
                  <div className="px-6 pt-4 pb-2 shrink-0">
                    <p className="text-sm font-medium">Input data</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Provide the JSON input that will be sent to the agent when testing.</p>
                  </div>
                  <div className="flex-1 px-6 pb-2 overflow-hidden flex flex-col">
                    <div className="flex-1 border rounded-md overflow-hidden flex flex-col">
                      <JsonEditor value={inputJson} onChange={setInputJson} placeholder={'{\n  "customer_message": ""\n}'} />
                    </div>
                  </div>
                  <div className="px-6 pb-4 shrink-0">
                    <Button size="sm" variant="outline" onClick={() => setInputJson("")}>
                      <RotateCcw className="h-3.5 w-3.5 mr-1.5" />Clear
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "chat-with-agent" && <ChatTab />}

              {activeTab === "mock-response" && (
                <div className="flex flex-col h-full">
                  <div className="px-6 pt-4 pb-2 shrink-0">
                    <p className="text-sm font-medium">Mock response</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Define a static JSON response to simulate what this agent returns.</p>
                  </div>
                  <div className="flex-1 px-6 pb-2 overflow-hidden flex flex-col">
                    <div className="flex-1 border rounded-md overflow-hidden flex flex-col">
                      <JsonEditor value={mockJson} onChange={setMockJson} placeholder={'{\n  "ticket_id": ""\n}'} />
                    </div>
                  </div>
                  <div className="px-6 pb-4 shrink-0">
                    <Button size="sm" variant="outline" onClick={() => setMockJson("")}>
                      <RotateCcw className="h-3.5 w-3.5 mr-1.5" />Clear
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex gap-2 bg-background shrink-0">
          <Button size="sm" className="bg-slate-900 hover:bg-slate-700 text-white">Save &amp; close</Button>
          <Button size="sm" variant="outline">Save</Button>
          <Button size="sm" variant="outline">Close</Button>
        </div>
      </div>
    </div>
  );
}
