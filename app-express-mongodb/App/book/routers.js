import express from 'express';
import bookControllers from './controllers';

const router = express.Router();

router.get('/', bookControllers.getBookList);

router.get('/:title', bookControllers.getBook);

router.post('/', bookControllers.postBook);

router.put('/:title', bookControllers.updateBook);

router.delete('/:title', bookControllers.deleteBook);

export default router;
