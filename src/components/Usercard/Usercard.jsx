import React from 'react'
import { Button, Stack,Col } from 'react-bootstrap'

export default function Usercard({user}) {

    const defaultCopertina = 'https://placehold.co/800x400';
    const defaultProfile = 'https://placehold.co/400';

    // console.log(user);
  return (
    
        <div className='p-3 my-2 border d-flex flex-column align-items-center'>
            <Stack gap={2} direction='horizontal'>
                <Col xs={4}><img alt='' src={user.image ?? defaultProfile} className='roundedCircle' style={{width: '60px', objectFit: 'cover', borderRadius : '50%', height: '60px'}}/></Col>
                <Col xs={8}>{user.name}</Col>
            </Stack>
            <Button variant='outline-dark' className='my-2 mx-auto'>Collegati</Button>
        </div>
    
  )
}
