import * as controller from '../../controller/registrationOnEvents.controller'
import { Router } from 'express'
//import middleware from '../../vildatToken/vaildateToken'

const router = Router()

router.route('/').post(controller.CreateregistrationOnEvent).get(controller.SELECTregsterEvent)
router.route('/:id').delete(controller.deleteteRegistrationEvent)
export default router
