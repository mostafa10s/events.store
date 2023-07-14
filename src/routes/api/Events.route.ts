import * as controller from '../../controller/Events.controller'
import { Router } from 'express'
//import middleware from '../../vildatToken/vaildateToken'

const router = Router()
router.route('/').post(controller.createEvents).get(controller.getAll)
router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateEvents)
  .delete(controller.deleteEvent)
router.route('/filter').get(controller.filteEvents)

export default router
