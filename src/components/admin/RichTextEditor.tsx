'use client';

import { useRef, useEffect, useCallback } from 'react';
import { Label } from '@/components/ui/label';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  label,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Initialize editor content only on first mount
  useEffect(() => {
    if (isInitialMount.current && editorRef.current && value) {
      editorRef.current.innerHTML = value;
      isInitialMount.current = false;
    }
  }, []);

  // Debounced onChange to avoid excessive calls
  const handleChange = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    // Use setTimeout to debounce and ensure DOM is settled
    setTimeout(() => {
      handleChange();
    }, 0);
  }, [handleChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Get the text/html from clipboard
    const clipboardData = e.clipboardData;
    const html = clipboardData.getData('text/html');
    const text = clipboardData.getData('text/plain');

    try {
      if (html) {
        // Try to use HTML if available (preserves formatting from Google Docs)
        // Sanitize the HTML to remove Google Docs specific styling
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Remove Google-specific attributes and keep only semantic formatting
        const sanitize = (element: Element) => {
          const elementsToRemove: Element[] = [];
          
          element.querySelectorAll('*').forEach(el => {
            // Remove style attributes and Google-specific attributes
            el.removeAttribute('style');
            el.removeAttribute('id');
            el.removeAttribute('class');
            el.removeAttribute('data-*');
            
            // Remove span tags that don't have semantic meaning
            if (el.tagName === 'SPAN' && !el.innerHTML.match(/<(b|i|u|strong|em|a|li|ol|ul|h[1-6]|p)/)) {
              const fragment = document.createDocumentFragment();
              while (el.firstChild) {
                fragment.appendChild(el.firstChild);
              }
              el.parentNode?.replaceChild(fragment, el);
            }
          });
          
          return element;
        };

        const cleanedDoc = sanitize(doc.body);
        let cleanedHtml = cleanedDoc.innerHTML;

        // Insert as HTML
        document.execCommand('insertHTML', false, cleanedHtml);
      } else if (text) {
        // Fallback to plain text
        document.execCommand('insertText', false, text);
      }

      // Update parent after paste
      setTimeout(() => {
        handleChange();
      }, 0);
    } catch (err) {
      console.error('Paste error:', err);
      // Fallback to plain text paste
      if (text) {
        document.execCommand('insertText', false, text);
        setTimeout(() => {
          handleChange();
        }, 0);
      }
    }
  }, [handleChange]);

  const applyFormat = useCallback((command: string, value: string = '') => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    // Update after formatting
    setTimeout(() => {
      handleChange();
    }, 0);
  }, [handleChange]);

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-gray-900 font-semibold">{label}</Label>
      )}
      
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-100 border border-gray-300 rounded-t-md">
        <button
          type="button"
          onClick={() => applyFormat('bold')}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm font-semibold"
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => applyFormat('italic')}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => applyFormat('underline')}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>
        
        <div className="w-full" />
        
        <button
          type="button"
          onClick={() => applyFormat('insertUnorderedList')}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => applyFormat('insertOrderedList')}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
          title="Numbered List"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => applyFormat('createLink', prompt('Enter URL:') || '')}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
          title="Link"
        >
          🔗 Link
        </button>
        
        <div className="w-full" />
        
        <button
          type="button"
          onClick={() => applyFormat('formatBlock', '<h2>')}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => applyFormat('formatBlock', '<h3>')}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => applyFormat('formatBlock', '<p>')}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm"
          title="Paragraph"
        >
          P
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        suppressContentEditableWarning
        className="w-full p-4 border border-gray-300 rounded-b-md min-h-96 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
        style={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {placeholder && !value && (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </div>

      <p className="text-xs text-gray-500">
        💡 Tip: You can paste content from Google Docs and it will preserve formatting
      </p>
    </div>
  );
}
