import connection from '../database/conection.js'

let query = ''
/***---------------------------- */
export const insertEmpleado = (req, res) =>{
    const {nombre, apellido, telefono, correo, sexo, idDep} = req.body
    
    connection.query('INSERT INTO empleado (nombre,apellido,telefono,correo,sexo,idDep) values (?,?,?,?,?,?)',[nombre, apellido, telefono, correo, sexo, idDep],(err, results) => {
        if (err) throw err
        res.redirect('/empleado')
    })
}
/***---------------------------- */
export const mostraEmpleado = (req, res) => {
    query = 
    connection.query('select e.id as idEmp, e.nombre, e.apellido, e.telefono, e.correo, e.sexo, d.idDep, d.nombre as Departamento from empleado  e inner join departamento d on e.id = d.idDep;'
    ,(err,results)=>{
        if (err) return res.send("Error")
        
        connection.query('select * from departamento', (err, resultID) =>{
            if (err) return res.send("Error")
            res.render('empleado', {"empleados": results, "departamentos": resultID})
        })
    
    })
}
/***---------------------------- */
export const empleadoID = (req,res)=>{
    query = 'select e.id as idEmp, e.nombre, e.apellido, e.telefono, e.correo, e.sexo, d.idDep, d.nombre as Departamento from empleado e inner join departamento d on e.id = d.idDep;'

    connection.query(query, (err, results) => {
        query = 'select e.id as idEmp, e.nombre, e.apellido, e.telefono, e.correo, e.sexo, d.idDep, d.nombre as Departamento from empleado e inner join departamento d on e.id = d.idDep where e.id = ?;'
        if (err) throw err
        connection.query(query, [req.params.empID],(err, result) => {
            query = 'Select * from departamento'
            if (err) throw err
            connection.query(query, (err, resultD) =>{
                res.render('empleado', {"empleado": results, "empleados": result, "departamentos": resultD})
            })
        })
    })
}
/***---------------------------- */

export const actualizarEmpleado = (req, res) => {
    const {nombre, apellido, telefono, correo, sexo, id} = req.body
    query = 'update empleado set nombre = ?, apellido = ?, telefono = ?, correo = ?, sexo = ?, idDep=? where id = ?'
    connection.query(query, [nombre, apellido, telefono, correo, sexo, id, req.params.empID], (err) =>{
        if (err) return res.send("Error")
        res.redirect('/empleado')
    }) 
}
/***---------------------------- */
export const eliminarEmpleado = (req, res)=>{
    query = 'delete from empleado where id = ?'
    
    connection.query(query, [req.params.empID], (err) => {
        if (err) throw err
        res.redirect('/empleado')
    })
}