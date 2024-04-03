import React from 'react'
import { Button, Stack } from 'react-bootstrap'

export default function Usercard({user}) {

    const defaultCopertina = 'https://placehold.co/800x400';
    const defaultProfile = 'https://placehold.co/400';
  return (
    
        <div>
            <Stack gap={2} direction='horizontal'>
                <Col xs={3}><img alt='' src={user.image ?? defaultProfile} className='roundedCircle' /></Col>
                <Col xs={9}>{user.name}</Col>
            </Stack>
            <Button variant='outline-dark'>Collegati</Button>
        </div>
    
  )
}
