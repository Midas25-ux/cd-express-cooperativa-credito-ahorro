import { SocioModel, ISocio } from '../models/member.model';
import { CreateSocioDto, UpdateSocioDto } from '../schemas/member.schema';

export async function findAll(): Promise<ISocio[]> {
  return SocioModel.find().sort({ createdAt: -1 });
}

export async function findById(id: string): Promise<ISocio | null> {
  return SocioModel.findById(id);
}

export async function findByCedula(cedula: string): Promise<ISocio | null> {
  return SocioModel.findOne({ cedula });
}

export async function create(
  data: CreateSocioDto & { registradoPor: string },
): Promise<ISocio> {
  return SocioModel.create(data);
}

export async function updateById(
  id: string,
  data: UpdateSocioDto,
): Promise<ISocio | null> {
  return SocioModel.findByIdAndUpdate(id, data, {
    new: true,           // devuelve el documento actualizado
    runValidators: true, // ejecuta validaciones del schema
  });
}

export async function deleteById(id: string): Promise<boolean> {
  const result = await SocioModel.findByIdAndDelete(id);
  return result !== null;
}
