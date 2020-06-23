import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';
import { getCustomRepository } from 'typeorm';



interface Request {
  provider: string,
  date: Date
}

class CreateAppointmentService {
  /**
   * execute
   */
  public async execute({provider, date}: Request): Promise<Appointment>{
    
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
  
      if(findAppointmentInSameDate) {
        throw Error("This appointment is alredy booked");
      };
  
  
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate
    });

    await appointmentsRepository.save(appointment);

    return appointment;

  }
}

export default CreateAppointmentService;