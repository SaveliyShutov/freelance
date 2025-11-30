<script>
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    modelValue(newValue) {
      if (this.editor && newValue !== this.editor.getHTML()) {
        this.editor.commands.setContent(newValue || '')
      }
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight,
      ],
      content: this.modelValue,
      onUpdate: ({ editor }) => {
        this.$emit('update:modelValue', editor.getHTML())
      }
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<template>
  <div v-if="editor" class="container">
    <div class="control-group">
      <div class="button-group">
        <button
:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
          H1
        </button>
        <button
:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
          H2
        </button>
        <button
:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
          H3
        </button>
        <button
:class="{ 'is-active': editor.isActive('paragraph') }"
          @click="editor.chain().focus().setParagraph().run()">
          Обычный
        </button>
        <button :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
          Bold
        </button>
        <button
:class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()">
          Italic
        </button>
        <button
:class="{ 'is-active': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()">
          Strike
        </button>
        <button
:class="{ 'is-active': editor.isActive('highlight') }"
          @click="editor.chain().focus().toggleHighlight().run()">
          Highlight
        </button>
        <button
:class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          @click="editor.chain().focus().setTextAlign('left').run()">
          Left
        </button>
        <button
:class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          @click="editor.chain().focus().setTextAlign('center').run()">
          Center
        </button>
        <button
:class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          @click="editor.chain().focus().setTextAlign('right').run()">
          Right
        </button>
      </div>
    </div>
    <editor-content :editor="editor" class="mb-4" />
  </div>
</template>

<style lang="scss">
.ProseMirror {
  padding: 1rem;
  min-height: 12rem;
  background: white;
  border: 1px solid var(--neutral-300);
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  outline: none;
  color: var(--neutral-900);

  &:focus-within {
    box-shadow: 0 0 0 3px var(--primary-100);
    border-color: var(--primary-500);
  }
}

.ProseMirror *::selection {
  background-color: var(--primary-100);
}

.tiptap {
  :first-child {
    margin-top: 0;
  }

  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-wrap: pretty;
  }

  h1,
  h2 {
    color: #000;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    color: #000;
    font-size: 1.1rem;
  }

  code {
    background-color: var(--neutral-100);
    border-radius: 0.4rem;
    color: var(--primary-600);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--neutral-800);
    border-radius: 0.5rem;
    color: var(--neutral-100);
    font-family: monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: var(--primary-100);
    border-radius: 0.4rem;
    box-decoration-break: clone;
    padding: 0.1rem 0.3rem;
  }

  blockquote {
    border-left: 3px solid var(--neutral-300);
    margin: 1.5rem 0;
    padding-left: 1rem;
    color: var(--neutral-700);
    background: var(--neutral-50);
    padding: 1rem;
    border-radius: 0 0.5rem 0.5rem 0;
  }

  hr {
    border: none;
    border-top: 1px solid var(--neutral-200);
    margin: 2rem 0;
  }
}

.control-group {
  background: transparent;
}

.control-group .button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-left: 0 !important;
  padding: 0.5rem;
  background: transparent;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.control-group .button-group button {
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.4rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--neutral-700);
  background: var(--neutral-100);
  transition: all 0.2s ease;
  border: 1px solid var(--neutral-200);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: var(--neutral-200);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(1px);
  }
}

.control-group .button-group button.is-active {
  background: var(--primary-500);
  color: white;
  border-color: var(--primary-600);
  box-shadow:
    0 1px 2px rgba(79, 70, 229, 0.1),
    0 0 0 1px var(--primary-700) inset;

  &:hover {
    background: var(--primary-600);
    border-color: var(--primary-700);
    transform: translateY(-1px);
    box-shadow:
      0 2px 4px rgba(79, 70, 229, 0.1),
      0 0 0 1px var(--primary-700) inset;
  }
}

.container {
  background: white;
  overflow: hidden;
  transition: all 0.3s ease;
}
</style>