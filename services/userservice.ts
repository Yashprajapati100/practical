import { Request, Response } from 'express'
import { User } from '../relation/users'
import { task } from '../relation/task'
var bcrypt = require('bcrypt')
import { getManager, getRepository } from 'typeorm'


export class UserService {


  async register(body): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let { name, email, password, mobileno, flag } = body
        const hash = await bcrypt.hash(password, 10);
        var data = await User.save({
          user_email: email,
          user_password: hash,
          user_mobileno: mobileno,
          flag: flag,
          user_name: name
        })
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async login(body): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let { email, password } = body
        var emailcheck = await User.find({
          where: {
            user_email: email
          }
        })
        if (emailcheck.length > 0) {
          var result = bcrypt.compareSync(`${password}`, emailcheck[0].user_password)
          if (!result) {
            var datas = {
              status: 200,
              message: 'password is not valid',
              detail: {}
            }
            return reject(datas)
          }
          else {
            var data = await User.find({
              where: {
                user_email: `${email}`
              }
            })
            //var [data] = await db.query(`SELECT * FROM user WHERE user_email ='${email}'`)
            return resolve(data)
          }
        }
        else {
          var err = { message: "user email does not exists" }
          return reject(err)
        }
        //return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async insert_task(body, id): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let { task_name, task_description, user_id, start_date, end_date } = body
        var data = await User.find({
          where: {
            user_id: id
          }
        })
        //console.log("========>>",user_id)
        if (data[0].flag == 0) {
          var insertbyuser = await task.save({
            task_name: task_name,
            task_description: task_description,
            assign_to_userid: user_id,
            start_date: start_date,
            end_date: end_date
          })
          console.log("++++++++++++++>>")
          return resolve(insertbyuser)
        }
        else {
          var insertbymanager = await task.save({
            task_name: task_name,
            task_description: task_description,
            assign_by_manager: 1,
            assign_to_userid: user_id,
            start_date: start_date,
            end_date: end_date
          })
          console.log("--------------------------->>")
          return resolve(insertbymanager)
        }
      } catch (error) {
        console.log("______", error)
        return reject(error)
      }
    });
  }

  async tasklist(body, id): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("id fetched====>>>>>", id)
        // var repository = getRepository(User)
        var data = await User.find({
          where: {
            
            user_id: id   
          }
        })
        if (data[0].flag == 0) {
          if ('assignbymanager' in body) {
            var dataset = await task.find({
              where: {
                assign_by_manager: 1
              }
            })
            return resolve(dataset)
          }
          else {
            var database = await task.find({
              where: {
                assign_to_userid: id
              }
            })
            return resolve(database)
          }
        } else if (data[0].flag == 1 || data[0].flag == 2) {
          if ('assignbymanager' in body) {
            var datasets = await task.find({
              where: {
                assign_by_manager: 1
              }
            })
            return resolve(datasets)
          }
          else {
            var datas = await task.find()
            return resolve(datas)
          }
        } else {
          throw 'cant set flag'
        }
      } catch (error) {
        console.log("______", error)
        return reject(error)
      }
    });
  }

  async completed_task(body): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let { task_id } = body
        let today = new Date().toISOString().slice(0, 10)


        console.log("today is", today)

        var fetch = await task.find({
          where: {
            task_id: task_id
          }
        })
        if (today > fetch[0].end_date.toString().slice(0, 10)) {
          var update = await task.update(fetch[0].task_id, { status: "2" })
          var data = await task.find()
          return resolve("task deadline is ended")
        }
        if (fetch.length > 0) {
          var update = await task.update(fetch[0].task_id, { status: "1" })
          return resolve({})
        }
      } catch (error) {
        console.log("______", error)
        return reject(error)
      }
    });
  }

  async update_task(body): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let { task_id, task_description } = body
        var update = await task.update(task_id, { task_description: task_description })
        console.log("updated success", update)
        //var update = await db.query(`UPDATE task set task_description='${task_description}' WHERE task_id ='${task_id}';`)
        return resolve({})
      }
      catch (error) {
        return reject(error)
      }
    });
  }

  async delete_task(body): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let { task_id } = body
        var deletes = await task.delete(task_id)
        console.log("deleted success ", deletes)
        return resolve({})
      }
      catch (error) {
        return reject(error)
      }
    });
  }

  async assign_task(body): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let { user_id, task_name, task_description, end_date, start_date } = body
        let date = new Date().toISOString().slice(0, 10)
        //console.log("date fetched ", date)
        var assign = await task.save({
          task_name: task_name,
          task_description: task_description,
          assign_to_userid: user_id,
          start_date: start_date,
          end_date: end_date
        })

        if (assign) {
          var fetch = await task.find({
            where: {
              task_name: task_name
            }
          })
          await task.update(fetch[0].task_id, { assign_by_manager: 1 })
          // var manager = await task.find({
          //   where: {
          //     assign_by_manager: 1
          //   }
          // })

          var final = await task.find({
            where: {
              task_name: task_name
            }
          })
          console.log("final=========>>>>data fetched", final)
          return resolve(final)
        }
      }
      catch (error) {
        return reject(error)
      }
    });
  }

  async temp_data(body): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let { user_id, task_name, task_description, end_date, start_date } = body
        let date = new Date().toISOString().slice(0, 10)
        //console.log("date fetched ", date)

        var assign = await task.query(`select * from user where user_id='6'`)
        // var assign = await task.save({
        //   task_name: task_name,
        //   task_description: task_description,
        //   assign_to_userid: user_id,
        //   start_date: start_date,
        //   end_date: end_date
        // })

        let data = await task.query(`select * from task where task_id='20'`)

        data.push({newdata:'1,2,3'})
        let obj= {
          assign,data
        }
    
        // console.log("+++++++++++++++++",obj)
        // console.log("------------",obj.data);
         console.log("================>this is a working with data in eslint project")
        return resolve(obj)
      }
      catch (error) {
        return reject(error)
      }
    });
  }
}

