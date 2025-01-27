import {Router} from "express"
import { userFirstController, userLoginController, allUserControlller } from "../controllers/user.controller.js"
const userRouter = Router()

userRouter.get('/', userFirstController)

userRouter.post('/login',userLoginController)

userRouter.get('/allUsers',allUserControlller)
export default userRouter