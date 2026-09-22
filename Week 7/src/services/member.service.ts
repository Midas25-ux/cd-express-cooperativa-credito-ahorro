import { ISocio } from '../models/member.model';
import * as socioRepository from '../repositories/member.repository';
import { CreateSocioDto, UpdateSocioDto } from '../schemas/member.schema';
import { AppError } from '../errors/AppError';

export async function getAll(): Promise<ISocio[]> {
  return socioRepository.findAll();
}

export async function getById(id: string): Promise<ISocio> {
  const socio = await socioRepository.findById(id);
  if (!socio) throw new AppError(404, 'Socio no encontrado');
  return socio;
}

export async function create(dto: CreateSocioDto, userId: string): Promise<ISocio> {
  // Validar unicidad de cédula antes de intentar insertar
  const existing = await socioRepository.findByCedula(dto.cedula);
  if (existing) {
    throw new AppError(409, `Ya existe un socio con la cédula ${dto.cedula}`);
  }

  // Un socio con tipoCuenta 'credito' debe tener limiteCredito > 0
  if (dto.tipoCuenta === 'credito' && (dto.limiteCredito ?? 0) <= 0) {
    throw new AppError(
      400,
      'Un socio de tipo crédito debe tener un límite de crédito mayor a 0',
    );
  }

  return socioRepository.create({ ...dto, registradoPor: userId });
}

export async function update(id: string, dto: UpdateSocioDto): Promise<ISocio> {
  // Verificar que el socio exista
  const current = await getById(id);

  // Si se actualiza cédula, verificar que no esté en uso por otro socio
  if (dto.cedula) {
    const existing = await socioRepository.findByCedula(dto.cedula);
    if (existing && existing._id.toString() !== id) {
      throw new AppError(409, `Ya existe un socio con la cédula ${dto.cedula}`);
    }
  }

  // Si se cambia tipoCuenta a 'credito', el limiteCredito final debe ser > 0
  const tipoCuentaFinal = dto.tipoCuenta ?? current.tipoCuenta;
  const limiteFinal = dto.limiteCredito ?? current.limiteCredito;
  if (tipoCuentaFinal === 'credito' && limiteFinal <= 0) {
    throw new AppError(
      400,
      'Un socio de tipo crédito debe tener un límite de crédito mayor a 0',
    );
  }

  const updated = await socioRepository.updateById(id, dto);
  if (!updated) throw new AppError(404, 'Socio no encontrado');
  return updated;
}

export async function remove(id: string): Promise<void> {
  const deleted = await socioRepository.deleteById(id);
  if (!deleted) throw new AppError(404, 'Socio no encontrado');
}
