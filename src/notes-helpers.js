
export const findFolder = (folders=[], id) =>
  folders.find(folder => Number(folder.id) === Number(id))

export const findNote = (notes=[], id) =>
  notes.find(note => Number(note.id) === Number(id))

export const getNotesForFolder = (notes=[], id) => (
  (!id)
    ? notes
    : notes.filter(note => Number(note.folder_id) === Number(id))
)

export const countNotesForFolder = (notes=[], id) =>
  notes.filter(note => Number(note.folder_id) === Number(id)).length
