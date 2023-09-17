import { z } from "zod";

export class UserValidation {
  /* Define the validation rules for the schema of an addData API */
  async addData(body: any): Promise<any> {
    try {
      const schema = z.object({
        name: z.string().min(1).max(18),
        phone_number: z.string().min(10).max(14).optional(),
        email: z.string().email()
      });
      await schema.parse(body);
      return true;
    } catch (error) {
      // error.code = 400;
      // error.message = error.issues[0].message;  
      // console.log("error==>>", error)
      // error.message = error.issues[0].message;
      return error;

      // let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
      // console.log(e);
      // return promise.reject(error);
    }
  }

  /* Define the validation rules for the schema of an readData API */
  async readData(body: any): Promise<any> {
    try {
      const schema = z.object({
        id: z.string().optional(),
      });
      await schema.parse(body);
      return true;
    } catch (error) {
      // error.code = 400;
      // error.message = error.details[0].message;
      // return error;
    }
  }

  /* Define the validation rules for the schema of an updateData API */
  async updateData(body: any): Promise<any> {
    try {
      const schema = z.object({
        name: z.string().min(1).max(18),
        phone_number: z.string().min(10).max(14).optional(),
        email: z.string().email(),
        id: z.number()
      });

      await schema.parse(body);
      return true;
    } catch (error) {
      // error.code = 400;
      // error.message = error.details[0].message;
      // return error;
    }
  }

  /* Define the validation rules for the schema of an deleteData API */
  async deleteData(body: any): Promise<any> {
    try {
      const schema = z.object({
        id: z.number()
      });
      await schema.parse(body);
      return true;
    } catch (error) {
      // error.code = 400;
      // error.message = error.details[0].message;
      // return error;
    }
  }
}