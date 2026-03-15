'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [inputMode, setInputMode] = useState<'text' | 'html'>('text');
  const [htmlCode, setHtmlCode] = useState('');

  // Initialize editor content only on first mount
  useEffect(() => {
    if (isInitialMount.current && editorRef.current && value) {
      editorRef.current.innerHTML = value;
      isInitialMount.current = false;
    }
  }, [value]);

  // Keep editor synced with external value changes (e.g. form reset),
  // but avoid overriding while the user is actively editing.
  useEffect(() => {
    if (!editorRef.current || isInitialMount.current || isEditing) {
      return;
    }

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value, isEditing]);

  // Debounced onChange to avoid excessive calls
  const handleChange = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  }, [onChange]);

  const sanitizeHtml = useCallback((rawHtml: string): string => {
    const container = document.createElement('div');
    container.innerHTML = rawHtml || '';
    const allowedTags = new Set([
      'p',
      'br',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'strong',
      'b',
      'em',
      'i',
      'u',
      'a',
      'blockquote',
    ]);

    const cleanNode = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();

        if (tagName === 'script' || tagName === 'style') {
          element.remove();
          return;
        }

        if (!allowedTags.has(tagName)) {
          const parent = element.parentNode;
          if (!parent) return;

          while (element.firstChild) {
            parent.insertBefore(element.firstChild, element);
          }
          parent.removeChild(element);
          return;
        }

        // Keep href on links, strip other attributes.
        for (const attr of Array.from(element.attributes)) {
          const isSafeHref =
            tagName === 'a' &&
            attr.name === 'href' &&
            /^(https?:|mailto:|\/)/i.test(attr.value);

          if (!isSafeHref) {
            element.removeAttribute(attr.name);
          }
        }
      }

      for (const child of Array.from(node.childNodes)) {
        cleanNode(child);
      }
    };

    cleanNode(container);
    return container.innerHTML;
  }, []);

  const handleInput = useCallback(() => {
    // Use setTimeout to debounce and ensure DOM is settled
    setTimeout(() => {
      setIsEditing(true);
      handleChange();
    }, 0);
  }, [handleChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    const clipboardData = e.clipboardData;
    const html = clipboardData.getData('text/html');
    const text = clipboardData.getData('text/plain');

    const decodeHtmlEntities = (value: string) => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = value;
      return textarea.value;
    };

    const insertHtmlAtCaret = (htmlToInsert: string) => {
      if (!editorRef.current || !htmlToInsert) return;

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();

        const fragment = range.createContextualFragment(htmlToInsert);
        const lastNode = fragment.lastChild;
        range.insertNode(fragment);

        if (lastNode) {
          range.setStartAfter(lastNode);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        editorRef.current.insertAdjacentHTML('beforeend', htmlToInsert);
      }
    };

    try {
      let contentToInsert = '';
      const hasRawHtmlTags = /<\/?[a-z][^>]*>/i.test(text);
      const hasEscapedHtmlTags = /&lt;\/?[a-z][^&]*&gt;/i.test(text);

      if (html && html.trim()) {
        contentToInsert = sanitizeHtml(html);
      } else if (hasRawHtmlTags) {
        // Some sources put HTML markup in plain text clipboard content.
        contentToInsert = sanitizeHtml(text);
      } else if (hasEscapedHtmlTags) {
        // Decode &lt;h2&gt;..&lt;/h2&gt; style text and render as formatted HTML.
        contentToInsert = sanitizeHtml(decodeHtmlEntities(text));
      } else if (text && text.trim()) {
        // Convert plain text to paragraphs.
        const paragraphs = text
          .split(/\n\n+/)
          .map(para => para.trim())
          .filter(para => para.length > 0)
          .map(para => {
            const escaped = para
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
            return `<p>${escaped}</p>`;
          })
          .join('');

        contentToInsert =
          paragraphs ||
          `<p>${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`;
      }

      if (contentToInsert) {
        insertHtmlAtCaret(contentToInsert);
      }

      setTimeout(() => {
        setIsEditing(true);
        handleChange();
      }, 0);
    } catch (err) {
      console.error('Paste error:', err);
      if (text && editorRef.current) {
        editorRef.current.insertAdjacentText('beforeend', text);
        setTimeout(() => {
          setIsEditing(true);
          handleChange();
        }, 0);
      }
    }
  }, [handleChange, sanitizeHtml]);

  const applyFormat = useCallback((command: string, value: string = '') => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    // Update after formatting
    setTimeout(() => {
      handleChange();
    }, 0);
  }, [handleChange]);

  const applyHtmlCode = useCallback(() => {
    if (!htmlCode.trim()) {
      return;
    }

    const decodeHtmlEntities = (value: string) => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = value;
      return textarea.value;
    };

    const hasEscapedHtmlTags = /&lt;\/?[a-z][^&]*&gt;/i.test(htmlCode);
    const sourceHtml = hasEscapedHtmlTags ? decodeHtmlEntities(htmlCode) : htmlCode;
    const sanitized = sanitizeHtml(sourceHtml);

    // Ensure external sync effect can update the editor content after mode switch.
    setIsEditing(false);
    onChange(sanitized);
    setInputMode('text');
    setHtmlCode('');

    // Focus editor after switching back to text mode.
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = sanitized;
        editorRef.current.focus();
      }
    }, 0);
  }, [htmlCode, onChange, sanitizeHtml]);

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-gray-900 font-semibold">{label}</Label>
      )}

      {/* Input Mode Tabs */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setInputMode('text')}
          className={`px-4 py-2 text-sm rounded border ${
            inputMode === 'text'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Text
        </button>
        <button
          type="button"
          onClick={() => {
            setInputMode('html');
            setHtmlCode(value || '');
          }}
          className={`px-4 py-2 text-sm rounded border ${
            inputMode === 'html'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          HTML Code
        </button>
      </div>

      {inputMode === 'html' && (
        <div className="space-y-3 border border-gray-300 rounded-md p-3 bg-gray-50">
          <p className="text-sm text-gray-700">
            Paste HTML here, then click Convert to render it as formatted content.
          </p>
          <textarea
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            className="w-full h-56 p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste your HTML code here..."
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={applyHtmlCode}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Convert HTML to Formatted Text
            </button>
            <button
              type="button"
              onClick={() => {
                setHtmlCode('');
              }}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {inputMode === 'text' && (
        <>
      
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
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        onFocus={() => setIsEditing(true)}
        onBlur={() => {
          setIsEditing(false);
          handleChange();
        }}
        data-placeholder={placeholder || 'Write your content...'}
        className="w-full h-96 overflow-y-auto p-4 border border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
        style={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'normal',
        }}
      />

        </>
      )}

      <p className="text-xs text-gray-500">
        💡 Tip: You can paste content from Google Docs and it will preserve formatting
      </p>
    </div>
  );
}
