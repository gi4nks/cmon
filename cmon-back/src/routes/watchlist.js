import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/', controllers.watchlist.getCoinmarket);
router.get('/pull', controllers.watchlist.pullValues);

export default router;
