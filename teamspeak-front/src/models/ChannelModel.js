export default class ChannelModel{
    constructor(can_id, can_cli_id, can_cli_ts_id, can_nombre, can_contrasena, can_creacion, can_permisos){
        this.can_id = can_id;
        this.can_cli_id = can_cli_id;
        this.can_cli_ts_id = can_cli_ts_id;
        this.can_nombre = can_nombre;
        this.can_contrasena = can_contrasena;
        this.can_creacion = can_creacion;
        this.can_permisos = can_permisos;
    }
}