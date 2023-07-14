import { create_user, login } from '../../controller/Registration.controller'
import { Router } from 'express'
//import middleware from '../../vildatToken/vaildateToken'

const router = Router()
router.route('/').post(create_user)
router.route('/login').get(login)
export default router
