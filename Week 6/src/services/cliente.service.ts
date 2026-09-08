// ============================================
// SERVICE: Cliente
// ============================================
import * as repo from '../repositories/cliente.repository';
import type { CreateClienteDto, UpdateClienteDto } from '../schemas/cliente.schema';

export async function getAll() {
  return repo.findAll();
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createCliente(dto: CreateClienteDto) {
  return repo.create(dto);
}

export async function updateCliente(id: string, dto: UpdateClienteDto) {
  return repo.update(id, dto);
}

export async function deleteCliente(id: string) {
  return repo.remove(id);
}
