import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from  'typeorm';

import AppointmentsRepositorie from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/Authenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
 
appointmentsRouter.get('/' ,async (request,response) => {
  console.log(request.user);
  
  const appointmentRepository = getCustomRepository(AppointmentsRepositorie);

  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/',async (request, response) => {

 

  const { provider_id , date} = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({provider_id, date: parsedDate})

    return response.json(appointment);


});

export default appointmentsRouter;