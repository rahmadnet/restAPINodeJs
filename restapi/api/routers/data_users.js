const  {poll} = require('./../../helpers/postgres')

const getUsers = (request, response) => {
    poll.query('SELECT * FROM users', (error, result) => {
        if(error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
}


const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    poll.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

 
  
  const createUser = (request, response) => {
    const {id,first_name, last_name , usia, hobi} = request.body
  
    poll.query('INSERT INTO users (id,first_name, last_name, usia,hobi) VALUES ( $1, $2,$3,$4,$5)', [id, first_name, last_name,usia, hobi], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${id}`)
    })
  }
  
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { first_name, last_name,usia,hobi } = request.body
  
    poll.query(
      'UPDATE users SET first_name = $1, last_name = $2 , usia = $3, hobi = $4 WHERE id = $5',
      [first_name, last_name,usia,hobi, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
 
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    poll.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }


