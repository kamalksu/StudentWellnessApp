import { MaterialIcons } from '@expo/vector-icons';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const TOOLBAR_ACTIONS = [
  { icon: 'undo', command: 'undo' },
  { icon: 'redo', command: 'redo' },
  { icon: 'format-bold', command: 'bold' },
  { icon: 'format-italic', command: 'italic' },
  { icon: 'format-underlined', command: 'underline' },
  { icon: 'strikethrough-s', command: 'strikeThrough' },
  { icon: 'format-list-bulleted', command: 'insertUnorderedList' },
  { icon: 'format-list-numbered', command: 'insertOrderedList' },
];

export function WebRichToolbar({ editor }) {
  return (
    <View style={styles.toolbar}>
      {TOOLBAR_ACTIONS.map(({ icon, command }) => (
        <button
          key={command}
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.current?.execCommand(command);
          }}
          style={webStyles.toolbarButton}>
          <MaterialIcons name={icon} size={20} color="#555" />
        </button>
      ))}
    </View>
  );
}

export const WebRichEditor = forwardRef(function WebRichEditor(
  { initialContentHTML, onChange, disabled, placeholder },
  ref
) {
  const divRef = useRef(null);
  const didInit = useRef(false);

  useImperativeHandle(ref, () => ({
    getContentHtml: () => Promise.resolve(divRef.current?.innerHTML || ''),
    execCommand: (command) => {
      divRef.current?.focus();
      document.execCommand(command, false, null);
      onChange?.(divRef.current?.innerHTML || '');
    },
  }));

  const setDivRef = (node) => {
    divRef.current = node;
    if (node && !didInit.current) {
      node.innerHTML = initialContentHTML || '';
      didInit.current = true;
    }
  };

  return (
    <>
      <style>{`
        .journal-web-editor:empty:before {
          content: attr(data-placeholder);
          color: #999;
        }
      `}</style>
      <div
        ref={setDivRef}
        className="journal-web-editor"
        contentEditable={!disabled}
        suppressContentEditableWarning
        onInput={() => onChange?.(divRef.current?.innerHTML || '')}
        data-placeholder={placeholder}
        style={{
          outline: 'none',
          minHeight: 400,
          fontSize: 16,
          lineHeight: '26px',
          color: Colors.textPrimary,
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 12,
          boxSizing: 'border-box',
        }}
      />
    </>
  );
});

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
});

const webStyles = {
  toolbarButton: {
    border: 'none',
    background: 'transparent',
    padding: 8,
    margin: 2,
    borderRadius: 8,
    cursor: 'pointer',
  },
};
