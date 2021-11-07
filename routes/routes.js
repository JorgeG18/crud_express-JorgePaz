import express from 'express'
import {insertEmpleado,  mostraEmpleado, empleadoID, actualizarEmpleado, eliminarEmpleado} from '../controllers/authController.js'
import {insertDepartamento,  mostraDepartamento, IDdepartamento, actualizarDepartamento, eliminarDepartamento} from '../controllers/departamentoController.js'

const router = express.Router()

router.get('/', (req, res) =>{
    res.render('index')
})

//Route Empleado

router.get('/empleado', mostraEmpleado)
router.get('/empleado/:empID', empleadoID)
router.post('/empleado/:empID', actualizarEmpleado)
router.get('/empleado/eliminar/:empID', eliminarEmpleado )
router.post('/empleado', insertEmpleado)

//**Route Deparment */
router.get('/departamento', mostraDepartamento)
router.get('/departamento/:depID', IDdepartamento)
router.post('/departamento/:depID', actualizarDepartamento)
router.get('/departamento/eliminar/:depID', eliminarDepartamento)
router.post('/departamento', insertDepartamento)
//******************************************* */




export default router