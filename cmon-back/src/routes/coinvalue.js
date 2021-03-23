import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/', controllers.coinvalue.getAll);
router.put('/:id', controllers.coinvalue.modify);
router.post('/', controllers.coinvalue.create);
router.delete('/:id', controllers.coinvalue.delete);

export default router;
