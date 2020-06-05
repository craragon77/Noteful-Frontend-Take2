
export const findFolder = (folders=[], id) =>
  folders.find(folder => folder.id === id)

export const findNote = (notes=[], id) =>
  notes.find(note => note.id === id)

export const getNotesForFolder = (notes=[], id) => (
  (!id)
    ? notes
    : notes.filter(note => note.folder_id === id)
)

export const countNotesForFolder = (notes=[], id) =>
  notes.filter(note => note.folder_id === id).length
