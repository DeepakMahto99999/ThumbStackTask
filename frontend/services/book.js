import api from "./api";

export const getBooks = () => {
  return api.get("/books");
};

export const getBook = (id) => {
  return api.get(`/books/${id}`);
};

export const addBook = (data) => {
  return api.post("/books", data);
};

export const updateBook = (id, data) => {
  return api.patch(`/books/${id}`, data);
};

export const deleteBook = (id) => {
  return api.delete(`/books/${id}`);
};