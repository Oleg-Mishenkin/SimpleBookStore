import axios from 'axios';

class ApiService {
    constructor() {
        this.instance = axios.create({
            timeout: 20000
        });
    }

    getAll() {
        return this.instance.get('/api/books')
    }

    getBook(bookId) {
        return this.instance.get(`/api/books/${bookId}`)
    }

    updateBook(model) {
        return this.instance.put(`/api/books`, model)
    }

    removeBook(bookId) {
        return this.instance.delete(`/api/books/${bookId}`)
    }

    createBook(model) {
        return this.instance.post(`/api/books`, model)
    }

    createAuthor(model) {
        return this.instance.post(`/api/authors`, model)
    }

    updateAuthor(model) {
        return this.instance.put(`/api/authors`, model)
    }

    deleteAuthor(bookId, authorId) {
        return this.instance.delete(`/api/authors/${bookId}/${authorId}`)
    }
}

export default ApiService;