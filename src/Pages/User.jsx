import { useAuth } from '@/components/context'
import { Button } from '@/components/ui/button';
import React from 'react'

const User = () => {
  const { logOut} = useAuth();
  return (
    <div>User Page
      <Button onClick={()=> logOut()}>Logout</Button>
    </div>
  )
}

export default User