const PeopleController = () => import('#controllers/people_controller')
import router from '@adonisjs/core/services/router'

router.post('users', [PeopleController, 'store'])