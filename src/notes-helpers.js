
export const findFolder = (folders=[], id) =>
  folders.find(folder => folder.id === Number(id))

export const findNote = (notes=[], id) =>
  notes.find(note => note.id === Number(id))

export const getNotesForFolder = (notes=[], id) => (
  (!id)
    ? notes
    : notes.filter(note => note.folder_id === Number(id))
)

export const countNotesForFolder = (notes=[], id) =>
  notes.filter(note => note.folder_id === Number(id)).length
