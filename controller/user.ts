// import { Request, Response } from 'express'
// import { User } from '../entity/User'
// //import {getManager} from 'typeorm'
// import { getManager } from "typeorm";
// //let entityManager = getManager();

// //const entityManager = getManager();



// let database = async (req: Request, res: Response) => {
//   const entityManager = getManager()
//   //const { name, email,phonenumber } = req.body


//   //---------------save----------///

//   // const profile = new User()

//   //  profile.name = 'shubham'
//   //  profile.email = 'shubham@gmail.com'
//   //  profile.phonenumber = '989897897880'

//   // let data= await entityManager.save(profile)

//   // -----------insert-----------//

//   //  let data=await entityManager.insert(User,{
//   //   name:"ram",
//   //   email:"ram@gmail.com",
//   //   phonenumber:"9898989988"
//   // })


//   //-------------update-----------//
//   //let data = await entityManager.update(User,4,{email:'testing@gmail.com'})

//   //---------------delete-----------------//
//   //let data = await entityManager.delete(User,5)


//   //==========find===============//

//   let data = await entityManager.find(User);

//   ////let base = await entityManager.findBy

//   //  let datas= await entityManager.create(User,{
//   //     name: "database",
//   //     email:"hello world",
//   //     phonenumber:"6786432632",
//   //    // data:"hello world"
//   //  })
  
//   // let data = await entityManager.findOne({
//   //   where: {
//   //     id: 4,
//   //   }
//   // })
//   res.json({
//     data: data
//   })
// }

// export { database }