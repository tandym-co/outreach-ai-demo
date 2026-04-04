"use client";

import { useState, useRef, KeyboardEvent } from "react";

const QUICK_ACTIONS = [
  "How many prospects have replied?",
  "Which prospects haven't replied in the last 14 days?",
  "Give me a summary of where we stand",
  "Set persona to: direct and numbers-focused enterprise sales rep",
];

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex gap-2 mb-3 flex-wrap">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            onClick={() => { setValue(action); textareaRef.current?.focus(); }}
            className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
          >
            {action.length > 40 ? action.slice(0, 40) + "…" : action}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          disabled={disabled}
          placeholder="Ask about your prospects or set a persona…"
          rows={2}
          className="flex-1 resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        />
        <button
          onClick={submit}
          disabled={disabled || !value.trim()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 transition-colors self-end"
        >
          Send
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-1">Enter to send · Shift+Enter for new line</p>
    </div>
  );
}
