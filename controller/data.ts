// import { Request, Response } from 'express'
// import { User } from '../entity/User
// //import {getManager} from 'typeorm'
// import {  getManager, getRepository ,Like,Not} from "typeorm";
// //let entityManager = getManager();

// //const entityManager = getManager();

// export class UserController {

//   async insertdata(req: any, res: Response): Promise<any> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const entityManager = getManager()
//         const { name, email, phonenumber } = req.body

//         let data = await entityManager.insert(User, {
//           name: name,
//           email: email,
//           phonenumber: phonenumber
//         })
//         //let data = await entityManager.find(User);
//         res.json({
//           message: "inserted success",
//           data: data
//         })

//       } catch (error) {
//         return reject(error)
//       }
//     })
//   }


//   async fetchdata(req: any, res: Response): Promise<any> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const entityManager = getManager();
//         const repository = getRepository(User);
//         const { name, email, phonenumber, id } = req.body

//         //let data = await entityManager.find(User)
//         // let data = await repository.find({
//         //   where:{
//         //   name: Like ('rav%')
//         //   }
//         // });

//         let data = await repository.find({
//           where:{
//           name: Not ('ravi')
//           }
//         });

//         res.json({
//           message: "fetched success",
//           data: data
//         })
//       } catch (error) {
//         return reject(error)
//       }
//     })
//   }

//   async deletedata(req: any, res: Response): Promise<any> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const entityManager = getManager();
//         const { id } = req.body
//         let data = await entityManager.delete(User, id)
//         // let data = await entityManager.find(User);
//         res.json({
//           message: "deleted success",
//           data: data
//         })
//       } catch (error) {
//         return reject(error)
//       }
//     })
//   }

//   async updatedata(req: any, res: Response): Promise<any> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         let entityManager = getManager();
//         const { name, email, phonenumber, id } = req.body
//         let data = await entityManager.update(User, id, { email: email })
//         res.json({
//           message: "update success",
//           data: data
//         })
//       } catch (error) {
//         return reject(error)
//       }
//     })
//   }
// }

// // export { datastore }