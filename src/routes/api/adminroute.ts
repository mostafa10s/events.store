import * as controller from '../../controller/admin.controller'
import { Router } from 'express'
//import middleware from '../../vildatToken/vaildateToken'

const router = Router()
router.route('/').put(controller.adminDesgin).get(controller.adminSelecteAll)
router.route('/:id').delete(controller.adminDeleteEvents)

export default router
