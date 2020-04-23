import express from 'express';
import genreControllers from './controllers';

const router = express.Router();

router.get('/', genreControllers.getGenreList);

router.get('/:name', genreControllers.getGenre);

router.post('/', genreControllers.postGenre);

router.put('/:name', genreControllers.updateGenre);

router.delete('/:name', genreControllers.deleteGenre);

export default router;
