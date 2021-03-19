import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/', controllers.coin.getAll);
router.put('/:id', controllers.coin.modify);
router.post('/', controllers.coin.create);
router.delete('/:id', controllers.coin.delete);

export default router;
