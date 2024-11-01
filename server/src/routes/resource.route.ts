
import express from 'express';
import CreateResource, {  GetFeedResources, GetResource } from '../controllers/resource/resource.controller';
import { Authenticate } from '../middlewares/Authenticate';
import ResourceSearchController from '../controllers/resource/resource.search.controller';

const router = express.Router();

router.post("/new",Authenticate,CreateResource);
router.get("/d/:id",Authenticate,GetResource);
router.get("/feed",GetFeedResources)

router.post("/search",ResourceSearchController)

export default router