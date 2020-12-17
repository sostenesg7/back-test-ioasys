import express from 'express';
import {
  find,
  saveUser,
  update,
  remove,
  saveAdministrator,
} from '../controllers/user.controller';
import {
  userRemoveValidator,
  userSignUpValidator,
  userUpdateValidator,
} from '../validators';

const router = express.Router();

router.post('/', userSignUpValidator, saveUser);
router.post('/admin', userSignUpValidator, saveAdministrator);
router.get('/', find);
router.put('/', userUpdateValidator, update);
router.delete('/', remove);

export default router;
