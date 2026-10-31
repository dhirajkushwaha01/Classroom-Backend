import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import './App.css'

const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      username
      email
      phone
      website
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_ALL_USERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Users</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {data.getAllUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App