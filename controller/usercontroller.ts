import { UserService } from "./../services/userservice";
import { ResponseHelper } from "../middleware/responsecontroller";
var jwt = require('jsonwebtoken')
import { User } from '../relation/users'

const userService = new UserService();
const responseHelper = new ResponseHelper();



export class UserController {

  async register(req: any, res: Response): Promise<any> {
    try {
      //await userValidation.addData(req.body);
      const user: any = await userService.register(req.body);
      return responseHelper.success(user, 'user registerd successfully', res);
    } catch (error) {
      console.log("addData API error==>", error);
      return responseHelper.error(error, res);
    }
  }

  async login(req: any, res: Response): Promise<any> {
    try {
      //await userValidation.addData(req.body);
      var user: any = await userService.login(req.body);
      if (user) {
        user[0].authtoken = '';
        let token = jwt.sign({ user: user }, 'practice', { expiresIn: '30d' });
        await User.update({
          user_email: user[0].user_email,
        }, {
          authtoken: token,
        })
        var userdata = await User.find({
          where: {
            user_email: user[0].user_email
          }
        })
        return responseHelper.success(userdata,'user login successfully',res);
      }
    } catch (error) {
      console.log("addData API error==>", error);
      return responseHelper.error(error, res);
    }
  }


  async insert_task(req: any, res: Response): Promise<any> {
    try {
      //await userValidation.addData(req.body);
      let token = req.headers.authorization;
      var decoded = jwt.verify(token, 'practice')
      var id = decoded.user[0].user_id;
      var user: any = await userService.insert_task(req.body, id);
      return responseHelper.success(user, 'task inserted successfully', res);
      //}
    } catch (error) {
      console.log("addData API error==>", error);
      return responseHelper.error(error, res);
    }
  }

  async tasklist(req: any, res: Response): Promise<any> {
    try {
      //await userValidation.addData(req.body);
      let token = req.headers.authorization;
      var decoded = jwt.verify(token, 'practice')
      var id = decoded.user[0].user_id;
      // console.log("id fetched",id)
      var user: any = await userService.tasklist(req.body, id);
      return responseHelper.success(user, 'task list fetched successsfully', res);
      //}
    } catch (error) {
      console.log("addData API error==>", error);
      return responseHelper.error(error, res);
    }
  }

  async completed_task(req: any, res: Response): Promise<any> {
    try {
      //await userValidation.addData(req.body);
      // console.log("id fetched",id)
      var user: any = await userService.completed_task(req.body);
      return responseHelper.success(user,'task completed successsfully',res);
      //}
    } catch (error) {
      console.log("addData API error==>", error);
      return responseHelper.error(error, res);
    }
  }

  async update_task(req: any, res: Response): Promise<any> {
    try {
      //await userValidation.addData(req.body);
      // console.log("id fetched",id)
      var user: any = await userService.update_task(req.body);
      return responseHelper.success(user,'task updated successsfully',res);
      //}
    } catch (error) {
      console.log("addData API error==>", error);
      return responseHelper.error(error, res);
    }
  }

  async delete_task(req: any, res: Response): Promise<any> {
    try {
      //await userValidation.addData(req.body);
      var user: any = await userService.delete_task(req.body);
      return responseHelper.success(user,'task deleted successsfully',res);
  
    } catch (error) {
      console.log("addData API error==>", error);
      return responseHelper.error(error, res);
    }
  }

  async assign_task(req: any, res: Response): Promise<any> {
    try {
      //await userValidation.addData(req.body);
      
      var user: any = await userService.assign_task(req.body);
      return responseHelper.success(user,'task deleted successsfully',res);
    } catch (error) {
      console.log("addData API error==>", error);
      return responseHelper.error(error, res);
    }
  }

  async temp_data(req: any, res: Response): Promise<any> {
    try {
      //await userValidation.addData(req.body);
      
      var user: any = await userService.temp_data(req.body);
      return responseHelper.success(user,'task deleted successsfully',res);
    } catch (error) {
      console.log("addData API error==>", error);
      return responseHelper.error(error, res);
    }
  }



  // async updateData(req: any, res: Response): Promise<any> {
  //   try {
  //     //await userValidation.updateData(req.body);
  //     const user: any = await userService.updateData(req.body);
  //     return responseHelper.success(user, 'user login successfully', res);
  //   } catch (error) {
  //     console.log("updateData API error==>", error);
  //     return responseHelper.error(error, res);
  //   }
  // }


  // async listData(req: Request, res: Response): Promise<any> {
  //   try {
  //     const user: any = await userService.listData();
  //     return responseHelper.success(user, 'user login successfully', res);
  //   } catch (error) {
  //     console.log("listData API error==>", error);
  //     return responseHelper.error(error, res);
  //   }
  // }


  // async deleteData(req: any, res: Response): Promise<any> {
  //   try {
  //     // await userValidation.deleteData(req.body);
  //     const user: any = await userService.deleteData(req.body);
  //     return responseHelper.success(user, 'user login successfully', res);
  //   } catch (error) {
  //     console.log("deleteData API error==>", error);
  //     return responseHelper.error(error, res);
  //   }
  // }
}