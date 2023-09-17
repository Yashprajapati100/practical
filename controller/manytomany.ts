// import { Request, Response } from 'express'
// //import {users}  from '../relation/user'
// //import { Profile } from '../relation/profile'
// import { getManager } from 'typeorm'
// //import {Question} from '../relation/question'
// //import {Category} from '../relation/category'

// const Manytomany = async (req:Request,res:Response)=>{
//   const entityManager = getManager()
//   const {photo,gender}= req.body

//   const c1= new Category()
//   c1.name = "A"
//   await entityManager.save(c1);

//   const c2= new Category()
//   c2.name = "B"
//   await entityManager.save(c2);


//   const c3= new Category()
//   c3.name = "C"
//   await entityManager.save(c3);
//   //profile.gender = gender


//   const q1= new Question()

//   q1.text="my LAST question",
//   q1.title="LAST test",
//   q1.categories=[c1,c2,c3]

//    await entityManager.save(q1)

//   // const user = new users()
//   res.json({
//     data:q1,
//     message: "insertion of Many to many" 
//   })
// }
// export {
//   Manytomany
// }


