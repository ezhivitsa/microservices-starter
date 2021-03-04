import { CommandUser, CommandUserRole } from '@packages/communication';

export class SessionUser {
  constructor(private _data: CommandUser) {}

  get id(): string {
    return this._data.id;
  }

  get isUser(): boolean {
    return this._data.roles.includes(CommandUserRole.User);
  }

  get isAdmin(): boolean {
    return this._data.roles.includes(CommandUserRole.Admin);
  }

  get isOrganizationAdmin(): boolean {
    return this._data.roles.includes(CommandUserRole.OrganizationAdmin);
  }
}
