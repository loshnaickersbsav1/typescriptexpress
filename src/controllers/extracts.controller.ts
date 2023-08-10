import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';

class ExtractsController {
  public userService = new userService();

  public getExtracts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // const findAllextracts: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: 'test', message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public releaseExtracts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //const userData: CreateUserDto = req.body;
      //const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ trace_id: 'string', message: 'success : abcdef \n unsucessful:  ' });
    } catch (error) {
      next(error);
    }
  };
}

export default ExtractsController;
