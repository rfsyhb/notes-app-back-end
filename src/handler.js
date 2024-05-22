const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  // request payload
  const { title, tag, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString;
  const updatedAt = createdAt;

  const newNote = {
    title,
    tag,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  // memastikan note ada di return nya
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatam berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  response.code(500);
  return response;
};

exports.module = { addNoteHandler };
