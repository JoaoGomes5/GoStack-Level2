import { EntityRepository , Repository } from 'typeorm'
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepositorie extends Repository<Appointment> {
     /**
     *findByDate
     */
    public async findByDate(date: Date): Promise<Appointment | null>{

        const findAppointment = await this.findOne({
          where: { date }
        })

        return findAppointment || null;
    }
   
}

export default AppointmentsRepositorie;