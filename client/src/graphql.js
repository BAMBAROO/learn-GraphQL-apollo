import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const GET_ALL_USER = gql`
  query getAllUser{
    users{
      id
      name
      username
      age
      nationality
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      username
      age
      nationality
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
      name
      username
      age
      nationality
    }
  }
`;

const DisplayData = () => {
  const [ searchId, setSearchId ] = useState('');
  const [ existData, setExistData ] = useState('users');

  const { data, loading, error } = useQuery(GET_ALL_USER);
  const [ getUser, { data: userData, loading: userLoading, error: userError } ] = useLazyQuery(GET_USER);
  const [ deleteUser, { data: deletedData, loading: deletedLoading, error: deletedError } ] = useMutation(DELETE_USER);

  if(loading || userLoading || deletedLoading) { return <div> Harap Tunggu... </div> }
  if(error || userError || deletedError) { return <div> Terjadi Kesalahan...</div> } 

  return (
    <>
      <div className='App'>
        <h1>APOLLO CLIENT</h1>
        <hr/>
        { existData === 'users' ? ( 
          data.users.map((user) => {
            return (
              <div key={user.id}>
                <p>id: {user.id}</p>
                <p>name: {user.name}</p>
                <p>username: {user.username}</p>
                <p>age: {user.age}</p>
                <p>nationality: {user.nationality}</p>
              </div>
            );
          }) ) : existData === 'delete' ? (
            deletedData.deleteUser.map((user) => {
              return (
                <div key={user.id}>
                  <p>id: {user.id}</p>
                  <p>name: {user.name}</p>
                  <p>username: {user.username}</p>
                  <p>age: {user.age}</p>
                  <p>nationality: {user.nationality}</p>
                </div>
              );
            }) 
          ) : existData === 'user' ? (
            <div key={userData.user.id}>
              <p>id: {userData.user.id}</p>
              <p>name: {userData.user.name}</p>
              <p>username: {userData.user.username}</p>
              <p>age: {userData.user.age}</p>
              <p>nationality: {userData.user.nationality}</p>
            </div>
          ) : ('something went wrong!')
        }
        <hr/>
        <input 
          placeholder='Display data'
          onChange={(e) => {
            setSearchId(e.target.value);
          }}  
        />    
        <button onClick={(e) => {
          e.preventDefault();
          getUser({ variables: { id: searchId }});
          setExistData('user');
        }}>getUserById</button>
        <button onClick={(e) => {
          e.preventDefault();
          setExistData('delete');
          deleteUser({ variables: { deleteUserId: searchId }});
        }}>deleteUserById</button>
        <button onClick={(e) => {
          window.location.reload();
        }}>getAllData</button>
      </div>
    </>
  )
}

export default DisplayData;