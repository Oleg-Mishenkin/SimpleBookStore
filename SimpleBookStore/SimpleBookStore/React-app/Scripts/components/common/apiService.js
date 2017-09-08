import axios from 'axios';

class ApiService {
    constructor() {
        this.instance = axios.create({
            baseURL: '/Books',
            timeout: 10000
        });
    }

    getAll() {
        return this.instance.get('/api/books')
    }

    removeBook(bookId) {
        return this.instance.delete(`/api/books/${bookId}`)
    }
}

export default ApiService;