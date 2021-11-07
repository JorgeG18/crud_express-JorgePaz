import connection from '../database/conection.js'

let query = ''

export const insertDepartamento = (req, res) =>{
    const {nombre, descripcion} = req.body
    

    connection.query('INSERT INTO departamento (nombre, descripcion) values (?,?)', [nombre, descripcion], (err, results) => {
        if(err){
            console.log(`${err}`)
            return
        }
        res.redirect('/empleado')
    })
}

export const mostraDepartamento = (req, res) => {
    connection.query('select * from departamento;',(err,results)=>{
        if(err){
            console.log(`${err}`)
            return
        }else{
            res.render('departamento', {"departamentos":results})
        }
    })

}

export const IDdepartamento = (req,res)=>{
    query = 'select idDep, nombre, descripcion from departamento where idDep = ?;'

    connection.query(query, [req.params.depID], (err, resultsId) => {
        if (err) return res.send("Error")

        query = 'select idDep, nombre, apellido from departamento;'
        connection.query(query, (err, results) => {
            if (err) return res.send("Error")
            res.render('departamento', {"departamentos": results, "departamento": resultsId})
            
        })
    } )

}


export const actualizarDepartamento = (req, res) => {
    const {nombre, descripcion} = req.body
    query = 'update departamento set nombre = ?, descripcion = ?,  where idDep = ?'
    connection.query(query, [nombre, descripcion, req.params.depID], (err) =>{
        if (err) return res.send("Error")
    }) 
    res.redirect('/departamento')
}

export const eliminarDepartamento= (req, res)=>{
    query = 'delete from departamento where idDep = ?'
    
    connection.query(query, [req.params.depID], (err) => {
        if (err) throw err
    })
    res.redirect('/empleado')
}