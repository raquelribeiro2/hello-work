export default interface ICreatePermissionDTO {
  module_id: string;
  group_id: string;
  canCreate: boolean;
  canEdit: boolean;
  canView: boolean;
  canDelete: boolean;
}
