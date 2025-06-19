const PeopleController = () => import('#controllers/people_controller')
import router from '@adonisjs/core/services/router'

router.get('/people', [PeopleController, 'index'])
router.post('/create/person', [PeopleController, 'store'])
router.get('/show/person/:id', [PeopleController, 'show'])
router.put('/edit/person/:id', [PeopleController, 'update'])
router.delete('/delete/person/:id', [PeopleController, 'destroy'])