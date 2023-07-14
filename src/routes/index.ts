import registrationRouter from './api/user.route'
import eventsRouter from './api/Events.route'
import regsterEventRouter from './api/regsterEvent.route'
import adminRoute from './api/adminroute'
import { Router } from 'express'
const router = Router()
router.use('/registration', registrationRouter)
router.use('/Events', eventsRouter)
router.use('/registrationOnEvents', regsterEventRouter)
router.use('/Admin', adminRoute)

export default router
