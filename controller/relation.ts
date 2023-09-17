// import { Request, Response } from 'express'
// //import {users}  from '../relation/user'
// //import { Profile } from '../relation/profile'
// import { getManager } from 'typeorm'

// const User_rel_controller = async (req:Request,res:Response)=>{
//   const entityManager = getManager()
//   const {photo,gender}= req.body

//   const profile= new Profile()

//   profile.photo = photo
//   profile.gender = gender

//    await entityManager.save(profile)

//   const user = new users()

//   user.name='shubham'
//   user.profile =profile
//   await entityManager.save(user)
//   res.json({
//     data: user 
//   })
// }
// export {
//   User_rel_controller
// }


