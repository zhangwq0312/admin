Ext.define("app.model.RoleModel", {
    extend: "Ext.data.Model",
    fields: [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'module_ids', type: 'string'},
        {name: 'module_names', type: 'string'},
        {name: 'create_time', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'modify_time', type: 'date', dateFormat: 'Y-m-d H:i:s'},
    ]
});